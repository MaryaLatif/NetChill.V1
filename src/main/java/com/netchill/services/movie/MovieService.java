package com.netchill.services.movie;

import com.netchill.api.moviedb.models.MovieDbPaginatedResponse;
import com.netchill.api.moviedb.models.Production;
import com.netchill.api.moviedb.services.movie.MovieApiService;
import com.netchill.db.dao.movie.MovieDao;
import com.netchill.services.configuration.ConfigurationService;
import lombok.extern.slf4j.Slf4j;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
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

    public Optional<Production> getMovieById(Long movieId) {
        try {
            return Optional.of(this.movieApiClient.getMovieById(movieId));
        } catch (Exception e) {
            log.warn("Error when fetching movie with id: {}", movieId, e);
            return Optional.empty();
        }
    }

    public List<Production> getTopRatedByGenre(Long genre) {
        return this.movieApiClient.getMoviesByGenre(genre).getResults();
    }

    public Optional<MovieDbPaginatedResponse<Production>> getMoviesByGenre(Long genre, int page) {
        try{
            return Optional.of(this.movieApiClient.getMoviesByGenre(genre, page));
        } catch (Exception e){
            log.warn("Error when fetching paginated movies with this genre id {} and page {} ", genre, page, e );
            return Optional.empty();
        }
    }

    public List<Production> getTopRated() {
        return this.movieApiClient.getTopRated().getResults();
    }

    public List<Production> getMoviesByIds(){
        List<Production> movies = new ArrayList<>();
        for(Long id: this.movieDao.getForYouMovies()){
            movies.add(this.movieApiClient.getMovieById(id));
        }

        return movies;
    }
}
