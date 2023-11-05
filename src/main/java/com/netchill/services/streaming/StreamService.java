package com.netchill.services.streaming;

import com.coreoz.plume.jersey.errors.WsException;
import com.netchill.db.dao.movie.MovieDao;
import com.netchill.services.configuration.ConfigurationService;
import org.checkerframework.checker.units.qual.C;

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
    public byte[] getVideoPart(File initialFile, long start) throws IOException {
        InputStream targetStream = new FileInputStream(initialFile);
        this.skipBytes(targetStream, start);

        ByteArrayOutputStream byteStream = new ByteArrayOutputStream();
        byteStream.write(CHUNK_SIZE);

        // close les streams;
        targetStream.close();
        byteStream.close();

        return byteStream.toByteArray();
    }

    private static void skipBytes(InputStream inputStream, long bytesToSkip) throws IOException {
        // Skip taille tampon ou bytesToSkip si < tampon jusqu'a qu'on arrive à skip autant qu'on voulait
        while(bytesToSkip > 0){
            inputStream.skip(Math.min(CHUNK_SIZE, bytesToSkip));
            bytesToSkip -= CHUNK_SIZE;
        }
    }

}
