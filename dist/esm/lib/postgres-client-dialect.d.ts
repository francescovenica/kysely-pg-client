import { DatabaseIntrospector, Dialect, DialectAdapter, Driver, Kysely, QueryCompiler } from 'kysely';
import { PostgresClientDialectConfig } from './postgres-client-dialect-config.js';
import { PostgresSingleClient } from './postgres-single-client';
/**
 * A Kysely Postgres dialect that uses a single `pg.Client` instance, providng
 * a single database connection instead of a pool of connections.
 */
export declare class PostgresClientDialect implements Dialect {
    #private;
    private driver;
    constructor(config: PostgresClientDialectConfig);
    createDriver(): Driver;
    createQueryCompiler(): QueryCompiler;
    createAdapter(): DialectAdapter;
    createIntrospector(db: Kysely<any>): DatabaseIntrospector;
    setClient(client: PostgresSingleClient): void;
}
