package com.netchill.webservices.api;

import com.coreoz.plume.jersey.errors.WsException;
import com.coreoz.plume.jersey.security.permission.PublicApi;
import com.netchill.services.streaming.StreamService;
import com.netchill.webservices.error.NetchillWsError;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

@Path("/stream")
@Tag(name = "Streaming", description = "Streaming service")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@PublicApi
@Singleton
public class StreamWs {
    private StreamService streamService;

    @Inject
    private StreamWs(StreamService streamService){
        this.streamService = streamService;
    }

    @GET
    @Produces("application/octet-stream")
    @Path("/video/{movieId}")
    public Response streamVideo(@PathParam("movieId") Long movieId, @HeaderParam("Range") String range) throws WsException, IOException {
        Optional<File> video = this.streamService.getVideoFile(movieId);
        if(video.isEmpty()){
            throw new WsException(NetchillWsError.RESOURCE_NOT_FOUND);
        }

        File videoFile = video.get();

        // If there is no range, we send the whole video
        if(range == null){
            return Response.ok((StreamingOutput) output -> {
                    try (InputStream input = new FileInputStream(videoFile)) {
                        byte[] buffer = new byte[8192];
                        int length;
                        while ((length = input.read(buffer)) != -1) {
                            output.write(buffer, 0, length);
                        }
                    }
                }).header("Content-Length", videoFile.length())
                .header("Accept-Ranges", "bytes")
                .build();
        }

        // Otherwise, handle range requests
        long[] parts = this.streamService.getRangePart(range, videoFile.length() - 1);
        long start = parts[0];
        long end = parts[1];

        InputStream videoStream = this.streamService.getVideoPartStream(videoFile, start, end);

        // Return the partial content with the input stream
        return Response.status(Response.Status.PARTIAL_CONTENT)
            .entity((StreamingOutput) output -> {
                byte[] buffer = new byte[8192];
                int length;
                while ((length = videoStream.read(buffer)) != -1) {
                    output.write(buffer, 0, length);
                }
                videoStream.close();
            })
            .header("Content-Range", "bytes " + start + "-" + end + "/" + videoFile.length())
            .header("Content-Length", end - start + 1)
            .header("Accept-Ranges", "bytes")
            .build();
    }
}
