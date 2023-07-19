package com.netchill.services.moviepreview;

import com.netchill.api.moviedb.models.Preview;
import com.netchill.api.moviedb.models.MovieDbPaginatedResponse;
import com.netchill.api.moviedb.MovieDbApiClient;
import com.netchill.db.dao.movie.MovieDao;
import com.netchill.db.generated.Genre;
import com.netchill.services.configuration.ConfigurationService;
import com.querydsl.core.Tuple;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.text.DecimalFormat;
import java.util.List;

@Singleton
public class MoviePreviewService {
    private final MovieDbApiClient movieDbApiClient;
    private final MovieDao movieDao;
    private final ConfigurationService configurationService;

    @Inject
    private MoviePreviewService(MovieDbApiClient movieDbApiClient, MovieDao movieDao, ConfigurationService configurationService) {
        this.movieDbApiClient = movieDbApiClient;
        this.movieDao = movieDao;
        this.configurationService = configurationService;
    }

    private void updateImageUrl(List<Preview> previews){
        String imgKey;
        for(int i = 0; i < previews.size(); i++){
            imgKey = previews.get(i).getBackdrop_path();
            if(imgKey != null) previews.get(i).setBackdrop_path(this.configurationService.getImageBaseUrl()+imgKey);
            imgKey = previews.get(i).getPoster_path();
            if(imgKey != null) previews.get(i).setPoster_path(this.configurationService.getImageBaseUrl()+imgKey);
        }
    }

    private void recomandation(List<Preview> previews){
        for(int i = 0; i <previews.size(); i++){
            Float vote = previews.get(i).getVote_average();
            previews.get(i).setVote_average(Math.round(vote*1000)/100f);
        }
    }
    public List<Preview> getTopNetflixOriginals() {
        List<Preview> previews = this.movieDbApiClient.getNetflixOriginals(null).getResults();
        updateImageUrl(previews);
        recomandation(previews);
        return previews;
    }

    public MovieDbPaginatedResponse<Preview> getMoviesByGenre(int genre, int page) {
        return this.movieDbApiClient.getMoviesByGenre(genre, page);
    }

    public List<Preview> getTopRated() {
        List<Preview> previews = this.movieDbApiClient.getTopRated(null).getResults();
        updateImageUrl(previews);
        recomandation(previews);
        return previews;
    }

    public List<Preview> getTrending() {
        List<Preview> previews = this.movieDbApiClient.getTrending(null).getResults();
        recomandation(previews);
        updateImageUrl(previews);
        return previews;
    }

    public MovieDbPaginatedResponse<Preview> getAllNetflixOriginals(Integer page) {
        return this.movieDbApiClient.getNetflixOriginals(page);
    }

    public List<Preview> getTopMoviesByGenre(int genre) {
        List<Preview> previews = this.movieDbApiClient.getMoviesByGenre(genre, null).getResults();
        recomandation(previews);
        updateImageUrl(previews);
        return previews;
    }

    public List<Genre> getPreviewGenres() {
        return this.movieDao.getPreviewGenres();
    }
}

