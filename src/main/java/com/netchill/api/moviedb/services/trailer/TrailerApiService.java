package com.netchill.api.moviedb.services.trailer;

import com.netchill.api.moviedb.TmdbApiClient;
import com.netchill.api.moviedb.models.Trailer;
import com.netchill.api.moviedb.services.serie.SerieApiService;
import com.netchill.services.configuration.ConfigurationService;
import okhttp3.MediaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

    public Trailer getSerieTrailerById(Long id) {
        return this.apiClient.executeRequest(trailerApi.getSerieTrailerById(
                id,
                this.configurationService.getMovieDbApiKey()
        ));
    }

    public Trailer getMovieTrailerById(Long id) {
        return this.apiClient.executeRequest(trailerApi.getMovieTrailerById(
                id,
                this.configurationService.getMovieDbApiKey()
        ));
    }
}
