package com.netchill.webservices.api;

import com.coreoz.plume.jersey.security.permission.PublicApi;
import com.netchill.api.moviedb.models.Genre;
import com.netchill.api.moviedb.models.TrailerKey;
import com.netchill.db.dao.movie.MovieDao;
import com.netchill.services.configuration.ConfigurationService;
import com.netchill.services.moviepreview.StreamingService;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/stream")
@Tag(name = "Streaming", description = "Trailer and movies")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@PublicApi
@Singleton
public class StreamingWs {
    private final ConfigurationService configurationService;
    private  final StreamingService movieStreamingService;
    private final MovieDao movieDao;

    @Inject
    public StreamingWs(ConfigurationService configurationService, StreamingService movieStreamingService, MovieDao movieDao){
        this.configurationService = configurationService;
        this.movieStreamingService = movieStreamingService;
        this.movieDao = movieDao;
    }
    @GET
    @Path("/serie/{id}")
    public TrailerKey getSerieTrailerById(@PathParam("id") Long id){
        return this.movieStreamingService.getSerieTrailerById(id);
    }
    @GET
    @Path("/movie/{id}")
    public TrailerKey getMovieTrailerById(@PathParam("id") Long id){
        return this.movieStreamingService.getMovieTrailerById(id);
    }
    @GET
    @Path("/genre/{id}")
    public Genre getGenreById(@PathParam("id") Long id){
        return this.movieDao.getGenreById(id);
    }
}
