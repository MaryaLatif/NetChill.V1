package com.netchill.api.moviedb.services.movie;

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
public class MovieApiService {
    // Logger pour ecrire des logs plusieur niveau .info .debug .error .warn
    private static final Logger LOGGER = LoggerFactory.getLogger(MovieApiService.class);
    private static final MediaType MEDIA_TYPE_JSON = MediaType.parse("application/json; charset=utf-8");
    private static final String LANGUAGE = "en-US";
    private final MovieApiRetrofit movieApi;
    private final MovieDBApiService apiClient;
    private final ConfigurationService configurationService;

    @Inject
    private MovieApiService(MovieDBApiService movieDbApiClient, ConfigurationService configurationService) {
        this.configurationService = configurationService;
        this.apiClient = movieDbApiClient;
        // Crée l'api grace à l'interface retrofit
        this.movieApi = this.apiClient.getRetrofitClient().create(MovieApiRetrofit.class);
    }

    public MovieDbPaginatedResponse<Production> getMoviesByGenre(int genre, @Nullable Integer page) {
        return this.apiClient.executeRequest(movieApi.getMovieByGenre(
                        this.configurationService.getMovieDbApiKey(),
                        genre,
                        page
                )
        );
    }

    public MovieDbPaginatedResponse<Production> getTopRated(@Nullable Integer page) {
        return this.apiClient.executeRequest(movieApi.getTopRated(
                        this.configurationService.getMovieDbApiKey(),
                        LANGUAGE,
                        page
                )
        );
    }

    public Production getMovieById(Long id) {
        return this.apiClient.executeRequest(movieApi.getMovieById(
                id,
                this.configurationService.getMovieDbApiKey()
        ));
    }


}
