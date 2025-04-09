"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodToTsoaErrors = zodToTsoaErrors;
/**
 * Converte erros do Zod para o formato aceito pelo TSOA (FieldErrors).
 */
function zodToTsoaErrors(issues) {
    const fieldErrors = {};
    for (const issue of issues) {
        const path = issue.path.map(String).join('.');
        fieldErrors[path] = {
            message: issue.message,
        };
    }
    return fieldErrors;
}
