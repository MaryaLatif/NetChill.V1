package com.netchill.db;

import com.coreoz.plume.db.transaction.TransactionManager;
import org.flywaydb.core.Flyway;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class FlywayService {
  private final TransactionManager transactionManager;

  @Inject
  public FlywayService(TransactionManager transactionManager) {
    this.transactionManager = transactionManager;
  }

  public void migrate() {
    Flyway
        .configure()
        .dataSource(transactionManager.dataSource())
        .outOfOrder(true)
        .load()
        .migrate();
  }
}
