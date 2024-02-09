package com.netchill.services.streaming;

import com.coreoz.plume.jersey.errors.WsException;
import com.netchill.db.dao.movie.MovieDao;
import com.netchill.db.dao.movie.SerieDao;
import com.netchill.services.configuration.ConfigurationService;

import javax.inject.Inject;
import javax.ws.rs.core.StreamingOutput;
import java.io.*;
import java.util.Optional;

public class StreamService {
    private final MovieDao movieDao;
    private final SerieDao serieDao;
    private final ConfigurationService configurationService;

    @Inject
    private StreamService(MovieDao movieDao, SerieDao serieDao, ConfigurationService configurationService) {
        this.movieDao = movieDao;
        this.serieDao = serieDao;
        this.configurationService = configurationService;
    }

    /**
     * Récupère le nom du fichier vidéo du film à partir de la bd
     *
     * @param movieId
     * @return
     */
    public Optional<File> getVideoFile(Long movieId) {
        File video = new File(this.configurationService.getVideoBaseUrl() + this.movieDao.fetchMoviePath(movieId));
        return Optional.of(video);
    }

    /**
     * Récupère le nom du fichier vidéo de l'épisode en fonction du film et de la saison à partir de la bd
     * @param serieId
     * @param season
     * @param episode
     * @return
     */
    public Optional<File> getEpisodeVideoFile(Long serieId, int season, int episode) {
        File video = new File(this.configurationService.getEpisodeVideoBaseUrl() + this.serieDao.fetchEpisodePath(serieId, season, episode));
        return Optional.of(video);
    }

    /**
     * Transforme le range qui est de la form "Range: x-y" avec x, y = long, en tableau [x, y]
     *
     * @param range
     * @param videoLength
     * @return
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
