package com.netchill.services.movie;

import com.netchill.api.moviedb.MovieDbApiClient;
import com.netchill.api.moviedb.models.Movie;
import com.netchill.api.moviedb.models.Preview;
import com.netchill.api.moviedb.models.Production;
import com.netchill.db.dao.movie.MovieDao;
import com.netchill.services.configuration.ConfigurationService;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;

@Singleton
public class MovieService {
    private MovieDao movieDao;
    private MovieDbApiClient movieDbApiClient;
    private ConfigurationService configurationService;

    @Inject
    private MovieService(MovieDao movieDao, MovieDbApiClient movieDbApiClient, ConfigurationService configurationService) {
        this.movieDao = movieDao;
        this.movieDbApiClient = movieDbApiClient;
        this.configurationService = configurationService;
    }
    public void updateImageUrl(List<Production>  prod) {
        String imgKey;
        String IMG_URL = this.configurationService.getImageBaseUrl();
        for(Production element:  prod){
            imgKey = element.getBackdrop_path();
            if (imgKey != null) {
                element.setBackdrop_path(IMG_URL + imgKey);
            }

            imgKey = element.getPoster_path();
            if (imgKey != null) {
                element.setPoster_path(IMG_URL + imgKey);
            }
        }
    }

    public void recomandation(List<Production> prod) {
        for (Production element: prod) {
            Float vote = element.getVote_average();
            element.setVote_average(Math.round(vote * 1000) / 100f);
        }
    }

    public Production getMovieById(Long movieId) {
        Production movie = this.movieDbApiClient.getMovieById(movieId);
        String imageKey = movie.getBackdrop_path();
        List<Production> movies = List.of(movie);

        this.updateImageUrl(movies);
        this.recomandation(movies);

        return movie;
    }

    public List<Long> getMovieGenres(Long movieId) {
        return this.movieDbApiClient.getMovieById(movieId).getGenre_ids();
    }


}
