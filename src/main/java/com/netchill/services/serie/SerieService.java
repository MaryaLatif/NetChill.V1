package com.netchill.services.serie;

import com.netchill.api.moviedb.models.Episode;
import com.netchill.api.moviedb.models.MovieDbPaginatedResponse;
import com.netchill.api.moviedb.models.Production;
import com.netchill.api.moviedb.models.Serie;
import com.netchill.api.moviedb.services.serie.SerieApiService;
import com.netchill.db.dao.movie.SerieDao;
import lombok.extern.slf4j.Slf4j;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Slf4j
@Singleton
public class SerieService {
    private SerieApiService serieApiClient;
    private SerieDao serieDao;

    @Inject
    private SerieService(SerieApiService serieApiClient, SerieDao serieDao) {
        this.serieApiClient = serieApiClient;
        this.serieDao = serieDao;
    }

    public List<Production> getTopNetflixOriginals() {
        return this.serieApiClient.getNetflixOriginals().getResults();
    }

    public Optional<MovieDbPaginatedResponse<Production>> getAllNetflixOriginals(Integer page) {
        try{
            return Optional.of(this.serieApiClient.getNetflixOriginals(page));
        } catch (Exception e){
            log.warn("Error when fetching netflix series at the page {}", page, e);
            return Optional.empty();
        }
    }

    public Optional<Production> getSerieById(Long id) {
        try{
            return Optional.ofNullable(this.serieApiClient.getSerieById(id));
        } catch (Exception e){
            log.warn("Error when fetching netflix serie with id {}", id, e);
            return Optional.empty();
        }
    }

    public List<Production> getSeriesByIds(){
        ArrayList<Production> series = new ArrayList<Production>();
        for(Long id: this.serieDao.getForYouSeries()){
            series.add(this.serieApiClient.getSerieById(id));
        }
        return series;
    }

    public List<Episode> getEpisodesOfSeason(Long idSerie, int season){
        ArrayList<Episode> episodes = new ArrayList<Episode>();
        ArrayList<Episode> allEpisodesOfSeason = this.serieApiClient.getEpisodesOfSaison(idSerie, season).getEpisodes();
        for(int episodeNumber: this.serieDao.getEpisodesOfSeason(idSerie, season)){
            episodes.add(allEpisodesOfSeason.get(episodeNumber));
        }
        return episodes;
    }
}
