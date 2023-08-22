package com.netchill.services.streaming;

import com.netchill.api.moviedb.models.Trailers;
import com.netchill.api.moviedb.models.Trailer;
import com.netchill.api.moviedb.services.trailer.TrailerApiService;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;
import java.util.Optional;

@Singleton
public class TrailerService {
    private TrailerApiService trailerApiClient;
    private static final String TRAILER_TYPE = "Trailer";

    @Inject
    private TrailerService(TrailerApiService trailerApiClient) {
        this.trailerApiClient = trailerApiClient;
    }

    public Optional<Trailer> getTrailerBySerieId(Long id) {
        Trailers trailer = trailerApiClient.getTrailerBySerieId(id);
        return this.getTrailer(trailer.getKeyList());
    }

    public Optional<Trailer> getTrailerByMovieId(Long id) {
        Trailers trailer = trailerApiClient.getTrailerByMovieId(id);
        return this.getTrailer(trailer.getKeyList());
    }

    private Optional<Trailer> getTrailer(List<Trailer> trailers) {
        return Optional.of(trailers.stream()
                .filter(trailer -> trailer.getType().equals(TRAILER_TYPE))
                .findFirst()
                // returns the first video if there is no type of trailer available, is better then nothing at all
                .orElse(trailers.get(0)));
    }
}
