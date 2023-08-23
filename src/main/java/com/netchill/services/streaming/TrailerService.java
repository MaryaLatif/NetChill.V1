package com.netchill.services.streaming;

import com.netchill.api.moviedb.MovieDBApiService;
import com.netchill.api.moviedb.models.Trailer;
import com.netchill.api.moviedb.models.TrailerKey;
import com.netchill.api.moviedb.services.trailer.TrailerApiService;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;

@Singleton
public class TrailerService {
    private TrailerApiService trailerApiClient;
    private static final String TRAILER_TYPE = "Trailer";

    @Inject
    private TrailerService(TrailerApiService trailerApiClient) {
        this.trailerApiClient = trailerApiClient;
    }

    private TrailerKey trailerOk(List<TrailerKey> trailerKeys) {
        if (trailerKeys.isEmpty()) {
            return new TrailerKey();
        }

        for (TrailerKey key : trailerKeys) {
            if (key.getType().equals(TRAILER_TYPE)) {
                return key;
            }
        }

        return trailerKeys.get(0);
    }

    public TrailerKey getSerieTrailerById(Long id) {
        Trailer trailer = trailerApiClient.getSerieTrailerById(id);
        return this.trailerOk(trailer.getKeyList());
    }

    public TrailerKey getMovieTrailerById(Long id) {
        Trailer trailer = trailerApiClient.getMovieTrailerById(id);
        return this.trailerOk(trailer.getKeyList());
    }

}
