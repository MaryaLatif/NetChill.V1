package com.netchill.services.streaming;

import com.coreoz.plume.jersey.errors.WsException;
import com.netchill.WebApplication;
import com.netchill.db.dao.movie.MovieDao;
import com.netchill.webservices.error.NetchillWsError;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;

import static java.lang.Integer.parseInt;

public class StreamService {
    private final MovieDao movieDao;
    private static final String VIDEO_PATH = "transformers.mkv";

    @Inject
    private StreamService(MovieDao movieDao){
        this.movieDao = movieDao;
    }

    public Response getMediaVideo(String videoName, String range) throws IOException {
        File video = new File("/Users/marya/Dev/NetChill.V1/src/main/resources/videos/transformers.mkv");
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

        int start = (!parts[0].equals("")) ? parseInt(parts[0]) : 0;//si il n'y a pas de range tout court on débute à 0
        int end = (parts.length > 1) ? parseInt(parts[1]) : (int)video.length() - 1; //si on demande pas le byte de fin on dit qu'on envoie seulement 120 byte

        videoPath.skipNBytes(start);

        return Response.status(Response.Status.PARTIAL_CONTENT)
                .entity(videoPath.readNBytes(end))
                .header("Content-Range", "bytes " + start + "-" + end + "/" + video.length())
                .header("Accept-Range", "bytes")
                .build();
    }

}
