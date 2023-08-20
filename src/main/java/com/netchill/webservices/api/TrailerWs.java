package com.netchill.webservices.api;

import com.coreoz.plume.jersey.errors.WsException;
import com.coreoz.plume.jersey.security.permission.PublicApi;
import com.netchill.api.moviedb.models.Trailer;
import com.netchill.db.dao.movie.MovieDao;
import com.netchill.services.configuration.ConfigurationService;
import com.netchill.services.streaming.TrailerService;
import com.netchill.webservices.error.NetchillWsError;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Optional;

@Path("/trailer")
@Tag(name = "Trailer", description = "All about trailer")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@PublicApi
@Singleton
//TODO à revoir
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
    public Optional<Trailer> getTrailerBySerieId(@PathParam("id") Long id) {
        return Optional.ofNullable(this.movieStreamingService.getTrailerBySerieId(id).orElseThrow(()-> new WsException(NetchillWsError.RESOURCE_NOT_FOUND)));
    }

    @GET
    @Path("/movie/{id}")
    public Optional<Trailer> getTrailerByMovieId(@PathParam("id") Long id) {
        return Optional.ofNullable(this.movieStreamingService.getTrailerByMovieId(id).orElseThrow(()-> new WsException(NetchillWsError.RESOURCE_NOT_FOUND)));
    }
}
