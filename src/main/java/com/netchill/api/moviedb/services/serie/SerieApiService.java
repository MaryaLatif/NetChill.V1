package com.netchill.api.moviedb.services.serie;

import com.netchill.api.moviedb.TmdbApiClient;
import com.netchill.api.moviedb.models.MovieDbPaginatedResponse;
import com.netchill.api.moviedb.models.Production;
import com.netchill.api.moviedb.models.SaisonEpisodes;
import com.netchill.api.moviedb.models.Serie;
import com.netchill.services.configuration.ConfigurationService;
import okhttp3.MediaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nullable;
import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class SerieApiService {
    private static final int NETFLIX_ID = 213;
    private final SerieApiRetrofit serieApi;
    private final TmdbApiClient apiClient;
    private final ConfigurationService configurationService;

    @Inject
    private SerieApiService(TmdbApiClient movieDbApiClient, ConfigurationService configurationService) {
        this.configurationService = configurationService;

        this.apiClient = movieDbApiClient;
        // Crée l'api grace à l'interface retrofit
        this.serieApi = this.apiClient.buildApiInterface(SerieApiRetrofit.class);
    }

    public MovieDbPaginatedResponse<Production> getNetflixOriginals() {
        return this.getNetflixOriginals(null);
    }

    public MovieDbPaginatedResponse<Production> getNetflixOriginals(@Nullable Integer page) {
        return this.apiClient.executeRequest(serieApi.getNetflixOriginals(
            this.configurationService.getMovieDbApiKey(),
            NETFLIX_ID,
            page
        ));
    }

    public Production getSerieById(Long id) {
        return this.apiClient.executeRequest(serieApi.getSerieById(
            id,
            this.configurationService.getMovieDbApiKey()
            ));
    }

    public SaisonEpisodes getEpisodesOfSaison(Long id, int season){
        return this.apiClient.executeRequest(serieApi.getEpisodesOfSaison(
            id,
            season,
            this.configurationService.getMovieDbApiKey()
        ));
    }
}
