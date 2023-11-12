package com.netchill.api.moviedb.services.movie;

import com.netchill.api.moviedb.models.Production;
import com.netchill.api.moviedb.models.MovieDbPaginatedResponse;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface MovieApiRetrofit {
    @GET("/3/discover/movie")
    Call<MovieDbPaginatedResponse<Production>> getMovieByGenre(
        @Query("api_key") String apiKey,
        @Query("with_genres") Long idGenre,
        @Query("page") Integer page
    );

    @GET("/3/movie/top_rated")
    Call<MovieDbPaginatedResponse<Production>> getTopRated(
        @Query("api_key") String apiKey,
        @Query("language") String language,
        @Query("page") Integer page
    );

    @GET("/3/movie/{id}")
    Call<Production> getMovieById(
        @Path("id") Long id,
        @Query("api_key") String apiKey
    );
}

