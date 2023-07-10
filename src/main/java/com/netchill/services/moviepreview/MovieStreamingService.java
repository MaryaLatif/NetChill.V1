package com.netchill.services.moviepreview;

import com.netchill.api.moviedb.MovieDbApiClient;
import com.netchill.api.moviedb.models.ResultTrailer;
import com.netchill.db.dao.movie.MovieDao;

import javax.inject.Inject;
import java.util.List;

public class MovieStreamingService {
    private MovieDbApiClient movieDbApiClient;
    private MovieDao movieDao;

    @Inject
    private MovieStreamingService(MovieDbApiClient movieDbApiClient, MovieDao movieDao){
        this.movieDbApiClient = movieDbApiClient;
        this.movieDao = movieDao;
    }


    public ResultTrailer getTrailerById(Long id){
        return movieDao.getTrailerById(id);
    }


}
