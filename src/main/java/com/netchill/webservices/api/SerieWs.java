package com.netchill.webservices.api;

import com.coreoz.plume.jersey.errors.WsException;
import com.coreoz.plume.jersey.security.permission.PublicApi;
import com.netchill.api.moviedb.models.Episode;
import com.netchill.api.moviedb.models.Production;
import com.netchill.api.moviedb.models.Serie;
import com.netchill.services.serie.SerieService;
import com.netchill.webservices.error.NetchillWsError;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.models.security.SecurityScheme;

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
    public Production getSerieById(@PathParam("id") Long id) {
        return this.serieService.getSerieById(id)
            .orElseThrow(() -> new WsException(NetchillWsError.RESOURCE_NOT_FOUND));
    }

    @GET
    @Path("/netflix-originals")
    public List<Production> getTopNetflixOriginals() {
        return serieService.getTopNetflixOriginals();
    }

    @GET
    @Path("/for-you")
    public List<Production> getSeriesByIds() {
        return this.serieService.getSeriesByIds();
    }

    @GET
    @Path("/{id}/episodes")
    public List<Episode> getEpisodesOfSeason(@PathParam("id") Long id, @QueryParam("season") Integer season) {
        return this.serieService.getEpisodesOfSeason(id, season);
    }

    @GET
    @Path("/{id}/seasons-availables")
    public List<Integer> getSeasonAvailable(@PathParam("id") Long id){
        return this.serieService.getSeasonAvailable(id);
    }
}
