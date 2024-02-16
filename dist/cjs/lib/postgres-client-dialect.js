"use strict";
// SYNC WITH https://github.com/kysely-org/kysely/blob/master/src/dialect/postgres/postgres-dialect.ts
// Unchanged code appears between BEGIN and END comments. If these sections
// ever become different from the Kysely code, they should be updated here.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresClientDialect = void 0;
const kysely_1 = require("kysely");
const postgres_client_driver_js_1 = require("./postgres-client-driver.js");
/**
 * A Kysely Postgres dialect that uses a single `pg.Client` instance, providng
 * a single database connection instead of a pool of connections.
 */
class PostgresClientDialect {
    #config;
    driver;
    constructor(config) {
        this.#config = config;
        this.driver = new postgres_client_driver_js_1.PostgresClientDriver(this.#config);
    }
    createDriver() {
        if (!this.driver) {
            this.driver = new postgres_client_driver_js_1.PostgresClientDriver(this.#config);
        }
        return this.driver;
    }
    /* BEGIN SYNCED CODE | Copyright (c) 2022 Sami Koskimäki | MIT License */
    createQueryCompiler() {
        return new kysely_1.PostgresQueryCompiler();
    }
    createAdapter() {
        return new kysely_1.PostgresAdapter();
    }
    createIntrospector(db) {
        return new kysely_1.PostgresIntrospector(db);
    }
    setClient(client) {
        this.driver.setClient(client);
    }
}
exports.PostgresClientDialect = PostgresClientDialect;
