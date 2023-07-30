package com.netchill.api.moviedb.models;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Trailer {
    private Long id;
    @JsonAlias({"results"})
    private List<TrailerKey> keyList;
}
