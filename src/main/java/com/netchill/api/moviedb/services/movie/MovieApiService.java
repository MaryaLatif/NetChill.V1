package com.netchill.api.moviedb.services.movie;

import com.netchill.api.moviedb.TmdbApiClient;
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
    private final MovieApiRetrofit movieApi;
    private final TmdbApiClient apiClient;
    private final ConfigurationService configurationService;

    @Inject
    private MovieApiService(TmdbApiClient movieDbApiClient, ConfigurationService configurationService) {
        this.configurationService = configurationService;
        this.apiClient = movieDbApiClient;
        // Crée l'api grace à l'interface retrofit
        this.movieApi = this.apiClient.getRetrofitClient().create(MovieApiRetrofit.class);
    }

    //TODO passer par une Function
    public MovieDbPaginatedResponse<Production> getMoviesByGenre(Long genre) {
        return this.getMoviesByGenre(genre, null);
    }

    public MovieDbPaginatedResponse<Production> getMoviesByGenre(Long genre, @Nullable Integer page) {
        return this.apiClient.executeRequest(movieApi.getMovieByGenre(
                        this.configurationService.getMovieDbApiKey(),
                        genre,
                        page
                )
        );
    }

    public MovieDbPaginatedResponse<Production> getTopRated() {
        return this.getTopRated(null);
    }

    public MovieDbPaginatedResponse<Production> getTopRated(@Nullable Integer page) {
        return this.apiClient.executeRequest(movieApi.getTopRated(
                        this.configurationService.getMovieDbApiKey(),
                        this.apiClient.LANGUAGE,
                        page
                )
        );
    }

    public Production getMovieById(Long id) {
        return this.apiClient.executeRequest(movieApi.getMovieById(
                this.configurationService.getMovieDbApiKey(),
                id
        ));
    }
}
