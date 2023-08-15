package com.netchill.services.movie;

import com.netchill.api.moviedb.models.MovieDbPaginatedResponse;
import com.netchill.api.moviedb.models.Production;
import com.netchill.api.moviedb.services.movie.MovieApiService;
import com.netchill.db.dao.movie.MovieDao;
import com.netchill.services.configuration.ConfigurationService;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;

@Singleton
public class MovieService {
    private MovieDao movieDao;
    private MovieApiService movieApiClient;
    private ConfigurationService configurationService;

    @Inject
    private MovieService(MovieDao movieDao, MovieApiService movieDbApiClient, ConfigurationService configurationService) {
        this.movieDao = movieDao;
        this.movieApiClient = movieDbApiClient;
        this.configurationService = configurationService;
    }

    public Production getMovieById(Long movieId) {
        return this.movieApiClient.getMovieById(movieId);
    }

    public List<Long> getMovieGenres(Long movieId) {
        return this.movieApiClient.getMovieById(movieId).getGenre_ids();
    }

    public List<Production> getTopRatedByGenre(int genre) {
        return this.movieApiClient.getMoviesByGenre(genre, null).getResults();
    }

    public MovieDbPaginatedResponse<Production> getMoviesByGenre(int genre, int page) {
        return this.movieApiClient.getMoviesByGenre(genre, page);
    }

    public List<Production> getTopRated() {
        return this.movieApiClient.getTopRated(null).getResults();
    }
}
