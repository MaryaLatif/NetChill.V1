package com.netchill.webservices.api;

import com.coreoz.plume.jersey.security.permission.PublicApi;
import com.netchill.services.streaming.StreamService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import retrofit2.http.Streaming;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;

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
    @Consumes("")
    @Path("/video/{name}")
    public Response getMediaVideo(@PathParam("name") String videoName, @HeaderParam("Range") String range) throws IOException {
        return this.streamService.getMediaVideo(videoName, range);
    }
}
