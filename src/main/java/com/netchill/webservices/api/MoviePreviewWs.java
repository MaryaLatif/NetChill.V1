package com.netchill.webservices.api;

import javax.inject.Inject;
import javax.inject.Singleton;

import com.coreoz.plume.jersey.security.permission.PublicApi;

import com.netchill.api.moviedb.models.Preview;
import com.netchill.api.moviedb.models.Production;
import com.netchill.db.generated.Genre;
import com.netchill.services.moviepreview.MoviePreviewService;
import com.querydsl.core.Tuple;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import com.netchill.services.configuration.ConfigurationService;

import java.util.List;

@Path("/movies-preview")
@Tag(name = "Preview", description = "Movies for the preview page")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@PublicApi
@Singleton
public class MoviePreviewWs {
    private final ConfigurationService configurationService;
    private final MoviePreviewService moviePreviewService;

    @Inject
    public MoviePreviewWs(ConfigurationService configurationService, MoviePreviewService movieDBApiClient) {
        this.configurationService = configurationService;
        this.moviePreviewService = movieDBApiClient;
    }

    @GET
    @Path("/top-rated")
    public List<Production> getTopRated() {
        return moviePreviewService.getTopRated();
    }

    @GET
    @Path("/netflix-originals")
    public List<Production> getTopNetflixOriginals() {
        return moviePreviewService.getTopNetflixOriginals();
    }

    @GET
    @Path("/trending")
    public List<Production> getTrending() {
        return moviePreviewService.getTrending();
    }

    @GET
    @Path("/genre/")
    public List<Production> getTopMovieByGenre(
            @QueryParam("genre") int genre) {

        List<Production> results = moviePreviewService.getTopMoviesByGenre(genre);

        if (results == null){
            throw new NullPointerException();
        }
        return results;
    }

}
