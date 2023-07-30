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
        Production movie = this.movieApiClient.getMovieById(movieId);
        String imageKey = movie.getBackdrop_path();
        List<Production> movies = List.of(movie);

        return movie;
    }

    public List<Long> getMovieGenres(Long movieId) {
        return this.movieApiClient.getMovieById(movieId).getGenre_ids();
    }

    public List<Production> getTopMoviesByGenre(int genre) {
        List<Production> movies = this.movieApiClient.getMoviesByGenre(genre, null).getResults();
        return movies;
    }

    public MovieDbPaginatedResponse<Production> getMoviesByGenre(int genre, int page) {
        return this.movieApiClient.getMoviesByGenre(genre, page);
    }

    public List<Production> getTopRated() {
        List<Production> prod = this.movieApiClient.getTopRated(null).getResults();
        return prod;
    }

}
