import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import CreditCard from '@/models/CreditCard';
import { getUserFromRequest } from '@/lib/auth';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const card = await CreditCard.findOne({
      _id: params.id,
      userId: user.userId,
    });

    if (!card) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    return NextResponse.json(card);
  } catch (error) {
    console.error('Get card error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updateData = await request.json();

    // Remove fields that shouldn't be updated directly
    delete updateData._id;
    delete updateData.userId;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    // Validate if balance and limit are being updated
    if (updateData.currentBalance !== undefined && updateData.creditLimit !== undefined) {
      if (updateData.currentBalance > updateData.creditLimit) {
        return NextResponse.json(
          { error: 'Current balance cannot exceed credit limit' },
          { status: 400 }
        );
      }
    }

    const card = await CreditCard.findOneAndUpdate(
      {
        _id: params.id,
        userId: user.userId,
      },
      updateData,
      { new: true, runValidators: true }
    );

    if (!card) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    return NextResponse.json(card);
  } catch (error) {
    console.error('Update card error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Soft delete by setting isActive to false
    const card = await CreditCard.findOneAndUpdate(
      {
        _id: params.id,
        userId: user.userId,
      },
      { isActive: false },
      { new: true }
    );

    if (!card) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Card deleted successfully' });
  } catch (error) {
    console.error('Delete card error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
