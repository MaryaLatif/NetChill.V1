CREATE TABLE ntc_genre
(
    id BIGINT null,
    name VARCHAR(255) null,
    constraint ntc_genre_pk
        primary key (id)
);
CREATE TABLE ntc_movie
(
    id       BIGINT null,
    title    VARCHAR(255) null,
    genre1_id BIGINT  null,
    genre2_id BIGINT  null,
    genre3_id BIGINT  null,
    trailer_url     VARCHAR(255) null,
    movie_url      VARCHAR(255) null,
    resume   VARCHAR(255) null,
    img_url  VARCHAR(255) null,
    constraint ntc_movie_pk
        primary key (id),
    constraint ntc_movie_ntc_genre1_id_fk
        foreign key (genre1_id) references ntc_genre (id),
    constraint ntc_movie_ntc_genre2_id_fk
        foreign key (genre2_id) references ntc_genre (id),
    constraint ntc_movie_ntc_genre3_id_fk
        foreign key (genre3_id) references ntc_genre (id)
);