package com.netchill.db.generated;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QMovie is a Querydsl query type for Movie
 */
@Generated("com.querydsl.sql.codegen.MetaDataSerializer")
public class QMovie extends com.querydsl.sql.RelationalPathBase<Movie> {

    private static final long serialVersionUID = 1119574331;

    public static final QMovie movie = new QMovie("ntc_movie");

    public final NumberPath<Long> genre1Id = createNumber("genre1Id", Long.class);

    public final NumberPath<Long> genre2Id = createNumber("genre2Id", Long.class);

    public final NumberPath<Long> genre3Id = createNumber("genre3Id", Long.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imgUrl = createString("imgUrl");

    public final StringPath movieUrl = createString("movieUrl");

    public final StringPath resume = createString("resume");

    public final StringPath title = createString("title");

    public final StringPath trailerUrl = createString("trailerUrl");

    public final com.querydsl.sql.PrimaryKey<Movie> primary = createPrimaryKey(id);

    public final com.querydsl.sql.ForeignKey<Genre> ntcMovieNtcGenre1IdFk = createForeignKey(genre1Id, "id");

    public final com.querydsl.sql.ForeignKey<Genre> ntcMovieNtcGenre2IdFk = createForeignKey(genre2Id, "id");

    public final com.querydsl.sql.ForeignKey<Genre> ntcMovieNtcGenre3IdFk = createForeignKey(genre3Id, "id");

    public QMovie(String variable) {
        super(Movie.class, forVariable(variable), "null", "ntc_movie");
        addMetadata();
    }

    public QMovie(String variable, String schema, String table) {
        super(Movie.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QMovie(String variable, String schema) {
        super(Movie.class, forVariable(variable), schema, "ntc_movie");
        addMetadata();
    }

    public QMovie(Path<? extends Movie> path) {
        super(path.getType(), path.getMetadata(), "null", "ntc_movie");
        addMetadata();
    }

    public QMovie(PathMetadata metadata) {
        super(Movie.class, metadata, "null", "ntc_movie");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(genre1Id, ColumnMetadata.named("genre1_id").withIndex(3).ofType(Types.BIGINT).withSize(19));
        addMetadata(genre2Id, ColumnMetadata.named("genre2_id").withIndex(4).ofType(Types.BIGINT).withSize(19));
        addMetadata(genre3Id, ColumnMetadata.named("genre3_id").withIndex(5).ofType(Types.BIGINT).withSize(19));
        addMetadata(id, ColumnMetadata.named("id").withIndex(1).ofType(Types.BIGINT).withSize(19).notNull());
        addMetadata(imgUrl, ColumnMetadata.named("img_url").withIndex(9).ofType(Types.VARCHAR).withSize(255));
        addMetadata(movieUrl, ColumnMetadata.named("movie_url").withIndex(7).ofType(Types.VARCHAR).withSize(255));
        addMetadata(resume, ColumnMetadata.named("resume").withIndex(8).ofType(Types.VARCHAR).withSize(255));
        addMetadata(title, ColumnMetadata.named("title").withIndex(2).ofType(Types.VARCHAR).withSize(255));
        addMetadata(trailerUrl, ColumnMetadata.named("trailer_url").withIndex(6).ofType(Types.VARCHAR).withSize(255));
    }

}

