"use strict";
// SYNC WITH https://github.com/kysely-org/kysely/blob/master/src/util/stack-trace-utils.ts
// Unchanged code appears between BEGIN and END comments. If these sections
// ever become different from the Kysely code, they should be updated here.
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendStackTrace = void 0;
const object_utils_js_1 = require("./object-utils.js");
/* BEGIN SYNCED CODE | Copyright (c) 2022 Sami Koskimäki | MIT License */
function extendStackTrace(err, stackError) {
    if (isStackHolder(err) && stackError.stack) {
        // Remove the first line that just says `Error`.
        const stackExtension = stackError.stack.split('\n').slice(1).join('\n');
        err.stack += `\n${stackExtension}`;
        return err;
    }
    return err;
}
exports.extendStackTrace = extendStackTrace;
function isStackHolder(obj) {
    return (0, object_utils_js_1.isObject)(obj) && (0, object_utils_js_1.isString)(obj.stack);
}
/* END SYNCED CODE */
