package com.netchill.db.dao.movie;

import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import com.netchill.db.generated.Genre;
import com.netchill.db.generated.QGenre;
import com.netchill.db.generated.QPreviewGenreMovie;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;

@Singleton
public class MovieDao {
    private final TransactionManagerQuerydsl transactionManager;
    private record MovieTitleWithUrl(String title, String url){ }
    @Inject
    public MovieDao(TransactionManagerQuerydsl transactionManager) {
        this.transactionManager = transactionManager;
    }

    // Exemple fetch
    /*
    public List<Movie> getMoviesByGenre(String genre) {
        return transactionManager.selectQuery()
                .select(QMovie.movie)
                .from(QMovie.movie)
                .join(QGenre.genre)
                .on(QGenre.genre.id.eq(QMovie.movie.genreId))
                .where(QGenre.genre.name.equalsIgnoreCase(genre))
                .fetch();
    }

    // EXEMPLE TUPLE
    public MovieTitleWithUrl getMovieNameAndURL(Long idMovie) {
        Tuple tuple = transactionManager.selectQuery()
                .select(QMovie.movie.title, QMovie.movie.movieUrl)
                .from(QMovie.movie)
                .where(QMovie.movie.id.eq(idMovie))
                .fetchOne();

        return new MovieTitleWithUrl(tuple.get(QMovie.movie.title), tuple.get(QMovie.movie.movieUrl));
    }

     */
    public Genre getGenreById(Long id){
         return transactionManager.selectQuery()
                .select(QGenre.genre)
                .from(QGenre.genre)
                .where(QGenre.genre.id.eq(id))
                .fetchOne();
    }

    public List<Genre> getPreviewGenres(){
        return transactionManager.selectQuery()
                .select(QGenre.genre)
                .from(QGenre.genre)
                .join(QPreviewGenreMovie.previewGenreMovie)
                .on(QGenre.genre.id.eq(QPreviewGenreMovie.previewGenreMovie.id))
                .orderBy(QPreviewGenreMovie.previewGenreMovie.order.asc())
                .fetch();
    }
}

