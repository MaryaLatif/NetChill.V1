package com.netchill.services.moviepreview;

import com.netchill.api.moviedb.MovieDbApiClient;
import com.netchill.api.moviedb.models.ResultTrailer;

import javax.inject.Inject;
import java.util.List;

public class MovieStreamingService {
    private MovieDbApiClient movieDbApiClient;

    @Inject
    private MovieStreamingService(MovieDbApiClient movieDbApiClient){
        this.movieDbApiClient = movieDbApiClient;
    }

    /*
    public List<ResultTrailer> getTrailerById(Integer id){
        return this.movieDbApiClient.getTrailerById(id).getResults();
    }

     */

}
