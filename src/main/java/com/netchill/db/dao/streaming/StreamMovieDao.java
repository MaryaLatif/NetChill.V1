package com.netchill.db.dao.streaming;

import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import com.netchill.db.generated.QMovie;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.Optional;

@Singleton
public class StreamMovieDao {
    private final TransactionManagerQuerydsl transactionManagerQuerydsl;

    @Inject
    public StreamMovieDao(TransactionManagerQuerydsl transactionManagerQuerydsl){
        this.transactionManagerQuerydsl = transactionManagerQuerydsl;
    }

    public Optional<String> getVideoPath(Long id){
        return Optional.ofNullable(this.transactionManagerQuerydsl.selectQuery()
            .select(QMovie.movie.movieUrl)
            .from(QMovie.movie)
            .where(QMovie.movie.id.eq(id))
            .fetchOne());
    }
}
