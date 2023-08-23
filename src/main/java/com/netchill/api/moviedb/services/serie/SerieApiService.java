package com.netchill.api.moviedb.services.serie;

import com.netchill.api.moviedb.MovieDBApiService;
import com.netchill.api.moviedb.models.MovieDbPaginatedResponse;
import com.netchill.api.moviedb.models.Production;
import com.netchill.services.configuration.ConfigurationService;
import okhttp3.MediaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nullable;
import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class SerieApiService {
    // Logger pour ecrire des logs plusieur niveau .info .debug .error .warn
    private static final Logger LOGGER = LoggerFactory.getLogger(SerieApiService.class);
    private static final MediaType MEDIA_TYPE_JSON = MediaType.parse("application/json; charset=utf-8");
    private static final int NETFLIX_ID = 213;
    private static final String LANGUAGE = "en-US";

    private final SerieApiRetrofit serieApi;
    private final MovieDBApiService apiClient;
    private final ConfigurationService configurationService;

    @Inject
    private SerieApiService(MovieDBApiService movieDbApiClient, ConfigurationService configurationService) {
        this.configurationService = configurationService;

        this.apiClient = movieDbApiClient;
        // Crée l'api grace à l'interface retrofit
        this.serieApi = this.apiClient.getRetrofitClient().create(SerieApiRetrofit.class);
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

}
