package com.netchill.services.global;

import com.netchill.api.moviedb.models.Production;
import com.netchill.api.moviedb.services.global.GlobalApiService;
import com.netchill.db.dao.movie.GenreDao;
import com.netchill.services.configuration.ConfigurationService;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;

@Singleton
public class GlobalService {
    private final GlobalApiService globalApi;
    private final GenreDao genreDao;
    private final ConfigurationService configurationService;

    @Inject
    private GlobalService(GlobalApiService globalApi, GenreDao genreDao, ConfigurationService configurationService) {
        this.globalApi = globalApi;
        this.genreDao = genreDao;
        this.configurationService = configurationService;
    }
    public List<Production> getTrending() {
        return this.globalApi.getTrending().getResults();
    }
}

