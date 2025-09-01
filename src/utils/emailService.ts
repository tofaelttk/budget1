import nodemailer from 'nodemailer';

// Create email transporter
const createTransporter = () => {
  if (typeof window !== 'undefined') {
    // Client-side, return mock
    return null;
  }
  
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Email templates
export const emailTemplates = {
  welcome: (name: string) => ({
    subject: 'Welcome to Your Personal Finance Dashboard! 🎉',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 20px; overflow: hidden;">
        <div style="padding: 40px; text-align: center;">
          <h1 style="margin: 0 0 20px 0; font-size: 32px; font-weight: bold;">Welcome, ${name}! 🚀</h1>
          <p style="font-size: 18px; margin: 0 0 30px 0; opacity: 0.9;">Your journey to financial freedom starts now!</p>
          
          <div style="background: rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 30px; margin: 30px 0; backdrop-filter: blur(10px);">
            <h2 style="margin: 0 0 20px 0; font-size: 24px;">🎯 What's Next?</h2>
            <ul style="text-align: left; padding-left: 20px; font-size: 16px; line-height: 1.6;">
              <li>Set up your credit cards and track payments</li>
              <li>Add your income sources for better planning</li>
              <li>Create expense categories that work for you</li>
              <li>Set financial goals and track progress</li>
              <li>Get AI-powered insights and suggestions</li>
            </ul>
          </div>
          
          <div style="margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL}" style="display: inline-block; background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 16px; transition: all 0.3s ease;">
              Start Your Financial Journey →
            </a>
          </div>
          
          <p style="font-size: 14px; opacity: 0.8; margin: 20px 0 0 0;">
            Questions? Reply to this email - we're here to help! 💪
          </p>
        </div>
      </div>
    `
  }),

  paymentReminder: (cardName: string, amount: number, dueDate: string) => ({
    subject: `💳 Payment Reminder: ${cardName} due ${dueDate}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 20px; overflow: hidden;">
        <div style="padding: 40px; text-align: center;">
          <h1 style="margin: 0 0 20px 0; font-size: 28px;">⏰ Payment Reminder</h1>
          
          <div style="background: rgba(255, 255, 255, 0.15); border-radius: 15px; padding: 25px; margin: 25px 0; backdrop-filter: blur(10px);">
            <h2 style="margin: 0 0 15px 0; font-size: 22px;">${cardName}</h2>
            <p style="font-size: 18px; margin: 10px 0;">Minimum Payment: <strong>$${amount.toFixed(2)}</strong></p>
            <p style="font-size: 16px; margin: 10px 0; opacity: 0.9;">Due Date: <strong>${dueDate}</strong></p>
          </div>
          
          <p style="font-size: 16px; margin: 20px 0;">Don't forget to make your payment to avoid late fees! 💡</p>
          
          <div style="margin: 25px 0;">
            <a href="${process.env.NEXTAUTH_URL}" style="display: inline-block; background: #10b981; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px;">
              View Dashboard
            </a>
          </div>
        </div>
      </div>
    `
  }),

  goalAchieved: (goalTitle: string, amount: number) => ({
    subject: `🎉 Congratulations! You achieved your ${goalTitle} goal!`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 20px; overflow: hidden;">
        <div style="padding: 40px; text-align: center;">
          <h1 style="margin: 0 0 20px 0; font-size: 36px;">🏆 GOAL ACHIEVED! 🎉</h1>
          
          <div style="background: rgba(255, 255, 255, 0.15); border-radius: 15px; padding: 30px; margin: 30px 0; backdrop-filter: blur(10px);">
            <h2 style="margin: 0 0 15px 0; font-size: 24px;">${goalTitle}</h2>
            <p style="font-size: 20px; margin: 15px 0; font-weight: bold;">$${amount.toLocaleString()}</p>
            <p style="font-size: 16px; margin: 15px 0; opacity: 0.9;">You did it! Your dedication and smart planning paid off! 🌟</p>
          </div>
          
          <p style="font-size: 18px; margin: 25px 0;">Time to celebrate and set your next financial milestone! 🚀</p>
          
          <div style="margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL}" style="display: inline-block; background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 16px;">
              Set Your Next Goal →
            </a>
          </div>
        </div>
      </div>
    `
  }),

  weeklySummary: (data: {
    totalIncome: number;
    totalExpenses: number;
    savings: number;
    topCategory: string;
    creditUtilization: number;
  }) => ({
    subject: '📊 Your Weekly Financial Summary',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 20px; overflow: hidden;">
        <div style="padding: 40px;">
          <h1 style="margin: 0 0 30px 0; font-size: 28px; text-align: center;">📊 Weekly Summary</h1>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0;">
            <div style="background: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; text-align: center;">
              <h3 style="margin: 0 0 10px 0; font-size: 16px; opacity: 0.8;">Income</h3>
              <p style="margin: 0; font-size: 24px; font-weight: bold; color: #10b981;">$${data.totalIncome.toLocaleString()}</p>
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; text-align: center;">
              <h3 style="margin: 0 0 10px 0; font-size: 16px; opacity: 0.8;">Expenses</h3>
              <p style="margin: 0; font-size: 24px; font-weight: bold; color: #ef4444;">$${data.totalExpenses.toLocaleString()}</p>
            </div>
          </div>
          
          <div style="background: rgba(255, 255, 255, 0.15); border-radius: 15px; padding: 25px; margin: 25px 0; text-align: center;">
            <h3 style="margin: 0 0 15px 0; font-size: 18px;">💰 Net Savings</h3>
            <p style="margin: 0; font-size: 28px; font-weight: bold; color: #6366f1;">$${data.savings.toLocaleString()}</p>
          </div>
          
          <div style="margin: 25px 0;">
            <h3 style="margin: 0 0 15px 0; font-size: 18px;">📈 Key Insights</h3>
            <ul style="padding-left: 20px; font-size: 14px; line-height: 1.6;">
              <li>Top spending category: <strong>${data.topCategory}</strong></li>
              <li>Credit utilization: <strong>${data.creditUtilization}%</strong></li>
              <li>Savings rate: <strong>${((data.savings / data.totalIncome) * 100).toFixed(1)}%</strong></li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL}" style="display: inline-block; background: #10b981; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px;">
              View Full Dashboard
            </a>
          </div>
        </div>
      </div>
    `
  }),

  contactResponse: (name: string, message: string) => ({
    subject: 'Thank you for contacting us! 💬',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); color: #333; border-radius: 20px; overflow: hidden;">
        <div style="padding: 40px;">
          <h1 style="margin: 0 0 25px 0; font-size: 28px; text-align: center; color: #4a5568;">Thank You, ${name}! 🙏</h1>
          
          <div style="background: rgba(255, 255, 255, 0.8); border-radius: 15px; padding: 25px; margin: 25px 0;">
            <p style="font-size: 16px; margin: 0 0 20px 0; color: #4a5568;">We received your message:</p>
            <div style="background: #f7fafc; border-left: 4px solid #6366f1; padding: 15px; border-radius: 5px; font-style: italic; color: #2d3748;">
              "${message}"
            </div>
          </div>
          
          <p style="font-size: 16px; margin: 20px 0; color: #4a5568; text-align: center;">
            Our team will get back to you within 24 hours. In the meantime, keep crushing those financial goals! 💪
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL}" style="display: inline-block; background: #6366f1; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px;">
              Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    `
  })
};

