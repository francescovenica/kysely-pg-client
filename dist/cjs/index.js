"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_client_dialect_js_1 = require("./lib/postgres-client-dialect.js");
const postgres_client_driver_js_1 = require("./lib/postgres-client-driver.js");
__exportStar(require("./lib/postgres-client-dialect-config.js"), exports);
__exportStar(require("./lib/postgres-single-client.js"), exports);
__exportStar(require("./lib/postgres-client-dialect.js"), exports);
__exportStar(require("./lib/postgres-client-driver.js"), exports);
exports.default = {
    PostgresClientDialect: postgres_client_dialect_js_1.PostgresClientDialect,
    PostgresClientDriver: postgres_client_driver_js_1.PostgresClientDriver,
};
