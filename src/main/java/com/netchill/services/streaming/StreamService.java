package com.netchill.services.streaming;

import com.coreoz.plume.jersey.errors.WsException;
import com.netchill.db.dao.movie.MovieDao;
import com.netchill.webservices.error.NetchillWsError;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import java.io.*;

import static java.lang.Integer.parseInt;

public class StreamService {
    private final MovieDao movieDao;
    private static final String VIDEO_PATH = "transformers.mkv";

    @Inject
    private StreamService(MovieDao movieDao){
        this.movieDao = movieDao;
    }

    public Response getMediaVideo(String videoName, String range) throws IOException {
        File video = new File("/Users/marya/Dev/NetChill.V1/src/main/resources/videos/mailo.MP4");
        if(!video.exists()){
            throw new WsException(NetchillWsError.RESOURCE_NOT_FOUND);
        }
        System.out.println("La vidéo existe " + video.length()+" bytes");

        InputStream videoPath = StreamService.class.getResourceAsStream("/videos/mailo.MP4");
        String[] parts;

        if(range != null){
            parts = range.replace("bytes=","").split("-");
        } else{
            parts = new String[]{"0"};
        }

        System.out.println("range: " + range + " parts: " + parts[0]);

        int start = parseInt(parts[0], 10);//si il n'y a pas de range tout court on débute à 0
        long end = (parts.length > 1) ? parseInt(parts[1], 10) : video.length() - 1 ; //si on demande pas le byte de fin on dit qu'on envoie seulement 120 byte

        videoPath.skipNBytes(start);

        return Response.status(Response.Status.PARTIAL_CONTENT)
                .entity(videoPath.readNBytes((int)end))
                .header("Content-Range", "bytes " + start + "-" + end + "/" + video.length())
                .header("Content-length", 10000)
                .header("Accept-Ranges", "bytes")
                .build();
    }

}
