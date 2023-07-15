package com.netchill.services.moviepreview;

import com.netchill.api.moviedb.models.Preview;
import com.netchill.api.moviedb.models.MovieDbPaginatedResponse;
import com.netchill.api.moviedb.MovieDbApiClient;
import com.netchill.db.dao.movie.MovieDao;
import com.netchill.db.generated.Genre;
import com.querydsl.core.Tuple;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;

@Singleton
public class MoviePreviewService {
    private final MovieDbApiClient movieDbApiClient;
    private final MovieDao movieDao;

    @Inject
    private MoviePreviewService(MovieDbApiClient movieDbApiClient, MovieDao movieDao) {
        this.movieDbApiClient = movieDbApiClient;
        this.movieDao = movieDao;
    }

    public List<Preview> getTopNetflixOriginals() {
        return this.movieDbApiClient.getNetflixOriginals(null).getResults();
    }

    public MovieDbPaginatedResponse<Preview> getMoviesByGenre(int genre, int page) {
        return this.movieDbApiClient.getMoviesByGenre(genre, page);
    }

    public List<Preview> getTopRated() {
        return this.movieDbApiClient.getTopRated(null).getResults();
    }

    public List<Preview> getTrending() {
        return this.movieDbApiClient.getTrending(null).getResults();
    }

    public MovieDbPaginatedResponse<Preview> getAllNetflixOriginals(Integer page) {
        return this.movieDbApiClient.getNetflixOriginals(page);
    }

    public List<Preview> getTopMoviesByGenre(int genre) {
        return this.movieDbApiClient.getMoviesByGenre(genre, null).getResults();
    }

    public List<Genre> getPreviewGenres() {
        return this.movieDao.getPreviewGenres();
    }
}

