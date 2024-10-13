import { CompiledQuery, DatabaseConnection, Driver, PostgresCursorConstructor, QueryResult, TransactionSettings } from 'kysely';
import { PostgresClientDialectConfig } from './postgres-client-dialect-config.js';
import { PostgresSingleClient } from './postgres-single-client.js';
/**
 * Kysely driver that uses a `pg.Client`, providing a single connection to
 * the database instead of a pool of connections as with `PostgresDriver`.
 */
export declare class PostgresClientDriver implements Driver {
    #private;
    constructor(config: PostgresClientDialectConfig);
    init(): Promise<void>;
    acquireConnection(): Promise<DatabaseConnection>;
    beginTransaction(connection: DatabaseConnection, settings: TransactionSettings): Promise<void>;
    commitTransaction(connection: DatabaseConnection): Promise<void>;
    rollbackTransaction(connection: DatabaseConnection): Promise<void>;
    releaseConnection(connection: PostgresClientConnection): Promise<void>;
    destroy(): Promise<void>;
    setClient(client: PostgresSingleClient): void;
}
interface PostgresConnectionOptions {
    cursor: PostgresCursorConstructor | null;
}
declare class PostgresClientConnection implements DatabaseConnection {
    #private;
    constructor(client: PostgresSingleClient, options: PostgresConnectionOptions);
    executeQuery<O>(compiledQuery: CompiledQuery): Promise<QueryResult<O>>;
    streamQuery<O>(compiledQuery: CompiledQuery, chunkSize: number): AsyncIterableIterator<QueryResult<O>>;
}
export {};
