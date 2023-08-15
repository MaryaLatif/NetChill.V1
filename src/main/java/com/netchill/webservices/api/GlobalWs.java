package com.netchill.webservices.api;

import javax.inject.Inject;
import javax.inject.Singleton;

import com.coreoz.plume.jersey.security.permission.PublicApi;

import com.netchill.api.moviedb.models.Production;
import com.netchill.services.global.GlobalService;
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
public class GlobalWs {
    private final ConfigurationService configurationService;
    private final GlobalService moviePreviewService;

    @Inject
    public GlobalWs(ConfigurationService configurationService, GlobalService movieDBApiClient) {
        this.configurationService = configurationService;
        this.moviePreviewService = movieDBApiClient;
    }
    @GET
    @Path("/trending")
    public List<Production> getTrending() {
        return moviePreviewService.getTrending();
    }
}
