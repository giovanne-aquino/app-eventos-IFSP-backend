import { ZodSchema, ZodType} from 'zod';
import { ValidateError } from 'tsoa';
import { zodToTsoaErrors } from './zodToTsoaErrors';

/**
 * Valida qualquer objeto com base em um schema Zod e lança um erro TSOA se inválido.
 * Pode ser usado para params, query, body, etc.
 */

 //toDoRefactor this
export function validateParams<Input, Output>(
  schema: ZodType<Output, any, Input>,
  data: Input
): Output {
  const result = schema.safeParse(data);
  if (!result.success) {
    const message = result.error.errors[0]?.message || 'Validation Error';
    const fieldErrors = zodToTsoaErrors(result.error.errors);
    throw new ValidateError(fieldErrors, message);
  }

  return result.data;
}



