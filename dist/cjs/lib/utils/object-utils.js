"use strict";
// Copied from https://github.com/kysely-org/kysely/blob/master/src/util/object-utils.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = isFunction;
exports.isObject = isObject;
exports.isString = isString;
exports.freeze = freeze;
// Copyright (c) 2022 Sami Koskimäki | MIT License
function isFunction(obj) {
    return typeof obj === 'function';
}
function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}
function isString(obj) {
    return typeof obj === 'string';
}
function freeze(obj) {
    return Object.freeze(obj);
}
