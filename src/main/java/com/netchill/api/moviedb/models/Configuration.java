package com.netchill.api.moviedb.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Configuration {
    private String imageBaseUrl;
    private String connectionKey;
}
