package com.netchill.webservices.api;

import com.coreoz.plume.jersey.security.permission.PublicApi;
import com.netchill.api.moviedb.models.Genre;
import com.netchill.api.moviedb.models.Movie;
import com.netchill.api.moviedb.models.Preview;
import com.netchill.services.moviepreview.MovieService;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/movies")
@Tag(name = "Movie", description = "MovieDB API")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@PublicApi
@Singleton
public class MovieWs {
    private MovieService movieService;
    @Inject
    private MovieWs(MovieService movieService){
        this.movieService = movieService;
    }

    @GET
    @Path("/{id}")
    public Movie getMovieById(@PathParam("id") Long id){
        return this.movieService.getMovieById(id);
    }

    /*
    @GET
    @Path("/genre/{id}")
    public Genre getGenreById(@PathParam("id") Long id){
        return this.movieService.getGenreById(id);
    }

     */
}
