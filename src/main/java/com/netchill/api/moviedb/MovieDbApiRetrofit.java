package com.netchill.api.moviedb;

import com.netchill.api.moviedb.models.Production;
import com.netchill.api.moviedb.models.MovieDbPaginatedResponse;
import com.netchill.api.moviedb.models.Trailer;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface MovieDbApiRetrofit {
    @GET("/3/discover/movie")
    Call<MovieDbPaginatedResponse<Production>> getMovieByGenre(
            @Query("api_key") String apiKey,
            @Query("with_genres") int idGenre,
            @Query("page") Integer page
    );

    @GET("/3/movie/top_rated")
    Call<MovieDbPaginatedResponse<Production>> getTopRated(
            @Query("api_key") String apiKey,
            @Query("language") String language,
            @Query("page") Integer page
    );

    @GET("/3/trending/all/week")
    Call<MovieDbPaginatedResponse<Production>> getTrending(
            @Query("api_key") String apiKey,
            @Query("language") String language,
            @Query("page") Integer page
    );

    @GET("/3/discover/tv")
    Call<MovieDbPaginatedResponse<Production>> getNetflixOriginals(
            @Query("api_key") String apiKey,
            @Query("with_networks") Integer networks,
            @Query("page") Integer page
    );

    @GET("/3/movie/{id}")
    Call<Production> getMovieById(
            @Path("id") Long id,
            @Query("api_key") String apiKey
    );

    @GET("/3/tv/{id}")
    Call<Production> getSerieById(
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

