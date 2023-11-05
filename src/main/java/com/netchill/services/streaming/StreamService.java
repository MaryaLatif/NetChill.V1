package com.netchill.services.streaming;

import com.coreoz.plume.jersey.errors.WsException;
import com.netchill.db.dao.movie.MovieDao;
import com.netchill.services.configuration.ConfigurationService;

import javax.inject.Inject;
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
    public Optional<File> getMediaVideo(Long movieId) {
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
    public long[] getRangePart(String range, long videoLength) {
        String[] parts = range.replace("bytes=", "").split("-");

        // Si le byte de fin > taille de la vidéo -> on envoie le bout vidéo jusqu'à la fin du film
        return new long[]{parseLong(parts[0], 10), parts.length > 1 ? parseInt(parts[1]) : Math.min(parseLong(parts[0], 10) + CHUNK_SIZE, videoLength)};//prend le plus petit des 2 paramètres
    }

    /**
     * Renvoie le morceau de vidéo souhaité
     *
     * @param initialFile
     * @param parts
     * @param videoLength
     * @return
     * @throws IOException
     */
    /* FIXME A REVOIR */
    public byte[] getVideoPart(File initialFile, long[] parts, long videoLength) throws IOException {
        InputStream targetStream = new FileInputStream(initialFile);
        // FIXME plutôt que skip tu pourrais utiliser targetStream.read(CHUNK_SIZE, start, end);
        StreamService.skipBytes(targetStream, parts[0]);

        // FIXME Tu connais déjà la taille du bite array, tu pourrais l'allouer directement
        // sans passer par ByteArrayOutputStream;
        ByteArrayOutputStream byteStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[CHUNK_SIZE];
        int bytesRead;
        long bytesToRead = parts[1]; // quantité à lire

        // videoPath.read(buffer) = lit 1Mo, si la fin du flux est atteinte, read() renverra -1
        while ((bytesRead = targetStream.read(buffer)) != -1 && bytesToRead > 0) {
            int bytesToWrite = (int) Math.min(bytesRead, bytesToRead);
            byteStream.write(buffer, 0, bytesToWrite);
            bytesToRead -= bytesToWrite;
        }


        byte[] videoPart = byteStream.toByteArray();

        // Tu as oublier de close tes streams;
        targetStream.close();
        byteStream.close();

        return videoPart;
    }

    private static void skipBytes(InputStream inputStream, long bytesToSkip) throws IOException {
        // Utilisatioin d'une boucle car ce n'est pas sur que le saut se fait en une fois, il faut donc gérer cela
        while (bytesToSkip > 0) {
            long skipped = inputStream.skip(bytesToSkip);
            if (skipped <= 0) {
                throw new EOFException("Impossible de sauter jusqu'au début de la plage spécifiée.");
            }
            bytesToSkip -= skipped;
        }
    }

}
