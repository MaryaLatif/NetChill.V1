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
    @Produces("application/octet-stream")
    @Path("/video/{movieId}")
    public Response getMediaVideo(@PathParam("movieId") Long movieId, @HeaderParam("Range") String range) throws WsException, IOException {
        File video = this.streamService.getMediaVideo(movieId);
        if(video == null){
            throw new WsException(NetchillWsError.RESOURCE_NOT_FOUND);
        }

        // Si il n'y a pas de range on envoie toute la vidéo
        if(range == null){
            return  Response.status(Response.Status.OK)
                .header("Content-length", video.length())
                .header("Accept-Ranges", "bytes")
                .build();
        }
        //Sinon on fait tout ça:
        long[] parts = this.streamService.getRangePart(range, video.length() - 1);
        long start = parts[0];
        long end = parts[1];

        StreamingOutput stream = output -> {
            try (OutputStream responseOutputStream = output) {
                // Appel de la méthode getVideoPart avec responseOutputStream
                streamService.getVideoPart(movieId, start, end, responseOutputStream);
            } catch (IOException e) {
                e.printStackTrace();
            }
        };

        return Response.ok(stream)
            .header("Content-Range", "bytes " + start + "-" + end + "/" + video.length())
            .header("Content-length", end - start + 1)
            .header("Accept-Ranges", "bytes")
            .status(Response.Status.PARTIAL_CONTENT)
            .build();
    }
}
