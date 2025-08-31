import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, emailTemplates, sendPaymentReminders, sendWeeklySummaries } from '@/utils/emailService';

// POST - Send various types of emails
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, to, data } = body;

    let template;
    
    switch (type) {
      case 'welcome':
        template = emailTemplates.welcome(data.name);
        break;
        
      case 'payment-reminder':
        template = emailTemplates.paymentReminder(data.cardName, data.amount, data.dueDate);
        break;
        
      case 'goal-achieved':
        template = emailTemplates.goalAchieved(data.goalTitle, data.amount);
        break;
        
      case 'weekly-summary':
        template = emailTemplates.weeklySummary(data);
        break;
        
      case 'contact-response':
        template = emailTemplates.contactResponse(data.name, data.message);
        break;
        
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid email type' },
          { status: 400 }
        );
    }

    const result = await sendEmail(to, template);
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        messageId: result.messageId,
        message: 'Email sent successfully' 
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in email API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

// GET - Trigger automated emails (for cron jobs)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const auth = searchParams.get('auth');
    
    // Simple auth check for cron jobs
    if (auth !== process.env.CRON_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    let result;
    
    switch (type) {
      case 'payment-reminders':
        result = await sendPaymentReminders();
        break;
        
      case 'weekly-summaries':
        result = await sendWeeklySummaries();
        break;
        
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid automation type' },
          { status: 400 }
        );
    }
    
    return NextResponse.json({ 
      success: true, 
      result,
      message: `${type} sent successfully` 
    });
  } catch (error) {
    console.error('Error in automated email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send automated emails' },
      { status: 500 }
    );
  }
}
