export declare function isFunction(obj: unknown): obj is Function;
export declare function isObject(obj: unknown): obj is Record<string, unknown>;
export declare function isString(obj: unknown): obj is string;
export declare function freeze<T>(obj: T): Readonly<T>;
