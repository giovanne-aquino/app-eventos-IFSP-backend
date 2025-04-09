"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = validateParams;
const tsoa_1 = require("tsoa");
const zodToTsoaErrors_1 = require("./zodToTsoaErrors");
/**
 * Valida qualquer objeto com base em um schema Zod e lança um erro TSOA se inválido.
 * Pode ser usado para params, query, body, etc.
 */
function validateParams(schema, data) {
    const result = schema.safeParse(data);
    if (!result.success) {
        const message = result.error.errors[0]?.message || 'Erro de validação';
        const fieldErrors = (0, zodToTsoaErrors_1.zodToTsoaErrors)(result.error.errors);
        throw new tsoa_1.ValidateError(fieldErrors, message);
    }
    return result.data;
}
