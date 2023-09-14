package com.netchill.services.streaming;

import com.coreoz.plume.jersey.errors.WsException;
import com.netchill.db.dao.streaming.StreamMovieDao;
import com.netchill.webservices.error.NetchillWsError;
import lombok.extern.slf4j.Slf4j;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import java.io.*;

import static java.lang.Integer.parseInt;
import static java.lang.Long.parseLong;

@Slf4j
public class StreamService {
    private final StreamMovieDao streamMovieDao;
    private static final String baseUrlPath = "/Users/marya/Dev/NetChill.V1/src/main/resources/videos/";

    @Inject
    private StreamService(StreamMovieDao streamMovieDao){
        this.streamMovieDao = streamMovieDao;
    }

    public Response getMediaVideo(Long id, String range) throws IOException {
        String videoPath = this.streamMovieDao.getVideoPath(id).get();
        File videoFile = new File(baseUrlPath + videoPath);

        if(range == null){
            return  Response.status(Response.Status.OK)
                    .header("Content-length", videoFile.length())
                    .header("Accept-Ranges", "bytes")
                    .build();
        }

        final int CHUNK_SIZE = 1_000_000;
        InputStream video = StreamService.class.getResourceAsStream("/videos/" + videoPath);
        String[] parts = range.replace("bytes=","").split("-");
        long start = parseLong(parts[0], 10);
        long end = parts.length > 1 ? parseInt(parts[1]) : Math.min(start + CHUNK_SIZE, videoFile.length()-1); //prend le plus petit des 2 paramètres

        log.info("range: " + range + " parts: " + parts[0]);

        assert video != null;
        video.skipNBytes(start);

        return Response.status(Response.Status.PARTIAL_CONTENT)
                .entity(video.readNBytes((int)end))
                .header("Content-Range", "bytes " + start + "-" + end + "/" + videoFile.length())
                .header("Content-length", end - start + 1 )
                .header("Accept-Ranges", "bytes")
                .build();
    }
}
