package com.netchill.webservices.api;

import com.coreoz.plume.jersey.errors.WsException;
import com.coreoz.plume.jersey.security.permission.PublicApi;
import com.netchill.api.moviedb.models.YoutubeKey;
import com.netchill.db.dao.movie.MovieDao;
import com.netchill.services.configuration.ConfigurationService;
import com.netchill.services.streaming.TrailerService;
import com.netchill.webservices.error.NetchillWsError;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/trailers")
@Tag(name = "Trailer", description = "All about trailer")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@PublicApi
@Singleton
public class TrailerWs {
    private final ConfigurationService configurationService;
    private final TrailerService movieStreamingService;

    @Inject
    private TrailerWs(ConfigurationService configurationService, TrailerService movieStreamingService) {
        this.configurationService = configurationService;
        this.movieStreamingService = movieStreamingService;
    }

    @GET
    @Path("/series")
    public YoutubeKey getTrailerBySerieId(@QueryParam("id") Long id) {
        return this.movieStreamingService.getTrailerBySerieId(id)
                .orElseThrow(() -> new WsException(NetchillWsError.RESOURCE_NOT_FOUND));
    }

    @GET
    @Path("/movies")
    public YoutubeKey getTrailerByMovieId(@QueryParam("id") Long id) {
        return this.movieStreamingService.getTrailerByMovieId(id)
                .orElseThrow(() -> new WsException(NetchillWsError.RESOURCE_NOT_FOUND));
    }
}
