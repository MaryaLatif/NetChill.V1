package com.netchill.webservices.api;

import com.coreoz.plume.jersey.security.permission.PublicApi;

import com.netchill.api.moviedb.models.Configuration;
import com.netchill.services.configuration.ConfigurationService;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/configuration")
@Tag(name = "Configuration", description = "front-end configuration web-service")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@PublicApi
@Singleton
public class ConfigurationWs {
    private String imageBaseUrl;
    private String connectionKey;

    @Inject
    private ConfigurationWs(ConfigurationService configurationService){
        this.imageBaseUrl = configurationService.getImageBaseUrl();
        this.connectionKey = configurationService.getConnectionKey();
    }

    @GET
    @Path("/image-base-url")
    public Configuration getConfiguration(){
        return new Configuration(this.imageBaseUrl, this.connectionKey);
    }
}
