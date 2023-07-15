package com.netchill.webservices.api;

import com.coreoz.plume.jersey.security.permission.PublicApi;
import com.netchill.api.moviedb.models.Serie;
import com.netchill.services.serie.SerieService;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/series")
@Tag(name = "Serie", description = "All about tv show")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@PublicApi
@Singleton
public class SerieWs {
    private SerieService serieService;
    @Inject
    private SerieWs(SerieService serieService){
        this.serieService = serieService;
    }
    @GET
    @Path("/{id}")
    public Serie getSerieById(@PathParam("id") Long id){
        return this.serieService.getSerieById(id);
    }
}
