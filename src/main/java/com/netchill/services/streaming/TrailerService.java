package com.netchill.services.streaming;

import com.coreoz.plume.jersey.errors.WsException;
import com.netchill.api.moviedb.models.MediaVideo;
import com.netchill.api.moviedb.models.YoutubeKey;
import com.netchill.api.moviedb.services.trailer.TrailerApiService;
import com.netchill.webservices.error.NetchillWsError;
import lombok.extern.slf4j.Slf4j;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;
import java.util.Optional;

@Slf4j
@Singleton
public class TrailerService {
    private TrailerApiService trailerApiClient;
    private static final String TRAILER_TYPE = "Trailer";

    @Inject
    private TrailerService(TrailerApiService trailerApiClient) {
        this.trailerApiClient = trailerApiClient;
    }

    public Optional<YoutubeKey> getTrailerBySerieId(Long id) {
        try {
            MediaVideo trailer = trailerApiClient.getVideosBySerieId(id);
            return this.getTrailer(trailer.getKeyList());
        } catch (Exception e) {
            log.warn("Error when fetching the video with serie id {}", id, e);
            return Optional.empty();
        }
    }

    public Optional<YoutubeKey> getTrailerByMovieId(Long id) {
        try {
            MediaVideo trailer = trailerApiClient.getVideosByMovieId(id);
            return this.getTrailer(trailer.getKeyList());
        } catch (Exception e) {
            log.warn("Error when fetching the video with movie id {}", id, e);
            return Optional.empty();
        }
    }

    private Optional<YoutubeKey> getTrailer(List<YoutubeKey> trailers) {
        if(trailers.isEmpty()) {
            return Optional.of(new YoutubeKey());
        }
        return Optional.of(trailers.stream()
            .filter(trailer -> TRAILER_TYPE.equals(trailer.getType()))
            .findFirst()
            // returns the first video if there is no type of trailer available, is better than nothing
            .orElse(trailers.get(0)));
    }
}
