import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'HossainMdTofael1/2';

console.log('🔐 JWT Secret configured:', JWT_SECRET ? 'Yes' : 'No');

export interface JWTPayload {
  userId: string;
  email: string;
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    console.log('🔍 Verifying token:', token.substring(0, 20) + '...');
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    console.log('✅ Token verified successfully for user:', decoded.email);
    return decoded;
  } catch (error) {
    console.log('❌ Token verification failed:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

export function extractTokenFromRequest(request: NextRequest): string | null {
  // First check cookies (set by our API)
  const tokenFromCookie = request.cookies.get('auth-token')?.value;
  if (tokenFromCookie) {
    console.log('🍪 Token found in cookie');
    return tokenFromCookie;
  }
  
  // Then check Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    console.log('📡 Token found in Authorization header');
    return authHeader.substring(7);
  }
  
  console.log('❌ No token found in request');
  return null;
}

export function getUserFromRequest(request: NextRequest): JWTPayload | null {
  const token = extractTokenFromRequest(request);
  if (!token) {
    console.log('❌ No token found for user verification');
    return null;
  }
  
  const user = verifyToken(token);
  if (user) {
    console.log('✅ Token verified for user:', user.email);
  } else {
    console.log('❌ Token verification failed');
  }
  
  return user;
}

export function createAuthResponse(user: JWTPayload) {
  const token = generateToken(user);
  
  return {
    user,
    token,
  };
}
