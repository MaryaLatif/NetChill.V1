package com.netchill.services.streaming;

import com.coreoz.plume.jersey.errors.WsException;
import com.netchill.db.dao.movie.MovieDao;
import com.netchill.services.configuration.ConfigurationService;

import javax.inject.Inject;
import javax.ws.rs.core.StreamingOutput;
import java.io.*;
import java.util.Optional;

import static java.lang.Integer.parseInt;
import static java.lang.Long.parseLong;

public class StreamService {
    private final MovieDao movieDao;
    private final ConfigurationService configurationService;
    private static final int CHUNK_SIZE = 1_000_000; // 1MB de tampon pour la mémoire cache

    @Inject
    private StreamService(MovieDao movieDao, ConfigurationService configurationService) {
        this.movieDao = movieDao;
        this.configurationService = configurationService;
    }

    /**
     * Récupère le nom du fichier vidéo du film à partir de la bd
     *
     * @param movieId
     * @return
     * @throws WsException
     */
    public Optional<File> getVideoFile(Long movieId) {
        File video = new File(this.configurationService.getVideoBaseUrl() + this.movieDao.fetchMoviePath(movieId));
        return Optional.of(video);
    }

    /**
     * Transforme le range qui est de la form "Range: x-y" avec x, y = long, en tableau [x, y]
     *
     * @param range
     * @param videoLength
     * @return
     */
    /*
    public long[] getRangePart(String range, long videoLength) {
        String[] parts = range.replace("bytes=", "").split("-");

        // Si le byte de fin > taille de la vidéo -> on envoie le bout vidéo jusqu'à la fin du film
        return new long[]{parseLong(parts[0], 10), parts.length > 1 ? parseInt(parts[1]) : Math.min(parseLong(parts[0], 10) + CHUNK_SIZE, videoLength)};//prend le plus petit des 2 paramètres
    }

     */
    public long[] getRangePart(String range, long videoLength) {
        long start;
        long end;
        if (range != null && range.startsWith("bytes=")) {
            String[] rangeParts = range.substring(6).split("-");
            start = Long.parseLong(rangeParts[0]);
            end = rangeParts.length > 1 ? Long.parseLong(rangeParts[1]) : videoLength - 1;
        } else {
            end = videoLength - 1;
            start = 0;
        }

        return new long[]{start, end};
    }

    /**
     * Renvoie un StreamingOutput pour le morceau de vidéo souhaité
     * @param start
     * @param end
     * @return StreamingOutput for the video part
     */
    public StreamingOutput generateStreamingOutput(File videoFile, long start, long end) {
        return output -> {
            try (InputStream inputStream = new FileInputStream(videoFile)) {
                inputStream.skip(start); // Se positionner au début de la plage spécifiée
                byte[] buffer = new byte[8192];
                int bytesRead;
                long bytesRemaining = end - start + 1;
                while ((bytesRead = inputStream.read(buffer, 0, (int) Math.min(bytesRemaining, buffer.length))) > 0) {
                    output.write(buffer, 0, bytesRead);
                    bytesRemaining -= bytesRead;
                    if (bytesRemaining == 0) {
                        break;
                    }
                }
            }
        };
    }

}
