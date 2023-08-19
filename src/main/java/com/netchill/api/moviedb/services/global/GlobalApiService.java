package com.netchill.api.moviedb.services.global;

import com.netchill.api.moviedb.TmdbApiClient;
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
    private final GlobalApiRetrofit globalApi;
    private final TmdbApiClient apiClient;
    private final ConfigurationService configurationService;
    @Inject
    private GlobalApiService(TmdbApiClient apiClient, ConfigurationService configurationService) {
        this.configurationService = configurationService;
        this.apiClient = apiClient;
        this.globalApi = this.apiClient.getRetrofitClient().create(GlobalApiRetrofit.class);
    }

    public MovieDbPaginatedResponse<Production> getTrending(@Nullable Integer page) {
        return this.apiClient.executeRequest(globalApi.getTrending(
                this.configurationService.getMovieDbApiKey(),
                this.apiClient.getLanguage(),
                page
        ));
    }
}
