create table ntc_genre
(
    id BIGINT  null,
    name VARCHAR(255) null,
    constraint ntc_genre_pk
        primary key (id)
);
create table ntc_movie
(
    id       BIGINT  null,
    title    VARCHAR(255) null,
    genre_id BIGINT  null,
    url      VARCHAR(255) null,
    resume   VARCHAR(255) null,
    img_url  VARCHAR(255) null,
    constraint ntc_movie_pk
        primary key (id),
    constraint ntc_movie_ntc_genre_id_fk
        foreign key (genre_id) references ntc_genre (id)
);