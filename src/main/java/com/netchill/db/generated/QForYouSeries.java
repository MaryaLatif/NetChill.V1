package com.netchill.db.generated;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QForYouSeries is a Querydsl query type for ForYouSeries
 */
@Generated("com.querydsl.sql.codegen.MetaDataSerializer")
public class QForYouSeries extends com.querydsl.sql.RelationalPathBase<ForYouSeries> {

    private static final long serialVersionUID = 42427458;

    public static final QForYouSeries forYouSeries = new QForYouSeries("ntc_for_you_series");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath title = createString("title");

    public final com.querydsl.sql.PrimaryKey<ForYouSeries> primary = createPrimaryKey(id);

    public QForYouSeries(String variable) {
        super(ForYouSeries.class, forVariable(variable), "null", "ntc_for_you_series");
        addMetadata();
    }

    public QForYouSeries(String variable, String schema, String table) {
        super(ForYouSeries.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QForYouSeries(String variable, String schema) {
        super(ForYouSeries.class, forVariable(variable), schema, "ntc_for_you_series");
        addMetadata();
    }

    public QForYouSeries(Path<? extends ForYouSeries> path) {
        super(path.getType(), path.getMetadata(), "null", "ntc_for_you_series");
        addMetadata();
    }

    public QForYouSeries(PathMetadata metadata) {
        super(ForYouSeries.class, metadata, "null", "ntc_for_you_series");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(id, ColumnMetadata.named("id").withIndex(1).ofType(Types.BIGINT).withSize(19).notNull());
        addMetadata(title, ColumnMetadata.named("title").withIndex(2).ofType(Types.VARCHAR).withSize(255));
    }

}

