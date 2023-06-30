package com.netchill.api.moviedb.models;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
@Getter
@Setter
public class Movie {
  public boolean adult;
  public String backdrop_path;
  public ArrayList<Integer> genre_ids;
  public int id;
  public String overview;
  public String poster_path;
  public String release_date;

  public String title;
  public boolean video;
}
