package com.netchill.services.serie;

import com.coreoz.plume.jersey.errors.WsException;
import com.netchill.api.moviedb.models.MovieDbPaginatedResponse;
import com.netchill.api.moviedb.models.Production;
import com.netchill.api.moviedb.services.serie.SerieApiService;
import com.netchill.webservices.error.NetchillWsError;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;
import java.util.Optional;

@Singleton
public class SerieService {
    private SerieApiService serieApiClient;

    @Inject
    private SerieService(SerieApiService serieApiClient) {
        this.serieApiClient = serieApiClient;
    }

    public List<Production> getTopNetflixOriginals() {
        return this.serieApiClient.getNetflixOriginals().getResults();
    }

    public MovieDbPaginatedResponse<Production> getAllNetflixOriginals(Integer page) {
        return this.serieApiClient.getNetflixOriginals(page);
    }

    public Optional<Production> getSerieById(Long id) {
        return Optional.ofNullable(
                Optional.of(this.serieApiClient.getSerieById(id))
                        .orElseThrow(()-> new WsException(NetchillWsError.RESOURCE_NOT_FOUND))
        );
    }
}
