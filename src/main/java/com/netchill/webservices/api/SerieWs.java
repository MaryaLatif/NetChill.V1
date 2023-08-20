package com.netchill.webservices.api;

import com.coreoz.plume.jersey.errors.WsException;
import com.coreoz.plume.jersey.security.permission.PublicApi;
import com.netchill.api.moviedb.models.Production;
import com.netchill.api.moviedb.models.Serie;
import com.netchill.services.serie.SerieService;
import com.netchill.webservices.error.NetchillWsError;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.Optional;

@Path("/series")
@Tag(name = "Serie", description = "All about tv show")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@PublicApi
@Singleton
public class SerieWs {
    private SerieService serieService;

    @Inject
    private SerieWs(SerieService serieService) {
        this.serieService = serieService;
    }

    @GET
    @Path("/{id}")
    public Optional<Production> getSerieById(@PathParam("id") Long id) {
        return Optional.ofNullable(this.serieService.getSerieById(id).orElseThrow(()-> new WsException(NetchillWsError.RESOURCE_NOT_FOUND)));
    }

    @GET
    @Path("/netflix-originals")
    public List<Production> getTopNetflixOriginals() {
        return serieService.getTopNetflixOriginals();
    }
}
