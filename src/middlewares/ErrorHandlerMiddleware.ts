import { ErrorRequestHandler } from 'express';
import { ValidateError } from 'tsoa';
import { Prisma } from '@prisma/client';
import { ZodError, ZodIssueCode } from 'zod'; 

export class ErrorHandlerMiddleware {
  private static extractEnumValuesFromMessage(message: string): string[] | null {
    const match = message.match(/\['(.*?)'\]/g)
    if (!match) return null

    return match
      .flatMap(group => group.match(/'([^']+)'/g) || [])
      .map(str => str.replace(/'/g, ''))
  }

  public static handle: ErrorRequestHandler = (err, req, res, next) => {
    // ZodError Handling
    if (err instanceof ZodError) {
      const friendlyErrors = err.issues.map(issue => ({
        path: issue.path,
        message: issue.message,
      }));

      res.status(400).json({
        message: 'Validation Error',
        errors: friendlyErrors,
      });
      return;
    }
    // Tsoa ValidateError Handling
    if (err instanceof ValidateError) {
      const errorMap: Record<string, Set<string>> = {}
  
      for (const [path, fieldError] of Object.entries(err.fields)) {
        const field = path.replace(/^body\./, '')
        let message = fieldError.message
  
        if (message.includes('Could not match the union against any of the items')) {
          const values = this.extractEnumValuesFromMessage(message)
          if (values && values.length) {
            message = `O campo '${field}' deve ser um dos seguintes: ${values.join(', ')}.`
          }
        }
  
        if (!errorMap[field]) errorMap[field] = new Set()
        errorMap[field].add(message)
      }
  
      const friendlyErrors = Object.entries(errorMap).map(([field, messages]) => ({
        path: [field],
        message: Array.from(messages).join(' | '),
      }))
  
      // Resposta 400 Bad Request para erros de validação
      res.status(400).json({
        message: 'Validation Error',
        errors: friendlyErrors,
      })
      return
    }
  
    //Tratamento de Erros Específicos do Prisma (PrismaClientKnownRequestError) para lidar com casos como "registro não encontrado" ou "violação de unique constraint"
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        case 'P2025':
          // Erro P2025: Ocorre quando uma operação (update, delete, findUniqueOrThrow, etc.) espera um registro que não foi encontrado.
          res.status(404).json({
            message: 'Resource not found.',
            details: err.meta,
          });
          break;
        case 'P2002':
          // Erro P2002: Ocorre quando há uma violação de unique constraint (chave única duplicada).
          res.status(409).json({ // 409 Conflict
            message: 'A record with this value already exists. Please check unique fields.',
            details: err.meta,
          });
          break;
        default:
          // Para outros erros conhecidos do Prisma 
          console.error(`Prisma error ${err.code}:`, err.message);
          res.status(500).json({
            message: 'Database error. Please try again later.',
            details: err.message, 
          });
          break;
      }
      return; 
    }
    //Tratamento de Erros Genéricos (qualquer 'Error' lançado)
    if (err instanceof Error) {
      console.error('Application error caught:', err); // **Log do erro completo para depuração no servidor**
      res.status(500).json({
        message: 'Internal Server Error',
        error: err.message, 
      });
      return; 
    }

    console.error(err)
    res.status(500).json({
      message: 'An unexpected error occurred',
    })
  }
}