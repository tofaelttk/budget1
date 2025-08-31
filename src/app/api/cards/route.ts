import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import CreditCard from '@/models/CreditCard';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cards = await CreditCard.find({ 
      userId: user.userId, 
      isActive: true 
    }).sort({ createdAt: -1 });

    return NextResponse.json(cards);
  } catch (error) {
    console.error('Get cards error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      name,
      currentBalance,
      creditLimit,
      interestRate,
      minimumPayment,
      dueDate,
      paymentStrategy = 'minimum',
      extraPaymentPercentage = 0,
    } = await request.json();

    // Validate required fields
    if (!name || currentBalance === undefined || !creditLimit || !interestRate || !minimumPayment || !dueDate) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Validate ranges
    if (currentBalance < 0 || creditLimit <= 0 || interestRate < 0 || interestRate > 1) {
      return NextResponse.json(
        { error: 'Invalid field values' },
        { status: 400 }
      );
    }

    if (currentBalance > creditLimit) {
      return NextResponse.json(
        { error: 'Current balance cannot exceed credit limit' },
        { status: 400 }
      );
    }

    const card = await CreditCard.create({
      userId: user.userId,
      name,
      currentBalance,
      creditLimit,
      interestRate,
      minimumPayment,
      dueDate,
      paymentStrategy,
      extraPaymentPercentage,
    });

    return NextResponse.json(card, { status: 201 });
  } catch (error) {
    console.error('Create card error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
