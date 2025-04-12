import { ZodIssue, ZodError } from 'zod';
import { FieldErrors } from 'tsoa';

/**
 * Converte erros do Zod para o formato aceito pelo TSOA (FieldErrors),
 * incluindo melhorias para enums e unions.
 */
export function zodToTsoaErrors(issues: ZodIssue[]): FieldErrors {
  const fieldErrors: FieldErrors = {};

  for (const issue of issues) {
    const path = issue.path.map(String).join('.') || 'body';

    // Tratar erros de união com múltiplas mensagens
    if (issue.code === 'invalid_union' && 'unionErrors' in issue) {
      const unionErrors = (issue as any).unionErrors as ZodError[];

      // Pegando mensagens únicas
      const messages = new Set(
        unionErrors.flatMap(err =>
          err.issues.map(subIssue => {
            const subPath = subIssue.path.map(String).join('.') || path;

            // Se for enum inválido, mostra a mensagem do enum
            if (subIssue.code === 'invalid_enum_value') {
              const options = (subIssue as any).options || [];
              return `Valor inválido para ${subPath}. Valores permitidos: ${options.join(', ')}`;
            }

            return subIssue.message;
          })
        )
      );

      fieldErrors[path] = {
        message: Array.from(messages).join('; ')
      };
      continue;
    }

    // Enum direto fora de union
    if (issue.code === 'invalid_enum_value') {
      const options = (issue as any).options || [];
      fieldErrors[path] = {
        message: `Valor inválido para ${path}. Valores permitidos: ${options.join(', ')}`
      };
      continue;
    }

    // Outros erros
    fieldErrors[path] = {
      message: issue.message
    };
  }

  return fieldErrors;
}
