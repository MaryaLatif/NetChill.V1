package com.netchill.api.moviedb;

import com.netchill.services.configuration.ConfigurationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.core.HttpHeaders;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

@Singleton
public class MovieDBApiService {
    // Logger pour ecrire des logs plusieur niveau .info .debug .error .warn
    private static final Logger LOGGER = LoggerFactory.getLogger(MovieDBApiService.class);
    private static final MediaType MEDIA_TYPE_JSON = MediaType.parse("application/json; charset=utf-8");
    private final ObjectMapper objectMapper;

    @Getter
    private final Retrofit retrofitClient;
    private final ConfigurationService configurationService;

    @Inject
    private MovieDBApiService(ObjectMapper objectMapper, ConfigurationService configurationService) {
        this.configurationService = configurationService;
        JacksonConverterFactory jacksonConverterFactory = JacksonConverterFactory.create(objectMapper);
        this.retrofitClient = new Retrofit.Builder()
                .baseUrl(this.configurationService.getMovieDbApiBaseUrl())
                .client(
                        new OkHttpClient
                                .Builder()
                                // Si aucune réponse au bout de 60secondes, on considère que c'est une erreur
                                .connectTimeout(60, TimeUnit.SECONDS)
                                // Si aucune réponse au bout de 60secondes, on considère que c'est une erreur
                                .writeTimeout(60, TimeUnit.SECONDS)
                                .readTimeout(60, TimeUnit.SECONDS)
                                // Ne pas suivre les redirections
                                .followRedirects(false)
                                .followSslRedirects(false)
                                .addInterceptor(chain -> {
                                    Request original = chain.request();
                                    Request request =
                                            original
                                                    .newBuilder()
                                                    // Ajout du header Content-Type: application/json
                                                    // Pour récupérer du JSON
                                                    .addHeader(HttpHeaders.CONTENT_TYPE, String.valueOf(MEDIA_TYPE_JSON))
                                                    .build();

                                    return chain.proceed(request);
                                })
                                .build())
                .addConverterFactory(jacksonConverterFactory)
                .build();

        this.objectMapper = objectMapper;
    }

    public <T> T executeRequest(Call<T> apiCall) {
        retrofit2.Response<T> response;
        try {
            response = apiCall.execute();
            if (response.isSuccessful()) {
                LOGGER.debug("Request executed successfully");
                return response.body();
            }

            LOGGER.error("Response is an error");
            throw new RuntimeException("HTTP response error : " + response.code() + ": " + response.message() +
                    "\nbody=" + response.body() + "withRequest: " + apiCall.request().url() + " method: " + apiCall.request().method() + "request: " + objectMapper.writeValueAsString(apiCall.request().body()));
        } catch (IOException e) {
            throw new RuntimeException("Error during call to the referientiel API", e);
        }
    }
}
