import jwt from 'jsonwebtoken';

export interface AuthenticatedUser {
  id: string;
}

export const verifyToken = (authHeader: string | null): AuthenticatedUser => {
  if (!authHeader) {
    throw new Error('No token, authorization denied');
  }

  const token = authHeader.split(' ')[1]; // Remove 'Bearer ' prefix
  if (!token) {
    throw new Error('No token, authorization denied');
  }

  try {
    const decoded = jwt.verify(token, Netlify.env.get('JWT_SECRET') || '') as any;
    return decoded.user;
  } catch (error) {
    throw new Error('Token is not valid');
  }
};
