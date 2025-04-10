
import { ErrorRequestHandler } from 'express'
import { ValidateError } from 'tsoa'

export class ErrorHandlerMiddleware {
  private static extractEnumValuesFromMessage(message: string): string[] | null {
    const match = message.match(/\['(.*?)'\]/g)
    if (!match) return null

    return match
      .flatMap(group => group.match(/'([^']+)'/g) || [])
      .map(str => str.replace(/'/g, ''))
  }

  public static handle: ErrorRequestHandler = (err, req, res, next) => {
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
  
      res.status(400).json({
        message: 'Validation Error',
        errors: friendlyErrors,
      })
      return
    }
  
    console.error(err)
    res.status(500).json({
      message: 'Erro interno no servidor',
    })
  }
  
}
