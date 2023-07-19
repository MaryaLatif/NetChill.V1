package com.netchill.db.generated;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QPreviewGenreMovie is a Querydsl query type for PreviewGenreMovie
 */
@Generated("com.querydsl.sql.codegen.MetaDataSerializer")
public class QPreviewGenreMovie extends com.querydsl.sql.RelationalPathBase<PreviewGenreMovie> {

    private static final long serialVersionUID = -1175009568;

    public static final QPreviewGenreMovie previewGenreMovie = new QPreviewGenreMovie("ntc_preview_genre_movie");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> order = createNumber("order", Integer.class);

    public final com.querydsl.sql.PrimaryKey<PreviewGenreMovie> primary = createPrimaryKey(id);

    public final com.querydsl.sql.ForeignKey<Genre> ntcPreviewGenreMovieNtcGenreIdFk = createForeignKey(id, "id");

    public QPreviewGenreMovie(String variable) {
        super(PreviewGenreMovie.class, forVariable(variable), "null", "ntc_preview_genre_movie");
        addMetadata();
    }

    public QPreviewGenreMovie(String variable, String schema, String table) {
        super(PreviewGenreMovie.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QPreviewGenreMovie(String variable, String schema) {
        super(PreviewGenreMovie.class, forVariable(variable), schema, "ntc_preview_genre_movie");
        addMetadata();
    }

    public QPreviewGenreMovie(Path<? extends PreviewGenreMovie> path) {
        super(path.getType(), path.getMetadata(), "null", "ntc_preview_genre_movie");
        addMetadata();
    }

    public QPreviewGenreMovie(PathMetadata metadata) {
        super(PreviewGenreMovie.class, metadata, "null", "ntc_preview_genre_movie");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(id, ColumnMetadata.named("id").withIndex(1).ofType(Types.BIGINT).withSize(19).notNull());
        addMetadata(order, ColumnMetadata.named("order").withIndex(2).ofType(Types.INTEGER).withSize(10));
    }

}

