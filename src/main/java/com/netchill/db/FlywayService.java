package com.netchill.db;

import org.flywaydb.core.Flyway;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.sql.DataSource;

@Singleton
public class FlywayService {
    private final DataSource dataSource;

    @Inject
    public FlywayService(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void migrate() {
        Flyway
                .configure()
                .dataSource(dataSource)
                .outOfOrder(true)
                .baselineOnMigrate(true)
                .load()
                .migrate();
    }
}
