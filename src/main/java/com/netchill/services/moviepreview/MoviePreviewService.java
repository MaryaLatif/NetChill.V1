package com.netchill.services.moviepreview;

import com.netchill.api.moviedb.models.Movie;
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

  public List<Movie> getTopNetflixOriginals(){
    return this.movieDbApiClient.getNetflixOriginals(null).getResults();
  }
  public MovieDbPaginatedResponse<Movie> getMoviesByGenre(int genre, int page){
    return this.movieDbApiClient.getMoviesByGenre(genre, page);
  }
  public List<Movie> getTopRated(){
    return this.movieDbApiClient.getTopRated(null).getResults();
  }
  public List<Movie> getTrending(){
    return this.movieDbApiClient.getTrending(null).getResults();
  }
  public MovieDbPaginatedResponse<Movie> getAllNetflixOriginals(Integer page){
    return this.movieDbApiClient.getNetflixOriginals(page);
  }
  public List<Movie> getTopMoviesByGenre(int genre){
    return this.movieDbApiClient.getMoviesByGenre(genre, null).getResults();
  }
}

