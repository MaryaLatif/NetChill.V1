package com.netchill.webservices.api;

import com.coreoz.plume.jersey.security.permission.PublicApi;
import com.netchill.db.generated.Genre;
import com.netchill.services.configuration.ConfigurationService;
import com.netchill.services.general.GeneralService;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("")
@Tag(name = "General", description = "things that are same in movie and serie")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@PublicApi
@Singleton
public class GeneralWs {
    private final ConfigurationService configurationService;
    private  final GeneralService generalService;

    @Inject
    public GeneralWs(ConfigurationService configurationService, GeneralService generalService){
        this.configurationService = configurationService;
        this.generalService = generalService;
    }
    @GET
    @Path("/genre/{id}")
    public Genre getGenreById(@PathParam("id") Long id){
        return this.generalService.getGenreById(id);
    }

}
