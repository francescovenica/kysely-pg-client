"use strict";
// Copied from https://github.com/kysely-org/kysely/blob/master/src/util/object-utils.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.freeze = exports.isString = exports.isObject = exports.isFunction = void 0;
// Copyright (c) 2022 Sami Koskimäki | MIT License
function isFunction(obj) {
    return typeof obj === 'function';
}
exports.isFunction = isFunction;
function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}
exports.isObject = isObject;
function isString(obj) {
    return typeof obj === 'string';
}
exports.isString = isString;
function freeze(obj) {
    return Object.freeze(obj);
}
exports.freeze = freeze;
