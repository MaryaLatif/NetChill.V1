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

/*
    @GET
    @Path("/video/{movieId}")
    @Produces("video/mp4")
    public Response streamVideo(
        @HeaderParam("Range") String range
    ) {
        File videoFile = getVideoFile(); // Méthode pour récupérer le fichier vidéo, à implémenter

        if (videoFile == null || !videoFile.exists()) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        long contentLength = videoFile.length();

        // Parsing de la plage de contenu
        long start;
        long end;
        if (range != null && range.startsWith("bytes=")) {
            String[] rangeParts = range.substring(6).split("-");
            start = Long.parseLong(rangeParts[0]);
            end = rangeParts.length > 1 ? Long.parseLong(rangeParts[1]) : contentLength - 1;
        } else {
            end = contentLength - 1;
            start = 0;
        }

        // Création du StreamingOutput
        StreamingOutput streamingOutput = output -> {
            try (InputStream inputStream = new FileInputStream(videoFile)) {
                inputStream.skip(start); // Se positionner au début de la plage spécifiée
                byte[] buffer = new byte[8192];
                int bytesRead;
                long bytesRemaining = end - start + 1;
                while ((bytesRead = inputStream.read(buffer, 0, (int) Math.min(bytesRemaining, buffer.length))) > 0) {
                    output.write(buffer, 0, bytesRead);
                    bytesRemaining -= bytesRead;
                    if (bytesRemaining == 0) {
                        break;
                    }
                }
            }
        };

        // Construction de la réponse
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

    // Méthode factice pour récupérer le fichier vidéo (à remplacer avec votre logique)
    private File getVideoFile() {
        return new File("../../Downloads/hunger-games-5.mp4");
    }

 */
}

