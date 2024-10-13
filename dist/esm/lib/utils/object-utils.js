// Copied from https://github.com/kysely-org/kysely/blob/master/src/util/object-utils.ts
// Copyright (c) 2022 Sami Koskimäki | MIT License
export function isFunction(obj) {
    return typeof obj === 'function';
}
export function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}
export function isString(obj) {
    return typeof obj === 'string';
}
export function freeze(obj) {
    return Object.freeze(obj);
}
