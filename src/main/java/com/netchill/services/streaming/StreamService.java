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
    private static final int CHUNK_SIZE = 5_000_000; // 1MB de tampon pour la mémoire cache

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
        File video = new File(this.configurationService.getVideoBaseUrl() + "IMG_3297.MOV");
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
     * Renvoie un InputStream pour le morceau de vidéo souhaité
     * @param initialFile
     * @param start
     * @param end
     * @return InputStream for the video part
     * @throws IOException
     */
    public InputStream getVideoPartStream(File initialFile, long start, long end) throws IOException {
        // on se positionne à l'emplacement du start directement
        RandomAccessFile randomAccessFile = new RandomAccessFile(initialFile, "r");
        randomAccessFile.seek(start);
        //
        final long[] remaining = {end - start + 1}; // +1 pour pas oublier la fin
        InputStream inputStream = new FileInputStream(randomAccessFile.getFD()) {
            @Override
            public int available() throws IOException {
                return (int) Math.min(remaining[0], super.available());
            }

            @Override
            public int read() throws IOException {
                if (remaining[0] > 0) {
                    int data = super.read();
                    if (data != -1) {
                        remaining[0]--;
                    }
                    return data;
                } else {
                    return -1;
                }
            }

            @Override
            public int read(byte[] b, int off, int len) throws IOException {
                if (remaining[0] > 0) {
                    int toRead = (int) Math.min(len, remaining[0]);
                    int numRead = super.read(b, off, toRead);
                    if (numRead != -1) {
                        remaining[0] -= numRead;
                    }
                    return numRead;
                } else {
                    return -1;
                }
            }

            @Override
            public void close() throws IOException {
                randomAccessFile.close(); // close avant de close le stream
                super.close();
            }
        };
        return inputStream;
    }

}
