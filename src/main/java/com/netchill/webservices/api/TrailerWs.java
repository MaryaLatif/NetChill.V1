package com.netchill.webservices.api;

import com.coreoz.plume.jersey.errors.WsException;
import com.coreoz.plume.jersey.security.permission.PublicApi;
import com.netchill.api.moviedb.models.TrailerKey;
import com.netchill.db.dao.movie.MovieDao;
import com.netchill.services.configuration.ConfigurationService;
import com.netchill.services.streaming.TrailerService;
import com.netchill.webservices.error.NetchillWsError;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/trailer")
@Tag(name = "Trailer", description = "Movie and Serie trailer")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@PublicApi
@Singleton
public class TrailerWs {
    private final ConfigurationService configurationService;
    private final TrailerService movieStreamingService;
    private final MovieDao movieDao;

    @Inject
    public TrailerWs(ConfigurationService configurationService, TrailerService movieStreamingService, MovieDao movieDao) {
        this.configurationService = configurationService;
        this.movieStreamingService = movieStreamingService;
        this.movieDao = movieDao;
    }

    @GET
    @Path("/serie/{id}")
    public TrailerKey getSerieTrailerById(@PathParam("id") Long id) {
        TrailerKey result = this.movieStreamingService.getSerieTrailerById(id);

        if (result == null) {
            throw new WsException(NetchillWsError.RESOURCE_NOT_FOUND);
        }

        return result;
    }

    @GET
    @Path("/movie/{id}")
    public TrailerKey getMovieTrailerById(@PathParam("id") Long id) {
        TrailerKey result = this.movieStreamingService.getMovieTrailerById(id);

        if (result == null) {
            throw new WsException(NetchillWsError.RESOURCE_NOT_FOUND);
        }

        return result;
    }
}
