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
    private StreamingService(MovieDbApiClient movieDbApiClient) {
        this.movieDbApiClient = movieDbApiClient;
    }

    public TrailerKey getSerieTrailerById(Long id) {
        Trailer trailer = movieDbApiClient.getSerieTrailerById(id);
        List<TrailerKey> trailerKeys = trailer.getKeyList();

        if (trailerKeys.isEmpty()) return new TrailerKey();

        for (TrailerKey key : trailerKeys) {
            if (key.getType().equals("Trailer")) {
                return key;
            }
        }
        return trailerKeys.get(0);
    }

    public TrailerKey getMovieTrailerById(Long id) {
        Trailer trailer = movieDbApiClient.getMovieTrailerById(id);
        List<TrailerKey> trailerKeys = trailer.getKeyList();

        if (trailerKeys.isEmpty()) return new TrailerKey();

        for (TrailerKey key : trailerKeys) {
            if (key.getType().equals("Trailer")) {
                return key;
            }
        }
        return trailerKeys.get(0);
    }

}
