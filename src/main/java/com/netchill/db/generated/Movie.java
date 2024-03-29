package com.netchill.db.generated;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import javax.annotation.processing.Generated;
import com.querydsl.sql.Column;

/**
 * Movie is a Querydsl bean type
 */
@Generated("com.coreoz.plume.db.querydsl.generation.IdBeanSerializer")
public class Movie extends com.coreoz.plume.db.querydsl.crud.CrudEntityQuerydsl {

    @JsonSerialize(using=com.fasterxml.jackson.databind.ser.std.ToStringSerializer.class)
    @Column("genre1_id")
    private Long genre1Id;

    @JsonSerialize(using=com.fasterxml.jackson.databind.ser.std.ToStringSerializer.class)
    @Column("genre2_id")
    private Long genre2Id;

    @JsonSerialize(using=com.fasterxml.jackson.databind.ser.std.ToStringSerializer.class)
    @Column("genre3_id")
    private Long genre3Id;

    @JsonSerialize(using=com.fasterxml.jackson.databind.ser.std.ToStringSerializer.class)
    @Column("id")
    private Long id;

    @Column("img_url")
    private String imgUrl;

    @Column("movie_url")
    private String movieUrl;

    @Column("resume")
    private String resume;

    @Column("title")
    private String title;

    @Column("trailer_url")
    private String trailerUrl;

    public Long getGenre1Id() {
        return genre1Id;
    }

    public void setGenre1Id(Long genre1Id) {
        this.genre1Id = genre1Id;
    }

    public Long getGenre2Id() {
        return genre2Id;
    }

    public void setGenre2Id(Long genre2Id) {
        this.genre2Id = genre2Id;
    }

    public Long getGenre3Id() {
        return genre3Id;
    }

    public void setGenre3Id(Long genre3Id) {
        this.genre3Id = genre3Id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getMovieUrl() {
        return movieUrl;
    }

    public void setMovieUrl(String movieUrl) {
        this.movieUrl = movieUrl;
    }

    public String getResume() {
        return resume;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTrailerUrl() {
        return trailerUrl;
    }

    public void setTrailerUrl(String trailerUrl) {
        this.trailerUrl = trailerUrl;
    }

    @Override
    public String toString() {
        return "Movie#" + id;
    }

    @Override
    public boolean equals(Object o) {
        if (id == null) {
            return super.equals(o);
        }
        if (!(o instanceof Movie)) {
            return false;
        }
        Movie obj = (Movie) o;
        return id.equals(obj.id);
    }

    @Override
    public int hashCode() {
        if (id == null) {
            return super.hashCode();
        }
        final int prime = 31;
        int result = 1;
        result = prime * result + id.hashCode();
        return result;
    }

}

