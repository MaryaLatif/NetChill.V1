package com.netchill.db.generated;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QSeries is a Querydsl query type for Series
 */
@Generated("com.querydsl.sql.codegen.MetaDataSerializer")
public class QSeries extends com.querydsl.sql.RelationalPathBase<Series> {

    private static final long serialVersionUID = 509486540;

    public static final QSeries series = new QSeries("ntc_series");

    public final NumberPath<Integer> episode = createNumber("episode", Integer.class);

    public final StringPath episodeUrl = createString("episodeUrl");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> season = createNumber("season", Integer.class);

    public QSeries(String variable) {
        super(Series.class, forVariable(variable), "null", "ntc_series");
        addMetadata();
    }

    public QSeries(String variable, String schema, String table) {
        super(Series.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QSeries(String variable, String schema) {
        super(Series.class, forVariable(variable), schema, "ntc_series");
        addMetadata();
    }

    public QSeries(Path<? extends Series> path) {
        super(path.getType(), path.getMetadata(), "null", "ntc_series");
        addMetadata();
    }

    public QSeries(PathMetadata metadata) {
        super(Series.class, metadata, "null", "ntc_series");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(episode, ColumnMetadata.named("episode").withIndex(3).ofType(Types.INTEGER).withSize(10));
        addMetadata(episodeUrl, ColumnMetadata.named("episode_url").withIndex(4).ofType(Types.VARCHAR).withSize(255));
        addMetadata(id, ColumnMetadata.named("id").withIndex(1).ofType(Types.BIGINT).withSize(19));
        addMetadata(season, ColumnMetadata.named("season").withIndex(2).ofType(Types.INTEGER).withSize(10));
    }

}

