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
    genre_id BIGINT  null,
    trailer_url     VARCHAR(255) null,
    movie_url      VARCHAR(255) null,
    resume   VARCHAR(255) null,
    img_url  VARCHAR(255) null,
    constraint ntc_movie_pk
        primary key (id),
    constraint ntc_movie_ntc_genre_id_fk
        foreign key (genre_id) references ntc_genre (id)
);