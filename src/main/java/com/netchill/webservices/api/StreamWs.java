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
    public Response streamVideo(@PathParam("movieId") Long movieId, @HeaderParam("Range") String range) throws WsException {
        Optional<File> video = this.streamService.getVideoFile(movieId);
        if(video.isEmpty()){
            throw new WsException(NetchillWsError.RESOURCE_NOT_FOUND);
        }

        File videoFile = video.get();
        long contentLength = videoFile.length();

        // Otherwise, handle range requests
        long[] parts = this.streamService.getRangePart(range, videoFile.length());
        long start = parts[0];
        long end = parts[1];

        // get StreamingOutput from streamService
        StreamingOutput streamingOutput = streamService.generateStreamingOutput(videoFile, start, end);

        // Creating response
        Response.ResponseBuilder responseBuilder = Response.status(Response.Status.PARTIAL_CONTENT)
            .entity(streamingOutput)
            .header("Content-Range", "bytes " + start + "-" + end + "/" + contentLength)
            .header("Content-Length", end - start + 1)
            .header("Accept-Ranges", "bytes");

        if (range != null) {
            responseBuilder.header("Content-Type", "video/mp4");
        }

        return responseBuilder.build();
    }

    @GET
    @Produces("application/octet-stream")
    @Path("/video/serie/{serieId}")
    public Response streamVideo(@PathParam("serieId") Long serieId, @QueryParam("season") int season, @QueryParam("episode") int episode, @HeaderParam("Range") String range) throws WsException {
        Optional<File> video = this.streamService.getEpisodeVideoFile(serieId, season, episode);
        if(video.isEmpty()){
            throw new WsException(NetchillWsError.RESOURCE_NOT_FOUND);
        }

        File videoFile = video.get();
        long contentLength = videoFile.length();

        // Otherwise, handle range requests
        long[] parts = this.streamService.getRangePart(range, videoFile.length());
        long start = parts[0];
        long end = parts[1];

        // get StreamingOutput from streamService
        StreamingOutput streamingOutput = streamService.generateStreamingOutput(videoFile, start, end);

        // Creating response
        Response.ResponseBuilder responseBuilder = Response.status(Response.Status.PARTIAL_CONTENT)
            .entity(streamingOutput)
            .header("Content-Range", "bytes " + start + "-" + end + "/" + contentLength)
            .header("Content-Length", end - start + 1)
            .header("Accept-Ranges", "bytes");

        if (range != null) {
            responseBuilder.header("Content-Type", "video/mp4");
        }

        return responseBuilder.build();
    }
}

