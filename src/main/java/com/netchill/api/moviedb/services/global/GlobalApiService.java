package com.netchill.api.moviedb.services.global;

import com.netchill.api.moviedb.MovieDBApiService;
import com.netchill.api.moviedb.models.MovieDbPaginatedResponse;
import com.netchill.api.moviedb.models.Production;
import com.netchill.api.moviedb.services.serie.SerieApiService;
import com.netchill.services.configuration.ConfigurationService;
import okhttp3.MediaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nullable;
import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class GlobalApiService {
    // Logger pour ecrire des logs plusieur niveau .info .debug .error .warn
    private static final Logger LOGGER = LoggerFactory.getLogger(SerieApiService.class);
    private static final MediaType MEDIA_TYPE_JSON = MediaType.parse("application/json; charset=utf-8");
    private static final String LANGUAGE = "en-US";

    private final GlobalApiRetrofit globalApi;
    private final MovieDBApiService apiClient;
    private final ConfigurationService configurationService;
    @Inject
    private GlobalApiService(MovieDBApiService apiClient, ConfigurationService configurationService) {
        this.configurationService = configurationService;
        this.apiClient = apiClient;
        this.globalApi = this.apiClient.getRetrofitClient().create(GlobalApiRetrofit.class);
    }

    public MovieDbPaginatedResponse<Production> getTrending(@Nullable Integer page) {
        return this.apiClient.executeRequest(globalApi.getTrending(
                this.configurationService.getMovieDbApiKey(),
                LANGUAGE,
                page
        ));
    }


}
