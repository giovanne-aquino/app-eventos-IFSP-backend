import { ZodSchema } from 'zod'
import { Request, Response, NextFunction } from 'express'
 //toDoRefactor this
export const validateBody =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.format() })
    }

    // substitui o body por algo tipado
    req.body = result.data
    next()
}