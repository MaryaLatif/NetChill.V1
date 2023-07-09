package com.netchill.webservices.api;

import javax.inject.Inject;
import javax.inject.Singleton;

import com.coreoz.plume.jersey.security.permission.PublicApi;

import com.netchill.api.moviedb.models.Movie;
import com.netchill.services.moviepreview.MoviePreviewService;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.netchill.services.configuration.ConfigurationService;

import java.util.List;

@Path("/movies")
@Tag(name = "MovieDB", description = "MovieDB API")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@PublicApi
@Singleton
public class MovieWs {
    private final ConfigurationService configurationService;
    private final MoviePreviewService moviePreviewService;

    @Inject
    public MovieWs(ConfigurationService configurationService, MoviePreviewService movieDBApiClient) {
        this.configurationService = configurationService;
        this.moviePreviewService = movieDBApiClient;
    }
    @GET
    @Path("/top-rated")
    public List<Movie> getTopRated() {
        return moviePreviewService.getTopRated();
    }
    @GET
    @Path("/netflix-originals")
    public List<Movie> getTopNetflixOriginals(){
        return moviePreviewService.getTopNetflixOriginals();
    }
    @GET
    @Path("/trending")
    public List<Movie> getTrending(){
        return moviePreviewService.getTrending();
    }
    @GET
    @Path("/genre/{genre}")
    public List<Movie> getTopMovieByGenre(@PathParam("genre") int genre){
        return moviePreviewService.getTopMoviesByGenre(genre);
    }
}
