package com.netchill.api.moviedb.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Episode {
    private Long id;
    private int episode_number;
    private String name;
    private String overview;
}