// Send email function
export const sendEmail = async (to: string, template: { subject: string; html: string }) => {
  try {
    const transporter = createTransporter();
    
    if (!transporter) {
      return { success: false, error: 'Email service not available in client environment' };
    }
    
    const mailOptions = {
      from: `"Personal Finance Dashboard" <${process.env.EMAIL_USER}>`,
      to,
      subject: template.subject,
      html: template.html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error: any) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Bulk email function for notifications
export const sendBulkEmails = async (emails: Array<{ to: string; template: { subject: string; html: string } }>) => {
  const results = [];
  
  for (const email of emails) {
    const result = await sendEmail(email.to, email.template);
    results.push({ to: email.to, ...result });
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return results;
};

// Scheduled email functions
export const sendPaymentReminders = async () => {
  try {
    // This would typically fetch from database
    // For demo, we'll use mock data
    const dueCards = [
      { userEmail: 'user@example.com', cardName: 'Chase Sapphire', amount: 75, dueDate: '2024-02-15' }
    ];
    
    const emails = dueCards.map(card => ({
      to: card.userEmail,
      template: emailTemplates.paymentReminder(card.cardName, card.amount, card.dueDate)
    }));
    
    return await sendBulkEmails(emails);
  } catch (error) {
    console.error('Error sending payment reminders:', error);
    return { success: false, error: error.message };
  }
};

export const sendWeeklySummaries = async () => {
  try {
    // This would typically fetch from database
    // For demo, we'll use mock data
    const users = [
      {
        email: 'user@example.com',
        data: {
          totalIncome: 5200,
          totalExpenses: 4180,
          savings: 1020,
          topCategory: 'Housing',
          creditUtilization: 32.5
        }
      }
    ];
    
    const emails = users.map(user => ({
      to: user.email,
      template: emailTemplates.weeklySummary(user.data)
    }));
    
    return await sendBulkEmails(emails);
  } catch (error) {
    console.error('Error sending weekly summaries:', error);
    return { success: false, error: error.message };
  }
};
