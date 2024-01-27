package com.netchill.api.moviedb.models;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class SaisonEpisodes {
    private int season_number;
    private ArrayList<Episode> episodes;
}
