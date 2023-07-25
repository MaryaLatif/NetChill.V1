package com.netchill.services.streaming;

import com.netchill.api.moviedb.MovieDbApiClient;
import com.netchill.api.moviedb.models.Trailer;
import com.netchill.api.moviedb.models.TrailerKey;
import com.netchill.db.dao.movie.MovieDao;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;

@Singleton
public class StreamingService {
    private MovieDbApiClient movieDbApiClient;

    @Inject
    private StreamingService(MovieDbApiClient movieDbApiClient, MovieDao movieDao) {
        this.movieDbApiClient = movieDbApiClient;
    }

    public TrailerKey getSerieTrailerById(Long id) {
        Trailer trailer = movieDbApiClient.getSerieTrailerById(id);
        List<TrailerKey> trailerKeys = trailer.getResults();
        if (trailerKeys.isEmpty()) return new TrailerKey();
        for (int i = 0; i < trailerKeys.size(); i++) {
            if (trailerKeys.get(i).getType().equals("Trailer")) {
                return trailerKeys.get(i);
            }
        }
        return trailerKeys.get(0);
    }

    public TrailerKey getMovieTrailerById(Long id) {
        Trailer trailer = movieDbApiClient.getMovieTrailerById(id);
        List<TrailerKey> trailerKeys = trailer.getResults();
        if (trailerKeys.isEmpty()) return new TrailerKey();
        for (int i = 0; i < trailerKeys.size(); i++) {
            if (trailerKeys.get(i).getType().equals("Trailer")) {
                return trailerKeys.get(i);
            }
        }
        return trailerKeys.get(0);
    }

}
