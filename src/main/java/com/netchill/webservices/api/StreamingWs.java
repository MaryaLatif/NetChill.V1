package com.netchill.webservices.api;

import com.coreoz.plume.jersey.security.permission.PublicApi;
import com.netchill.api.moviedb.models.ResultTrailer;
import com.netchill.db.dao.movie.MovieDao;
import com.netchill.services.configuration.ConfigurationService;
import com.netchill.services.moviepreview.MoviePreviewService;
import com.netchill.services.moviepreview.MovieStreamingService;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/stream")
@Tag(name = "Streaming", description = "Trailer and movies")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@PublicApi
@Singleton
public class StreamingWs {
    private final ConfigurationService configurationService;
    private  final MovieStreamingService movieStreamingService;

    @Inject
    public StreamingWs(ConfigurationService configurationService, MovieStreamingService movieStreamingService){
        this.configurationService = configurationService;
        this.movieStreamingService = movieStreamingService;
    }
    @GET
    @Path("/{id}")
    public ResultTrailer getTrailerById(@PathParam("id") Long id){
        return movieStreamingService.getTrailerById(id);
    }
}
