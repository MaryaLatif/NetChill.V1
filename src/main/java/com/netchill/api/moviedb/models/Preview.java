package com.netchill.api.moviedb.models;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
@Getter
@Setter
public class Preview {
  private boolean adult;
  private String backdrop_path;
  private ArrayList<Long> genre_ids;
  private int id;
  private String overview;
  private String poster_path;
  private String release_date;
  private String first_air_date;
  private String title;
  private String name;
  private String media_type;
  private Float vote_average;
}
