import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requisições por windowMs
  message: 'Muitas requisições deste IP, por favor tente novamente após 15 minutos'
});

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 1000, // limite de 1000 requisições por windowMs
  message: 'Muitas requisições deste IP, por favor tente novamente após 15 minutos'
}); 