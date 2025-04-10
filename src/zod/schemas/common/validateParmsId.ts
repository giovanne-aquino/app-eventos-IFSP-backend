import { z } from "zod";

/**
 * Schema comum para validar params com id numérico
 */

 //toDoRefactor this
export const numericIdParamSchema = z.object({
  id: z.preprocess((val) => {
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }, z.number().int().positive({ message: 'O id deve ser um número positivo.' }))
});


export type NumericIdParam = z.infer<typeof numericIdParamSchema>;
