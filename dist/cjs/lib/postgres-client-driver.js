"use strict";
// SYNC WITH https://github.com/kysely-org/kysely/blob/master/src/dialect/postgres/postgres-driver.ts
// Unchanged code appears between BEGIN and END comments. If these sections
// ever become different from the Kysely code, they should be updated here.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresClientDriver = void 0;
const kysely_1 = require("kysely");
const object_utils_js_1 = require("./utils/object-utils.js");
const stack_trace_utils_js_1 = require("./utils/stack-trace-utils.js");
/**
 * Kysely driver that uses a `pg.Client`, providing a single connection to
 * the database instead of a pool of connections as with `PostgresDriver`.
 */
class PostgresClientDriver {
    #config;
    #client;
    #connection;
    #inUse = false;
    constructor(config) {
        this.#config = (0, object_utils_js_1.freeze)({ ...config });
    }
    async init() { }
    async acquireConnection() {
        if (this.#connection === undefined) {
            this.#client = this.#config.client;
            this.#connection = new PostgresClientConnection(this.#client, {
                cursor: this.#config.cursor ?? null,
            });
        }
        // else if (this.#inUse) {
        //   throw new Error(
        //     'Attempted to acquire a second connection; not configured as a pool'
        //   )
        // }
        this.#inUse = true;
        return this.#connection;
    }
    /* BEGIN SYNCED CODE | Copyright (c) 2022 Sami Koskimäki | MIT License */
    async beginTransaction(connection, settings) {
        if (settings.isolationLevel) {
            await connection.executeQuery(kysely_1.CompiledQuery.raw(`start transaction isolation level ${settings.isolationLevel}`));
        }
        else {
            await connection.executeQuery(kysely_1.CompiledQuery.raw('begin'));
        }
    }
    async commitTransaction(connection) {
        await connection.executeQuery(kysely_1.CompiledQuery.raw('commit'));
    }
    async rollbackTransaction(connection) {
        await connection.executeQuery(kysely_1.CompiledQuery.raw('rollback'));
    }
    /* END SYNCED CODE */
    async releaseConnection(connection) {
        if (connection !== this.#connection) {
            throw new Error('Attempted to release an unknown connection');
        }
        this.#inUse = false;
    }
    async destroy() {
        if (this.#client !== undefined) {
        }
    }
    setClient(client) {
        this.#client = client;
    }
}
exports.PostgresClientDriver = PostgresClientDriver;
class PostgresClientConnection {
    #client;
    #options;
    constructor(client, options) {
        this.#client = client;
        this.#options = options;
    }
    /* BEGIN SYNCED CODE | Copyright (c) 2022 Sami Koskimäki | MIT License */
    async executeQuery(compiledQuery) {
        try {
            return await this.#client.query(compiledQuery.sql, [
                ...compiledQuery.parameters,
            ]);
        }
        catch (err) {
            throw (0, stack_trace_utils_js_1.extendStackTrace)(err, new Error());
        }
    }
    async *streamQuery(compiledQuery, chunkSize) {
        if (!this.#options.cursor) {
            throw new Error("'cursor' is not present in your postgres dialect config. It's required to make streaming work in postgres.");
        }
        if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
            throw new Error('chunkSize must be a positive integer');
        }
        const cursor = this.#client.query(new this.#options.cursor(compiledQuery.sql, compiledQuery.parameters.slice()));
        try {
            while (true) {
                const rows = await cursor.read(chunkSize);
                if (rows.length === 0) {
                    break;
                }
                yield {
                    rows,
                };
            }
        }
        finally {
            await cursor.close();
        }
    }
}
