package com.netchill.api.moviedb.models;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.netchill.api.moviedb.enums.ProductionType;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class Production {
    private boolean adult;
    private String backdrop_path;
    private ArrayList<Long> genre_ids;
    @JsonAlias({"genres"})
    private static ArrayList<Genre> genres;
    private int id;
    private String overview;
    private String poster_path;
    @JsonAlias({"release_date", "first_air_date"})
    private String release_date;
    @JsonAlias({"title", "name"})
    private String title;
    private ProductionType type;
    private Float vote_average;

    @JsonSetter("title")
    public void setTypeToMovie(String title) {
        this.title = title;
        this.type = ProductionType.MOVIE;
    }

    @JsonSetter("name")
    public void setTypeToSerie(String name) {
        this.title = name;
        this.type = ProductionType.SERIE;
    }

    @JsonSetter("genres")
    public void setGenres(ArrayList<Genre> genres) {
        this.genre_ids = new ArrayList<>();
        for (Genre genre : genres) {
            this.genre_ids.add(genre.getId());
        }
    }
}
