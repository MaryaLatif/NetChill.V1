package com.netchill.db.generated;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QGenre is a Querydsl query type for Genre
 */
@Generated("com.querydsl.sql.codegen.MetaDataSerializer")
public class QGenre extends com.querydsl.sql.RelationalPathBase<Genre> {

    private static final long serialVersionUID = 1113727886;

    public static final QGenre genre = new QGenre("ntc_genre");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    public final com.querydsl.sql.PrimaryKey<Genre> primary = createPrimaryKey(id);

    public final com.querydsl.sql.ForeignKey<Movie> _ntcMovieNtcGenreIdFk = createInvForeignKey(id, "genre_id");

    public QGenre(String variable) {
        super(Genre.class, forVariable(variable), "null", "ntc_genre");
        addMetadata();
    }

    public QGenre(String variable, String schema, String table) {
        super(Genre.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QGenre(String variable, String schema) {
        super(Genre.class, forVariable(variable), schema, "ntc_genre");
        addMetadata();
    }

    public QGenre(Path<? extends Genre> path) {
        super(path.getType(), path.getMetadata(), "null", "ntc_genre");
        addMetadata();
    }

    public QGenre(PathMetadata metadata) {
        super(Genre.class, metadata, "null", "ntc_genre");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(id, ColumnMetadata.named("id").withIndex(1).ofType(Types.BIGINT).withSize(19).notNull());
        addMetadata(name, ColumnMetadata.named("name").withIndex(2).ofType(Types.VARCHAR).withSize(255));
    }

}

