// SYNC WITH https://github.com/kysely-org/kysely/blob/master/src/dialect/postgres/postgres-dialect.ts
// Unchanged code appears between BEGIN and END comments. If these sections
// ever become different from the Kysely code, they should be updated here.
import { PostgresAdapter, PostgresIntrospector, PostgresQueryCompiler, } from 'kysely';
import { PostgresClientDriver } from './postgres-client-driver.js';
/**
 * A Kysely Postgres dialect that uses a single `pg.Client` instance, providng
 * a single database connection instead of a pool of connections.
 */
export class PostgresClientDialect {
    #config;
    driver;
    constructor(config) {
        this.#config = config;
        this.driver = new PostgresClientDriver(this.#config);
    }
    createDriver() {
        if (!this.driver) {
            this.driver = new PostgresClientDriver(this.#config);
        }
        return this.driver;
    }
    /* BEGIN SYNCED CODE | Copyright (c) 2022 Sami Koskimäki | MIT License */
    createQueryCompiler() {
        return new PostgresQueryCompiler();
    }
    createAdapter() {
        return new PostgresAdapter();
    }
    createIntrospector(db) {
        return new PostgresIntrospector(db);
    }
    setClient(client) {
        this.driver.setClient(client);
    }
}
