import { ZodError, ZodIssue } from 'zod';
import { FieldErrors } from 'tsoa';

/**
 * Converte erros do Zod para o formato aceito pelo TSOA (FieldErrors).
 * Transforma a estrutura de erros do Zod em um objeto compatível com TSOA.
 * 
 * @param errors - Array de erros do Zod (ZodIssue[])
 * @returns Objeto de erros no formato do TSOA (FieldErrors)
 */
export function zodToTsoaErrors(errors: ZodIssue[]): FieldErrors {
  return errors.reduce((acc: FieldErrors, error: ZodIssue) => {
    // Constrói o caminho do campo com erro usando join('.')
    const fieldPath = error.path.join('.');
    
    // Adiciona a mensagem de erro ao objeto acumulador
    acc[fieldPath] = {
      message: error.message
    };
    
    return acc;
  }, {});
}
