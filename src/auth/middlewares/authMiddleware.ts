import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';
import { UnauthorizedError } from '../../utils/errors/apiErrors';
import { UserRole } from '@prisma/client';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: UserRole;
  };
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError('Token não fornecido');
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
      throw new UnauthorizedError('Token não fornecido');
    }

    const authService = new AuthService();
    const user = await authService.validateToken(token);

    req.user = {
      id: user.id,
      email: user.email,
      role: user.userRole
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const authorize = (...roles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError('Usuário não autenticado');
    }

    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Acesso não autorizado');
    }

    next();
  };
};

export function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === 'jwt') {
    const token = request.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return Promise.reject(new UnauthorizedError('Token não fornecido'));
    }

    const authService = new AuthService();
    return authService.validateToken(token)
      .then(user => {
        if (scopes && !scopes.includes(user.userRole)) {
          return Promise.reject(new UnauthorizedError('Acesso não autorizado'));
        }
        return user;
      });
  }
  
  return Promise.reject(new UnauthorizedError('Método de autenticação não suportado'));
} 