import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { verifyPassword, createAuthResponse } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Login endpoint hit');
    await connectToDatabase();
    
    const body = await request.json();
    console.log('📄 Login data received:', { email: body.email, password: '[HIDDEN]' });
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create auth response
    const authResponse = createAuthResponse({
      userId: user._id.toString(),
      email: user.email,
    });

    // Create response with cookie
    const response = NextResponse.json({
      message: 'Login successful',
      ...authResponse,
    });

    // Set HTTP-only cookie
    response.cookies.set('auth-token', authResponse.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
