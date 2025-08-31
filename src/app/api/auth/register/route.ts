import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { hashPassword, createAuthResponse } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Registration endpoint hit');
    await connectToDatabase();
    
    const body = await request.json();
    console.log('📄 Registration data received:', { ...body, password: '[HIDDEN]' });
    const { email, password, firstName, lastName } = body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName,
      lastName,
    });

    // Create auth response
    const authResponse = createAuthResponse({
      userId: user._id.toString(),
      email: user.email,
    });

    // Create response with cookie
    const response = NextResponse.json({
      message: 'User created successfully',
      ...authResponse,
    }, { status: 201 });

    // Set HTTP-only cookie
    response.cookies.set('auth-token', authResponse.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
