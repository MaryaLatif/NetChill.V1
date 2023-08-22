package com.netchill.api.moviedb.models;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
//TODO à revoir
public class MediaVideo {
    private Long id;
    @JsonAlias({"results"})
    private List<YoutubeKey> keyList;
}
