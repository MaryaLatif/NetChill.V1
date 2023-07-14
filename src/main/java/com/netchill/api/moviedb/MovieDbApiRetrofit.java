package com.netchill.api.moviedb;

import com.netchill.api.moviedb.models.*;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface MovieDbApiRetrofit {
    @GET("/3/discover/movie")
    Call<MovieDbPaginatedResponse<Preview>> getMovieByGenre(
            @Query("api_key") String apiKey,
            @Query("with_genres") int idGenre,
            @Query("page") Integer page
    );

    @GET("/3/movie/top_rated")
    Call<MovieDbPaginatedResponse<Preview>> getTopRated(
            @Query("api_key") String apiKey,
            @Query("language") String language,
            @Query("page") Integer page
    );

    @GET("/3/trending/all/week")
    Call<MovieDbPaginatedResponse<Preview>> getTrending(
            @Query("api_key") String apiKey,
            @Query("language") String language,
            @Query("page") Integer page
    );

    @GET("/3/discover/tv")
    Call<MovieDbPaginatedResponse<Preview>> getNetflixOriginals(
            @Query("api_key") String apiKey,
            @Query("with_networks") Integer networks,
            @Query("page") Integer page
    );

    @GET("/3/movie/{id}")
    Call<Movie> getMovieById(
            @Path("id") Long id,
            @Query("api_key") String apiKey
    );
    @GET("/3/tv/{id}")
    Call<Serie> getSerieById(
            @Path("id") Long id,
            @Query("api_key") String apiKey
    );

    @GET("/3/tv/{id}/videos")
    Call<Trailer> getSerieTrailerById(
            @Path("id") Long id,
            @Query("api_key") String apiKey
    );
    @GET("/3/movie/{id}/videos")
    Call<Trailer> getMovieTrailerById(
            @Path("id") Long id,
            @Query("api_key") String apiKey
    );
}

