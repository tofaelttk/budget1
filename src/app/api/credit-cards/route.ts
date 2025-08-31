import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import CreditCard from '@/models/CreditCard';
import mongoose from 'mongoose';

// Connect to MongoDB
async function connectDB() {
  if (mongoose.connections[0].readyState) {
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

// GET - Fetch all credit cards for a user
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'demo-user'; // Default for demo
    
    const creditCards = await CreditCard.find({ 
      userId: new mongoose.Types.ObjectId(userId),
      isActive: true 
    }).sort({ createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      data: creditCards 
    });
  } catch (error) {
    console.error('Error fetching credit cards:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch credit cards' },
      { status: 500 }
    );
  }
}

// POST - Create a new credit card
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { userId = 'demo-user', ...cardData } = body;
    
    const creditCard = new CreditCard({
      ...cardData,
      userId: new mongoose.Types.ObjectId(userId)
    });
    
    await creditCard.save();
    
    return NextResponse.json({ 
      success: true, 
      data: creditCard 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating credit card:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create credit card' },
      { status: 500 }
    );
  }
}

// PUT - Update a credit card
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { id, userId = 'demo-user', ...updateData } = body;
    
    const creditCard = await CreditCard.findOneAndUpdate(
      { 
        _id: new mongoose.Types.ObjectId(id),
        userId: new mongoose.Types.ObjectId(userId)
      },
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!creditCard) {
      return NextResponse.json(
        { success: false, error: 'Credit card not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      data: creditCard 
    });
  } catch (error) {
    console.error('Error updating credit card:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update credit card' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a credit card
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const userId = searchParams.get('userId') || 'demo-user';
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Credit card ID is required' },
        { status: 400 }
      );
    }
    
    const creditCard = await CreditCard.findOneAndUpdate(
      { 
        _id: new mongoose.Types.ObjectId(id),
        userId: new mongoose.Types.ObjectId(userId)
      },
      { isActive: false },
      { new: true }
    );
    
    if (!creditCard) {
      return NextResponse.json(
        { success: false, error: 'Credit card not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Credit card deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting credit card:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete credit card' },
      { status: 500 }
    );
  }
}
