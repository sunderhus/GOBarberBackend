import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  // validação do token jwt
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Missing jwt token');
  }

  // bearer
  const { secret } = authConfig.jwt;
  const [, token] = authHeader.split(' ');

  if (!secret) {
    throw new AppError('Fail on create a new authentication');
  }

  try {
    const decodedToken = verify(token, secret);

    const { exp, iat, sub } = decodedToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
