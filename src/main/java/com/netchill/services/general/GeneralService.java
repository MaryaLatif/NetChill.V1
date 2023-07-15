package com.netchill.services.general;

import com.netchill.api.moviedb.MovieDbApiClient;
import com.netchill.db.dao.movie.MovieDao;
import com.netchill.db.generated.Genre;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class GeneralService {
    private final MovieDbApiClient movieDbApiClient;
    private final MovieDao movieDao;

    @Inject
    private GeneralService(MovieDbApiClient movieDbApiClient, MovieDao movieDao) {
        this.movieDbApiClient = movieDbApiClient;
        this.movieDao = movieDao;
    }


    public Genre getGenreById(Long id) {
        return this.movieDao.getGenreById(id);
    }


}
