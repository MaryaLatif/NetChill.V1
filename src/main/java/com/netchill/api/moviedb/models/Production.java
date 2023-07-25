package com.netchill.api.moviedb.models;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class Production {
    private boolean adult;
    private String backdrop_path;
    private ArrayList<Long> genre_ids;
    private int id;
    private String overview;
    private String poster_path;
    @JsonAlias({"release_date", "first_air_date"})
    private String release_date;
    @JsonAlias({"title", "name"})
    private String title;
    private String media_type;
    private Float vote_average;
}
