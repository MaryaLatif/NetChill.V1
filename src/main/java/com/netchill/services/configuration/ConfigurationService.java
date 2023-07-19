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

	public String getMovieDbApiBaseUrl(){
		return "https://api.themoviedb.org/3/";
	}
	public String getMovieDbApiKey(){
		return "a0c1e55338f3c5d80fc1e6fbef225e0e";
	}
	public String getImageBaseUrl(){
		return "https://image.tmdb.org/t/p/original/";
	}
}

