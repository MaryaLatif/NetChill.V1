package com.netchill.services.serie;

import com.netchill.api.moviedb.MovieDbApiClient;
import com.netchill.api.moviedb.models.Serie;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class SerieService {
    private MovieDbApiClient movieDbApiClient;
    @Inject
    private SerieService(MovieDbApiClient movieDbApiClient){
        this.movieDbApiClient = movieDbApiClient;
    }

    public Serie getSerieById(Long id){
        return this.movieDbApiClient.getSerieById(id);
    }
}
