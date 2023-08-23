package com.netchill.api.moviedb.services.trailer;

import com.netchill.api.moviedb.MovieDBApiService;
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
    // Logger pour ecrire des logs plusieur niveau .info .debug .error .warn
    private static final Logger LOGGER = LoggerFactory.getLogger(SerieApiService.class);
    private static final MediaType MEDIA_TYPE_JSON = MediaType.parse("application/json; charset=utf-8");
    private final TrailerApiRetrofit trailerApi;
    private final MovieDBApiService apiClient;
    private final ConfigurationService configurationService;

    @Inject
    private TrailerApiService(MovieDBApiService apiClient, ConfigurationService configurationService){
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
