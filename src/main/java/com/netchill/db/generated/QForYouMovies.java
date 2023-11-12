package com.netchill.db.generated;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QForYouMovies is a Querydsl query type for ForYouMovies
 */
@Generated("com.querydsl.sql.codegen.MetaDataSerializer")
public class QForYouMovies extends com.querydsl.sql.RelationalPathBase<ForYouMovies> {

    private static final long serialVersionUID = -119993074;

    public static final QForYouMovies forYouMovies = new QForYouMovies("ntc_for_you_movies");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath title = createString("title");

    public final com.querydsl.sql.PrimaryKey<ForYouMovies> primary = createPrimaryKey(id);

    public QForYouMovies(String variable) {
        super(ForYouMovies.class, forVariable(variable), "null", "ntc_for_you_movies");
        addMetadata();
    }

    public QForYouMovies(String variable, String schema, String table) {
        super(ForYouMovies.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QForYouMovies(String variable, String schema) {
        super(ForYouMovies.class, forVariable(variable), schema, "ntc_for_you_movies");
        addMetadata();
    }

    public QForYouMovies(Path<? extends ForYouMovies> path) {
        super(path.getType(), path.getMetadata(), "null", "ntc_for_you_movies");
        addMetadata();
    }

    public QForYouMovies(PathMetadata metadata) {
        super(ForYouMovies.class, metadata, "null", "ntc_for_you_movies");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(id, ColumnMetadata.named("id").withIndex(1).ofType(Types.BIGINT).withSize(19).notNull());
        addMetadata(title, ColumnMetadata.named("title").withIndex(2).ofType(Types.VARCHAR).withSize(255));
    }

}

