package com.netchill.services.streaming;

import com.coreoz.plume.jersey.errors.WsException;
import com.netchill.db.dao.movie.MovieDao;
import com.netchill.services.configuration.ConfigurationService;
import com.netchill.webservices.error.NetchillWsError;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import java.io.*;

import static java.lang.Integer.parseInt;
import static java.lang.Long.parseLong;

public class StreamService {
    private final MovieDao movieDao;
    private final ConfigurationService configurationService;
    private static final int CHUNK_SIZE = 1_000_000; // 1MB de vidéo à renvoyer

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
    public File getMediaVideo(Long movieId) {
        File video = new File(this.configurationService.getVideoBaseUrl() + this.movieDao.getMovieUrl(movieId));
        return video;
    }

    /**
     * Transforme le range qui est de la form "Range: x-y" avec x, y = long, en tableau [x, y]
     *
     * @param range
     * @param videoLength
     * @return
     */
    public long[] getRangePart(String range, long videoLength) {
        String[] parts = range.replace("bytes=", "").split("-");
        long start = parseLong(parts[0], 10);

        // Si le byte de fin > taille de la vidéo -> on envoie le bout vidéo jusqu'à la fin du film
        long end = parts.length > 1 ? parseInt(parts[1]) : Math.min(start + CHUNK_SIZE, videoLength); //prend le plus petit des 2 paramètres

        return new long[]{start, end};
    }

    /**
     * Renvoie le morceau de vidéo souhaité
     *
     * @param id
     * @param videoStart
     * @param videoEnd
     * @return
     * @throws IOException
     */
    public byte[] getVideoPart(Long id, long videoStart, long videoEnd) throws IOException {
        InputStream videoPath = StreamService.class.getResourceAsStream("/movies/" + this.movieDao.getMovieUrl(id));

        long remainingBytesToSkip = videoStart;
        // Utilisatioin d'une boucle car ce n'est pas sur que le saut se fait en une fois, il faut donc gérer cela
        while (remainingBytesToSkip > 0) {
            long bytesSkipped = videoPath.skip(remainingBytesToSkip);
            if (bytesSkipped <= 0) {
                throw new IOException("Impossible de sauter jusqu'au début de la plage spécifiée.");
            }
            remainingBytesToSkip -= bytesSkipped;
        }

        int bufferSize = CHUNK_SIZE; // Taille du tampon de lecture
        ByteArrayOutputStream byteStream = new ByteArrayOutputStream();

        byte[] buffer = new byte[bufferSize];
        int bytesRead;
        long bytesToRead = videoEnd; // quantité à lire

        // videoPath.read(buffer) = lit 1024 octet, si la fin du flux est atteinte, read() renverra -1
        while ((bytesRead = videoPath.read(buffer)) != -1 && bytesToRead > 0) {
            int bytesToWrite = (int) Math.min(bytesRead, bytesToRead);
            byteStream.write(buffer, 0, bytesToWrite);
            bytesToRead -= bytesToWrite;
        }

        return byteStream.toByteArray();
    }

}
