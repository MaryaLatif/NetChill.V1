package com.netchill.services.movie;

import com.netchill.api.moviedb.MovieDbApiClient;
import com.netchill.api.moviedb.models.Genre;
import com.netchill.api.moviedb.models.Movie;
import com.netchill.api.moviedb.models.MovieDbPaginatedResponse;
import com.netchill.api.moviedb.models.Preview;
import com.netchill.db.dao.movie.MovieDao;
import com.netchill.services.configuration.ConfigurationService;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.ArrayList;
@Singleton
public class MovieService {
    private MovieDao movieDao;
    private MovieDbApiClient movieDbApiClient;
    private ConfigurationService configurationService;
    @Inject
    private MovieService(MovieDao movieDao, MovieDbApiClient movieDbApiClient, ConfigurationService configurationService){
        this.movieDao = movieDao;
        this.movieDbApiClient = movieDbApiClient;
        this.configurationService = configurationService;
    }

    public Movie getMovieById(Long movieId){
        Movie movie = this.movieDbApiClient.getMovieById(movieId);
        String imageKey = movie.getBackdrop_path();
        if(imageKey != null) movie.setBackdrop_path(this.configurationService.getImageBaseUrl()+imageKey);
        imageKey = movie.getPoster_path();
        if(imageKey != null) movie.setPoster_path(this.configurationService.getImageBaseUrl()+imageKey);
        return movie;
    }
    public ArrayList<Long> getMovieGenres(Long movieId) {
        return this.movieDbApiClient.getMovieById(movieId).getGenre_ids();
    }

}
