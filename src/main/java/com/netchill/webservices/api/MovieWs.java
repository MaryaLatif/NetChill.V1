package com.netchill.webservices.api;

import com.coreoz.plume.jersey.security.permission.PublicApi;
import com.netchill.api.moviedb.models.Movie;
import com.netchill.api.moviedb.models.Production;
import com.netchill.services.movie.MovieService;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/movies")
@Tag(name = "Movie", description = "MovieDB API")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@PublicApi
@Singleton
public class MovieWs {
    private MovieService movieService;

    @Inject
    private MovieWs(MovieService movieService) {
        this.movieService = movieService;
    }

    @GET
    @Path("/{id}")
    public Production getMovieById(@PathParam("id") Long id) {
        Production result = this.movieService.getMovieById(id);

        if (result == null) {
            throw new NullPointerException();
        }

        return result;
    }

    @GET
    @Path("/top-rated")
    public List<Production> getTopRated() {
        return movieService.getTopRated();
    }

    @GET
    @Path("/")
    public List<Production> getTopMovieByGenre(@QueryParam("genre") int genre) {
        List<Production> results = movieService.getTopMoviesByGenre(genre);

        return results;
    }
}
