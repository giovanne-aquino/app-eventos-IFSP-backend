import { Router, Request, Response } from 'express'

const router = Router()

// Rota GET /
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Bem-vindo à API Eventos IFSP 👋' })
})

export default router