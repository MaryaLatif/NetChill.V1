package com.netchill.api.moviedb.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Trailer {
    private Integer id;
    private List<ResultTrailer> results;
}
