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
//TODO à revoir
/*
* - Mettre des S dans les path des WS
* - id en query param et pas pathparam ?serieId et ?movieId
*/
public class TrailerWs {
    private final ConfigurationService configurationService;
    private final TrailerService movieStreamingService;
    private final MovieDao movieDao;

    @Inject
    private TrailerWs(ConfigurationService configurationService, TrailerService movieStreamingService, MovieDao movieDao) {
        this.configurationService = configurationService;
        this.movieStreamingService = movieStreamingService;
        this.movieDao = movieDao;
    }

    @GET
    @Path("/series/serie-id")
    public YoutubeKey getTrailerBySerieId(@QueryParam("id") Long id) {
        return this.movieStreamingService.getTrailerBySerieId(id)
                .orElseThrow(() -> new WsException(NetchillWsError.RESOURCE_NOT_FOUND));
    }

    @GET
    @Path("/movies/movie-id")
    public YoutubeKey getTrailerByMovieId(@QueryParam("id") Long id) {
        return this.movieStreamingService.getTrailerByMovieId(id)
                .orElseThrow(() -> new WsException(NetchillWsError.RESOURCE_NOT_FOUND));
    }
}
