package com.netchill.db.dao.movie;

import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import com.netchill.db.generated.QForYouMovies;
import com.netchill.db.generated.QForYouSeries;
import com.netchill.db.generated.QSeries;
import javassist.runtime.Inner;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;

@Singleton
public class SerieDao {
    private final TransactionManagerQuerydsl transactionManager;

    @Inject
    public SerieDao(TransactionManagerQuerydsl transactionManager) {
        this.transactionManager = transactionManager;
    }

    public List<Long> getForYouSeries() {
        return this.transactionManager.selectQuery()
            .select(QForYouSeries.forYouSeries.id)
            .from(QForYouSeries.forYouSeries)
            .fetch();
    }

    public List<Integer> getEpisodesOfSeason(Long idSerie, int season) {
        return this.transactionManager.selectQuery()
            .select(QSeries.series.episode)
            .from(QSeries.series)
            .where(QSeries.series.id.eq(idSerie).and(QSeries.series.season.eq(season)))
            .fetch();
    }

    public List<Integer> getSeasonAvailable(Long id) {
        return this.transactionManager.selectQuery()
            .select(QSeries.series.season)
            .distinct()
            .from(QSeries.series)
            .where(QSeries.series.id.eq(id))
            .fetch();
    }

    public String fetchEpisodePath(Long serieId, int season, int episode) {
        return this.transactionManager.selectQuery()
            .select(QSeries.series.episodeUrl)
            .from(QSeries.series)
            .where(QSeries.series.id.eq(serieId)
                .and(QSeries.series.season.eq(season)
                    .and(QSeries.series.episode.eq(episode)
                    )
                )
            )
            .fetchOne();
    }
}
