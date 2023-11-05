package com.netchill.webservices.api;

import com.coreoz.plume.jersey.errors.WsException;
import com.coreoz.plume.jersey.security.permission.PublicApi;
import com.netchill.services.streaming.StreamService;
import com.netchill.webservices.error.NetchillWsError;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.container.AsyncResponse;
import javax.ws.rs.container.Suspended;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;


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
    @Produces("image/jpeg")
    @Path("/video/{movieId}")
    public void getMediaVideo(@PathParam("movieId") Long movieId, @HeaderParam("Range") String range, @Suspended AsyncResponse asyncResponse) throws WsException, IOException {
        File video = this.streamService.getMediaVideo(movieId);
        if(video == null){
            throw new WsException(NetchillWsError.RESOURCE_NOT_FOUND);
        }

        // Si il n'y a pas de range on envoie toute la vidéo
        if(range == null){
            asyncResponse.resume(
                Response.status(Response.Status.OK)
                    .header("Content-length", video.length())
                    .header("Accept-Ranges", "bytes")
                    .build()
            );
        }else {
            long[] parts = this.streamService.getRangePart(range, video.length() - 1);

            asyncResponse.setTimeoutHandler(result -> {
                try {
                    result.resume(Response.status(Response.Status.REQUEST_TIMEOUT).build());
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });

            asyncResponse.resume(
                new StreamingOutput() {
                    @Override
                    public void write(OutputStream output) throws IOException, WebApplicationException {
                        try {
                            streamService.streamVideo(movieId, parts[0], parts[1], output);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
            );
        }
    }
}
