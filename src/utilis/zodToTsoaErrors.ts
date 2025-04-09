import { ZodIssue } from 'zod';
import { FieldErrors } from 'tsoa';

/**
 * Converte erros do Zod para o formato aceito pelo TSOA (FieldErrors).
 */
export function zodToTsoaErrors(issues: ZodIssue[]): FieldErrors {
  const fieldErrors: FieldErrors = {};

  for (const issue of issues) {
    const path = issue.path.map(String).join('.');
    fieldErrors[path] = {
      message: issue.message,
    };
  }

  return fieldErrors;
}