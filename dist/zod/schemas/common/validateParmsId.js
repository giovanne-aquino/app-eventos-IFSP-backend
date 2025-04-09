"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numericIdParamSchema = void 0;
const zod_1 = require("zod");
/**
 * Schema comum para validar params com id numérico
 */
exports.numericIdParamSchema = zod_1.z.object({
    id: zod_1.z.preprocess((val) => {
        const num = Number(val);
        return isNaN(num) ? undefined : num;
    }, zod_1.z.number().int().positive({ message: 'O id deve ser um número positivo.' }))
});
