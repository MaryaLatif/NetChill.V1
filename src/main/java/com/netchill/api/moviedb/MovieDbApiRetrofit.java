package com.netchill.api.moviedb;

import com.netchill.api.moviedb.models.Movie;
import com.netchill.api.moviedb.models.MovieDbPaginatedResponse;
import com.netchill.api.moviedb.models.NetflixMovie;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface MovieDbApiRetrofit {
  @GET("/3/discover/movie")
  Call<MovieDbPaginatedResponse<Movie>> getMovieByGenre(
      @Query("api_key") String apiKey,
      @Query("with_genres") int idGenre,
      @Query("page") Integer page
  );

  @GET("/3/movie/top_rated")
  Call<MovieDbPaginatedResponse<Movie>> getTopRated(
      @Query("api_key") String apiKey,
      @Query("language") String language,
      @Query("page") Integer page
  );

  @GET("/3/trending/all/week")
  Call<MovieDbPaginatedResponse<Movie>> getTrending(
      @Query("api_key") String apiKey,
      @Query("language") String language,
      @Query("page") Integer page
  );

  @GET("/3/discover/tv")
  Call<MovieDbPaginatedResponse<NetflixMovie>> getNetflixOriginals(
      @Query("api_key") String apiKey,
      @Query("with_networks") Integer networks,
      @Query("page") Integer page
  );
}

