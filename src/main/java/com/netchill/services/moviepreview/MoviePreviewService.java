package com.netchill.services.moviepreview;

import com.netchill.api.moviedb.models.Preview;
import com.netchill.api.moviedb.models.MovieDbPaginatedResponse;
import com.netchill.api.moviedb.MovieDbApiClient;
import com.netchill.api.moviedb.models.Production;
import com.netchill.db.dao.movie.GenreDao;
import com.netchill.db.dao.movie.MovieDao;
import com.netchill.db.generated.Genre;
import com.netchill.services.configuration.ConfigurationService;
import com.netchill.services.movie.MovieService;
import com.querydsl.core.Tuple;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.text.DecimalFormat;
import java.util.List;

@Singleton
public class MoviePreviewService {
    private final MovieDbApiClient movieDbApiClient;
    private final MovieService movieService;
    private final GenreDao genreDao;
    private final ConfigurationService configurationService;

    @Inject
    private MoviePreviewService(MovieDbApiClient movieDbApiClient, MovieService movieService, GenreDao genreDao, ConfigurationService configurationService) {
        this.movieDbApiClient = movieDbApiClient;
        this.movieService = movieService;
        this.genreDao = genreDao;
        this.configurationService = configurationService;
    }

    public List<Production> getTopNetflixOriginals() {
        List<Production> prod = this.movieDbApiClient.getNetflixOriginals(null).getResults();
        this.movieService.updateImageUrl(prod);
        this.movieService.recomandation(prod);
        return prod;
    }

    public MovieDbPaginatedResponse<Production> getMoviesByGenre(int genre, int page) {
        return this.movieDbApiClient.getMoviesByGenre(genre, page);
    }

    public List<Production> getTopRated() {
        List<Production> prod = this.movieDbApiClient.getTopRated(null).getResults();
        this.movieService.updateImageUrl(prod);
        this.movieService.recomandation(prod);
        return prod;
    }

    public List<Production> getTrending() {
        List<Production> prod = this.movieDbApiClient.getTrending(null).getResults();
        this.movieService.recomandation(prod);
        this.movieService.updateImageUrl(prod);
        return prod;
    }

    public MovieDbPaginatedResponse<Production> getAllNetflixOriginals(Integer page) {
        return this.movieDbApiClient.getNetflixOriginals(page);
    }

    public List<Production> getTopMoviesByGenre(int genre) {
        List<Production> movies = this.movieDbApiClient.getMoviesByGenre(genre, null).getResults();
        this.movieService.recomandation(movies);
        this.movieService.updateImageUrl(movies);
        return movies;
    }


}

