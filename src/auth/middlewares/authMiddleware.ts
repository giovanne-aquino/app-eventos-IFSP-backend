import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';
import { UnauthorizedError } from '../../utils/errors/apiErrors';
import { UserRole } from '@prisma/client';
import { jwtTokenSchema } from '../../zod/schemas/auth/authSchema';

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
      throw new UnauthorizedError('Authentication failed: Authorization header missing.');
    }

    const [, token] = authHeader.split(' ');
    const parsedToken = jwtTokenSchema.safeParse(token);
    if (!parsedToken.success) {
      throw new UnauthorizedError('Authentication failed: Invalid token format.');
    }

    const authService = new AuthService();
    const user = await authService.validateToken(parsedToken.data);

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
      throw new UnauthorizedError('Authorization failed: User not authenticated.');
    }

    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError(`Authorization failed: Access forbidden for role ${req.user.role}. Required role(s): ${roles.join(', ')}`);
      
    }

    next();
  };
};

export function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  console.log('Authorization Header:', request.headers.authorization);
  if (securityName === 'jwt') {
    const token = request.headers.authorization?.split(' ')[1];
    
    const parsedToken = jwtTokenSchema.safeParse(token);
    if (!parsedToken.success) {
      return Promise.reject(new UnauthorizedError('Authentication failed: Token is missing or improperly formatted.'));
    }

    const authService = new AuthService();

    return authService.validateToken(parsedToken.data)
      .then(user => {
        //Corrigido erro de scopes aqui
        if (scopes && scopes.length > 0 && !scopes.includes(user.userRole)) {
          return Promise.reject(new UnauthorizedError('Authentication failed: Invalid token format.'));
        }
        return user;
      });

     

  }
  
  return Promise.reject(new UnauthorizedError('Authorization failed: Invalid security scheme or missing token.'));
} 