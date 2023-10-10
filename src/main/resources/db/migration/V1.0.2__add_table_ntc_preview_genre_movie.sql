CREATE TABLE ntc_preview_genre_movie
(
    id      BIGINT,
    `order` INT,
    CONSTRAINT ntc_preview_genre_movie_pk PRIMARY KEY (id),
    CONSTRAINT ntc_preview_genre_movie_fk FOREIGN KEY (id) REFERENCES ntc_genre (id)
);