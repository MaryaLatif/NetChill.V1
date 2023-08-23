package com.netchill.db.dao.movie;

import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import com.netchill.db.generated.Genre;
import com.netchill.db.generated.QGenre;
import com.netchill.db.generated.QPreviewGenreMovie;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;
import java.util.Optional;

@Singleton
public class GenreDao {
    private final TransactionManagerQuerydsl transactionManager;
    @Inject
    public GenreDao(TransactionManagerQuerydsl transactionManager){
        this.transactionManager = transactionManager;
    }

    public Optional<Genre> getGenreById(Long id) {
        return Optional.ofNullable(this.transactionManager.selectQuery()
                .select(QGenre.genre)
                .from(QGenre.genre)
                .where(QGenre.genre.id.eq(id))
                .fetchOne());
    }

    public List<Genre> getPreviewGenres() {
        return this.transactionManager.selectQuery()
                .select(QGenre.genre)
                .from(QGenre.genre)
                .join(QPreviewGenreMovie.previewGenreMovie)
                .on(QGenre.genre.id.eq(QPreviewGenreMovie.previewGenreMovie.id))
                .orderBy(QPreviewGenreMovie.previewGenreMovie.order.asc())
                .fetch();
    }

}
