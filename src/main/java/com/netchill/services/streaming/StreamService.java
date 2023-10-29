package com.netchill.services.streaming;

import com.coreoz.plume.jersey.errors.WsException;
import com.netchill.db.dao.movie.MovieDao;
import com.netchill.webservices.error.NetchillWsError;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import java.io.*;

import static java.lang.Integer.parseInt;
import static java.lang.Long.parseLong;

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

        if(range == null){
            return  Response.status(Response.Status.OK)
                    .header("Content-length", video.length())
                    .header("Accept-Ranges", "bytes")
                    .build();
        }

        final int CHUNK_SIZE = 1_000_000;
        InputStream videoPath = StreamService.class.getResourceAsStream("/videos/transformers.mkv");
        String[] parts = range.replace("bytes=","").split("-");
        long start = parseLong(parts[0], 10);
        long end = parts.length > 1 ? parseInt(parts[1]) : Math.min(start + CHUNK_SIZE, video.length()-1); //prend le plus petit des 2 paramètres

        System.out.println("range: " + range + " parts: " + parts[0]);

        videoPath.skipNBytes(start);

        return Response.status(Response.Status.PARTIAL_CONTENT)
                .entity(videoPath.readNBytes((int)end))
                .header("Content-Range", "bytes " + start + "-" + end + "/" + video.length())
                .header("Content-length", end - start + 1 )
                .header("Accept-Ranges", "bytes")
                .build();
    }

}
