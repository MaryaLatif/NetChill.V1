package com.netchill.webservices.api;

import com.coreoz.plume.jersey.security.permission.PublicApi;

import com.netchill.services.configuration.ConfigurationService;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/image")
@Tag(name = "Movie", description = "Image base url")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@PublicApi
@Singleton
public class ImageWs {
    private String imageBaseUrl;

    @Inject
    private ImageWs(ConfigurationService configurationService){
        this.imageBaseUrl = configurationService.getImageBaseUrl();
    }

    @GET
    @Path("/base-url")
    public String getImageBaseUrl(){
        return this.imageBaseUrl;
    }
}
