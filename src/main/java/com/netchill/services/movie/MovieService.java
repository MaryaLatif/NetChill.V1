package com.netchill.services.movie;

import com.netchill.api.moviedb.MovieDbApiClient;
import com.netchill.api.moviedb.models.Genre;
import com.netchill.api.moviedb.models.Movie;
import com.netchill.api.moviedb.models.MovieDbPaginatedResponse;
import com.netchill.api.moviedb.models.Preview;
import com.netchill.db.dao.movie.MovieDao;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.ArrayList;
@Singleton
public class MovieService {
    private MovieDao movieDao;
    private MovieDbApiClient movieDbApiClient;
    @Inject
    private MovieService(MovieDao movieDao, MovieDbApiClient movieDbApiClient){
        this.movieDao = movieDao;
        this.movieDbApiClient = movieDbApiClient;
    }
/*
    public Genre getGenreById(Long genreId){
        return this.movieDao.getGenreById(genreId);
    }

 */

    public Movie getMovieById(Long movieId){
        return this.movieDbApiClient.getMovieById(movieId);
    }
    public ArrayList<Long> getMovieGenres(Long movieId) {
        return this.movieDbApiClient.getMovieById(movieId).getGenre_ids();
    }

}
