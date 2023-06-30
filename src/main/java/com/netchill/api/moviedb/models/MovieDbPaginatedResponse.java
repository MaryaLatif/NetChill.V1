package com.netchill.api.moviedb.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MovieDbPaginatedResponse<T> {
  private Integer page;
  private List<T> results;
  @JsonProperty("total_pages")
  private Integer totalPages;
  @JsonProperty("total_results")
  private Integer totalResults;
}
