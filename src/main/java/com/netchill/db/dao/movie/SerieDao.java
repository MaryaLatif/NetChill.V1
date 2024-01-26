package com.netchill.db.dao.movie;

import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import com.netchill.db.generated.QForYouMovies;
import com.netchill.db.generated.QForYouSeries;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;

@Singleton
public class SerieDao {
    private final TransactionManagerQuerydsl transactionManager;

    @Inject
    public SerieDao(TransactionManagerQuerydsl transactionManager){
        this.transactionManager = transactionManager;
    }

    public List<Long> getForYouSeries(){
        return this.transactionManager.selectQuery()
            .select(QForYouSeries.forYouSeries.id)
            .from(QForYouSeries.forYouSeries)
            .fetch();
    }
}
