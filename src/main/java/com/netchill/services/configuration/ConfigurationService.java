package com.netchill.services.configuration;

import javax.inject.Inject;
import javax.inject.Singleton;

import com.typesafe.config.Config;

@Singleton
public class ConfigurationService {

    private final Config config;

    @Inject
    public ConfigurationService(Config config) {
        this.config = config;
    }

    public String hello() {
        return config.getString("hello");
    }

    public String swaggerAccessUsername() {
        return config.getString("swagger.access.username");
    }

    public String swaggerAccessPassword() {
        return config.getString("swagger.access.password");
    }

    public String getMovieDbApiBaseUrl() {
        return config.getString("api.tmdb.base-url");
    }

    public String getMovieDbApiKey() {
        return config.getString("api.tmdb.api-key");
    }

    public String getImageBaseUrl() {
        return config.getString("api.tmdb-image.base-url");
    }

    public String getVideoBaseUrl() {
        return config.getString("video.movie.base-url");
    }

    public String getEpisodeVideoBaseUrl() {
        return config.getString("video.serie.base-url");
    }

    public String getConnectionKey(){
        return config.getString("connection-key");
    }
}

