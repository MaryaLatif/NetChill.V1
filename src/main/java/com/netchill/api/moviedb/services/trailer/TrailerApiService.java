package com.netchill.api.moviedb.services.trailer;

import com.netchill.api.moviedb.TmdbApiClient;
import com.netchill.api.moviedb.models.MediaVideo;
import com.netchill.services.configuration.ConfigurationService;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class TrailerApiService {
    private final TrailerApiRetrofit trailerApi;
    private final TmdbApiClient apiClient;
    private final ConfigurationService configurationService;

    @Inject
    private TrailerApiService(TmdbApiClient apiClient, ConfigurationService configurationService){
        this.configurationService = configurationService;
        this.apiClient = apiClient;
        this.trailerApi = this.apiClient.getRetrofitClient().create(TrailerApiRetrofit.class);
    }

    public MediaVideo getVideosBySerieId(Long id) {
        return this.apiClient.executeRequest(trailerApi.getTrailerBySerieId(
                this.configurationService.getMovieDbApiKey(),
                id
        ));
    }

    public MediaVideo getVideosByMovieId(Long id) {
        return this.apiClient.executeRequest(trailerApi.getTrailerByMovieId(
                this.configurationService.getMovieDbApiKey(),
                id
        ));
    }
}
