package com.netchill.api.moviedb.services.trailer;

import com.netchill.api.moviedb.models.MediaVideo;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;
public interface TrailerApiRetrofit {
    @GET("/3/tv/{id}/videos")
    Call<MediaVideo> getTrailerBySerieId(
            @Query("api_key") String apiKey,
            @Path("id") Long id
    );

    @GET("/3/movie/{id}/videos")
    Call<MediaVideo> getTrailerByMovieId(
            @Query("api_key") String apiKey,
            @Path("id") Long id
    );
}
