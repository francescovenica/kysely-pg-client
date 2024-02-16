// SYNC WITH https://github.com/kysely-org/kysely/blob/master/src/dialect/postgres/postgres-dialect.ts
// Unchanged code appears between BEGIN and END comments. If these sections
// ever become different from the Kysely code, they should be updated here.

import {
  DatabaseIntrospector,
  Dialect,
  DialectAdapter,
  Driver,
  Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
  QueryCompiler,
} from 'kysely'

import { PostgresClientDialectConfig } from './postgres-client-dialect-config.js'
import { PostgresClientDriver } from './postgres-client-driver.js'
import { PostgresSingleClient } from './postgres-single-client'

/**
 * A Kysely Postgres dialect that uses a single `pg.Client` instance, providng
 * a single database connection instead of a pool of connections.
 */
export class PostgresClientDialect implements Dialect {
  readonly #config: PostgresClientDialectConfig
  private driver: PostgresClientDriver

  constructor(config: PostgresClientDialectConfig) {
    this.#config = config
    this.driver = new PostgresClientDriver(this.#config)
  }

  createDriver(): Driver {
    if (!this.driver) {
      this.driver = new PostgresClientDriver(this.#config)
    }
    return this.driver
  }

  /* BEGIN SYNCED CODE | Copyright (c) 2022 Sami Koskimäki | MIT License */
  createQueryCompiler(): QueryCompiler {
    return new PostgresQueryCompiler()
  }

  createAdapter(): DialectAdapter {
    return new PostgresAdapter()
  }

  createIntrospector(db: Kysely<any>): DatabaseIntrospector {
    return new PostgresIntrospector(db)
  }

  setClient(client: PostgresSingleClient): void {
    this.driver.setClient(client)
  }
  /* END SYNCED CODE */
}
