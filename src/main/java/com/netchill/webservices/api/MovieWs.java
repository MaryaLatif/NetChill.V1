package com.netchill.webservices.api;

import com.coreoz.plume.jersey.errors.WsException;
import com.coreoz.plume.jersey.security.permission.PublicApi;
import com.netchill.api.moviedb.models.Production;
import com.netchill.services.movie.MovieService;
import com.netchill.webservices.error.NetchillWsError;
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
        return this.movieService.getMovieById(id)
                .orElseThrow(()->new WsException(NetchillWsError.RESOURCE_NOT_FOUND));
    }

    @GET
    @Path("/top-rated")
    public List<Production> getTopRated() {
        return movieService.getTopRated();
    }

    @GET
    @Path("/top-rated/genre")
    public List<Production> getTopRatedByGenre(@QueryParam("genre") Long genre) {
        return movieService.getTopRatedByGenre(genre);
    }

    @GET
    @Path("/for-you")
    public List<Production> getMoviesByIds(){
        return this.movieService.getMoviesByIds();
    }
}
