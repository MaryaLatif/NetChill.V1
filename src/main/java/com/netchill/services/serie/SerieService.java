package com.netchill.services.serie;

import com.netchill.api.moviedb.models.MovieDbPaginatedResponse;
import com.netchill.api.moviedb.models.Production;
import com.netchill.api.moviedb.services.serie.SerieApiService;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;

@Singleton
public class SerieService {
    private SerieApiService serieApiClient;

    @Inject
    private SerieService(SerieApiService serieApiClient) {
        this.serieApiClient = serieApiClient;
    }

    public List<Production> getTopNetflixOriginals() {
        List<Production> prod = this.serieApiClient.getNetflixOriginals(null).getResults();
        return prod;
    }

    public MovieDbPaginatedResponse<Production> getAllNetflixOriginals(Integer page) {
        return this.serieApiClient.getNetflixOriginals(page);
    }

    public Production getSerieById(Long id) {
        return this.serieApiClient.getSerieById(id);
    }
}
