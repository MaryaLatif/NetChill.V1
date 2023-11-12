package com.netchill.db.generated;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import javax.annotation.processing.Generated;
import com.querydsl.sql.Column;

/**
 * Genre is a Querydsl bean type
 */
@Generated("com.coreoz.plume.db.querydsl.generation.IdBeanSerializer")
public class Genre extends com.coreoz.plume.db.querydsl.crud.CrudEntityQuerydsl {

    @Column("id")
    @JsonSerialize(using=com.fasterxml.jackson.databind.ser.std.ToStringSerializer.class)
    private Long id;

    @Column("name")
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Genre#" + id;
    }

    @Override
    public boolean equals(Object o) {
        if (id == null) {
            return super.equals(o);
        }
        if (!(o instanceof Genre)) {
            return false;
        }
        Genre obj = (Genre) o;
        return id.equals(obj.id);
    }

    @Override
    public int hashCode() {
        if (id == null) {
            return super.hashCode();
        }
        final int prime = 31;
        int result = 1;
        result = prime * result + id.hashCode();
        return result;
    }

}

