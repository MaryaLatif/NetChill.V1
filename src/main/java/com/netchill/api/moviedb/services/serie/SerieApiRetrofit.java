package com.netchill.api.moviedb.services.serie;

import com.netchill.api.moviedb.models.MovieDbPaginatedResponse;
import com.netchill.api.moviedb.models.Production;
import com.netchill.api.moviedb.models.Trailer;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface SerieApiRetrofit {

    @GET("/3/discover/tv")
    Call<MovieDbPaginatedResponse<Production>> getNetflixOriginals(
            @Query("api_key") String apiKey,
            @Query("with_networks") Integer networks,
            @Query("page") Integer page
    );

    @GET("/3/tv/{id}")
    Call<Production> getSerieById(
            @Query("api_key") String apiKey,
            @Path("id") Long id
    );

}

