import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// Mock JWT secret - in production, use environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

export interface DecodedToken {
  userId: string;
  email: string;
  role: 'partner' | 'staff';
  hotelId?: string; // For staff authentication
  exp: number;
}

export interface ApiError {
  success: false;
  error: {
    message: string;
    code: string;
  };
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

/**
 * Middleware to authenticate partner/staff API requests
 */
export async function authenticateApiRequest(request: NextRequest): Promise<{
  isValid: boolean;
  user?: DecodedToken;
  error?: string;
}> {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return {
        isValid: false,
        error: 'Authorization header missing'
      };
    }

    const token = authHeader.replace('Bearer ', '');
    
    if (!token) {
      return {
        isValid: false,
        error: 'Token missing from authorization header'
      };
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    
    // Check if token is expired
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return {
        isValid: false,
        error: 'Token expired'
      };
    }

    return {
      isValid: true,
      user: decoded
    };
  } catch (error) {
    return {
      isValid: false,
      error: 'Invalid token'
    };
  }
}

/**
 * Generate JWT token for authentication
 */
export function generateToken(payload: Omit<DecodedToken, 'exp'>): string {
  return jwt.sign(
    {
      ...payload,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    },
    JWT_SECRET
  );
}

/**
 * Create standardized API response
 */
export function createApiResponse<T>(data: T): ApiSuccess<T> {
  return {
    success: true,
    data
  };
}

/**
 * Create standardized API error response
 */
export function createApiError(message: string, code: string = 'API_ERROR'): ApiError {
  return {
    success: false,
    error: {
      message,
      code
    }
  };
}

/**
 * Validate required fields in request body
 */
export function validateRequiredFields(
  body: Record<string, any>, 
  requiredFields: string[]
): { isValid: boolean; missingFields?: string[] } {
  const missingFields = requiredFields.filter(field => 
    body[field] === undefined || body[field] === null || body[field] === ''
  );

  return {
    isValid: missingFields.length === 0,
    missingFields: missingFields.length > 0 ? missingFields : undefined
  };
}