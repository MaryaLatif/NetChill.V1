package com.netchill.services.genre;

import com.netchill.api.moviedb.TmdbApiClient;
import com.netchill.db.dao.movie.GenreDao;
import com.netchill.db.generated.Genre;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;
import java.util.Optional;

@Singleton
public class GenreService {
    private final TmdbApiClient movieDbApiClient;
    private final GenreDao genreDao;

    @Inject
    private GenreService(TmdbApiClient movieDbApiClient, GenreDao genreDao) {
        this.movieDbApiClient = movieDbApiClient;
        this.genreDao = genreDao;
    }

    public Optional<Genre> getGenreById(Long id) {
        return this.genreDao.getGenreById(id);
    }

    public List<Genre> featuredGenre() {
        return this.genreDao.featuredGenre();
    }
}
