package com.netchill.webservices.api;

import com.coreoz.plume.jersey.errors.WsException;
import com.coreoz.plume.jersey.security.permission.PublicApi;
import com.netchill.db.generated.Genre;
import com.netchill.services.configuration.ConfigurationService;
import com.netchill.services.genre.GenreService;
import com.netchill.webservices.error.NetchillWsError;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.Optional;

@Path("/genres")
@Tag(name = "Genre", description = "WS about genres")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@PublicApi
@Singleton
public class GenreWs {
    private final ConfigurationService configurationService;
    private final GenreService genreService;

    @Inject
    public GenreWs(ConfigurationService configurationService, GenreService genreService) {
        this.configurationService = configurationService;
        this.genreService = genreService;
    }

    @GET
    @Path("/{id}")
    public Genre getGenreById(@PathParam("id") Long id) {
        return this.genreService.getGenreById(id)
                .orElseThrow(() -> new WsException(NetchillWsError.RESOURCE_NOT_FOUND));
    }

    @GET
    @Path("/featured")
    public List<Genre> getPreviewGenres() {
        return this.genreService.featuredGenre();
    }
}
