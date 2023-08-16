package com.netchill.api.moviedb.services.global;
import com.netchill.api.moviedb.models.Production;
import com.netchill.api.moviedb.models.MovieDbPaginatedResponse;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface GlobalApiRetrofit {
    @GET("/3/trending/all/week")
    Call<MovieDbPaginatedResponse<Production>> getTrending(
            @Query("api_key") String apiKey,
            @Query("language") String language,
            @Query("page") Integer page
    );
}
