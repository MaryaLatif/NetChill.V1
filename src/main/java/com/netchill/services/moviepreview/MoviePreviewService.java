package com.netchill.services.moviepreview;

import com.netchill.api.moviedb.models.Preview;
import com.netchill.api.moviedb.models.MovieDbPaginatedResponse;
import com.netchill.api.moviedb.MovieDbApiClient;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;

@Singleton
public class MoviePreviewService {
  private final MovieDbApiClient movieDbApiClient;

  @Inject
  private MoviePreviewService(MovieDbApiClient movieDbApiClient) {
    this.movieDbApiClient = movieDbApiClient;
  }

  public List<Preview> getTopNetflixOriginals(){
    return this.movieDbApiClient.getNetflixOriginals(null).getResults();
  }
  public MovieDbPaginatedResponse<Preview> getMoviesByGenre(int genre, int page){
    return this.movieDbApiClient.getMoviesByGenre(genre, page);
  }
  public List<Preview> getTopRated(){
    return this.movieDbApiClient.getTopRated(null).getResults();
  }
  public List<Preview> getTrending(){
    return this.movieDbApiClient.getTrending(null).getResults();
  }
  public MovieDbPaginatedResponse<Preview> getAllNetflixOriginals(Integer page){
    return this.movieDbApiClient.getNetflixOriginals(page);
  }
  public List<Preview> getTopMoviesByGenre(int genre){
    return this.movieDbApiClient.getMoviesByGenre(genre, null).getResults();
  }
}

