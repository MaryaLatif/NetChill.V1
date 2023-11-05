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
    private static final int CHUNK_SIZE = 1_000_000; // 5MB de tampon pour la mémoire cache

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
     *
     * @param id
     * @param videoStart
     * @param videoEnd
     * @param responseOutputStream = flux de sortie associé à réponse HTTP utilisé pour écrire les données directement dans la réponse HTTP
     * @throws IOException
     */
    public void getVideoPart(Long id, long videoStart, long videoEnd, OutputStream responseOutputStream) throws IOException {
        try (InputStream videoPath = new FileInputStream(this.configurationService.getVideoBaseUrl() + this.movieDao.getMovieUrl(id))) {
            long remainingBytesToSkip = videoStart;

            // Utilisatioin d'une boucle car ce n'est pas sur que le saut se fait en une fois, il faut donc gérer cela
            while (remainingBytesToSkip > 0) {
                long bytesSkipped = videoPath.skip(remainingBytesToSkip);
                if (bytesSkipped <= 0) {
                    throw new IOException("Impossible de sauter jusqu'au début de la plage spécifiée.");
                }
                remainingBytesToSkip -= bytesSkipped;
            }

            byte[] buffer = new byte[CHUNK_SIZE]; // Taille du tampon de lecture
            long bytesToRead = videoEnd; // quantité à lire
            int bytesRead;

            // videoPath.read(buffer) = lit 1Mo, si la fin du flux est atteinte, read() renverra -1
            while (bytesToRead > 0 && (bytesRead = videoPath.read(buffer, 0, (int) Math.min(CHUNK_SIZE, bytesToRead))) != -1) {
                responseOutputStream.write(buffer, 0, bytesRead);
                bytesToRead -= bytesRead;
            }
        }
    }

}
