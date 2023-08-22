package com.netchill.services.streaming;

import com.netchill.api.moviedb.models.MediaVideo;
import com.netchill.api.moviedb.models.YoutubeKey;
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

    public Optional<YoutubeKey> getTrailerBySerieId(Long id) {
        MediaVideo trailer = trailerApiClient.getVideosBySerieId(id);
        return this.getTrailer(trailer.getKeyList());
    }

    public Optional<YoutubeKey> getTrailerByMovieId(Long id) {
        MediaVideo trailer = trailerApiClient.getVideosByMovieId(id);
        return this.getTrailer(trailer.getKeyList());
    }

    private Optional<YoutubeKey> getTrailer(List<YoutubeKey> trailers) {
        return Optional.of(trailers.stream()
                .filter(trailer -> TRAILER_TYPE.equals(trailer.getType()))
                .findFirst()
                // returns the first video if there is no type of trailer available, is better then nothing at all
                .orElse(trailers.get(0)));
    }
}
