package com.netchill.db.generated;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import javax.annotation.processing.Generated;
import com.querydsl.sql.Column;

/**
 * Series is a Querydsl bean type
 */
@Generated("com.coreoz.plume.db.querydsl.generation.IdBeanSerializer")
public class Series extends com.coreoz.plume.db.querydsl.crud.CrudEntityQuerydsl {

    @Column("episode")
    private Integer episode;

    @Column("episode_url")
    private String episodeUrl;

    @JsonSerialize(using=com.fasterxml.jackson.databind.ser.std.ToStringSerializer.class)
    @Column("id")
    private Long id;

    @Column("season")
    private Integer season;

    public Integer getEpisode() {
        return episode;
    }

    public void setEpisode(Integer episode) {
        this.episode = episode;
    }

    public String getEpisodeUrl() {
        return episodeUrl;
    }

    public void setEpisodeUrl(String episodeUrl) {
        this.episodeUrl = episodeUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSeason() {
        return season;
    }

    public void setSeason(Integer season) {
        this.season = season;
    }

    @Override
    public String toString() {
         return "episode = " + episode + ", episodeUrl = " + episodeUrl + ", id = " + id + ", season = " + season;
    }

}

