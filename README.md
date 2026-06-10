# Personal Finance Dashboard | 

A comprehensive, modern personal finance management application built with Next.js 15, featuring AI-powered insights, beautiful animations, and complete financial tracking capabilities.

![Personal Finance Dashboard](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-6.19.0-green)

## Features

### Core Financial Management
- **Credit Card Management**: Smart debt tracking with payoff strategies (avalanche/snowball)
- **Income Tracking**: Multiple income sources with frequency management
- **Expense Categories**: Fully customizable, editable, and deletable categories
- **Goal Setting**: SMART financial goals with progress tracking and celebrations
- **Budget Management**: Dynamic budget allocation with overspending alerts

### Advanced Analytics
- **Interactive Charts**: Line charts, pie charts, bar charts, and radar charts
- **Financial Health Score**: AI-powered assessment of financial wellness
- **Trend Analysis**: Historical data visualization with predictive insights
- **Credit Utilization**: Real-time monitoring with optimization suggestions
- **Net Worth Tracking**: Comprehensive asset and liability management

### Smart Features
- **AI-Powered Suggestions**: Intelligent recommendations for debt payoff and budget optimization
- **Automated Calculations**: Interest projections, payoff timelines, and savings goals
- **Smart Alerts**: Payment reminders, budget warnings, and goal milestones
- **Financial Insights**: Personalized tips based on spending patterns

### Modern UI/UX
- **Glass Morphism Design**: Beautiful frosted glass effects throughout
- **Advanced Animations**: Framer Motion powered transitions and micro-interactions
- **Responsive Design**: Mobile-first approach with perfect desktop experience
- **Dark/Light Mode**: Automatic theme switching with custom color schemes
- **Interactive Elements**: Hover effects, loading states, and smooth transitions

### Technical Features
- **Real-time Updates**: Live data synchronization across all components
- **Offline Support**: Progressive Web App capabilities
- **Performance Optimized**: Code splitting, lazy loading, and caching strategies
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Database Integration**: MongoDB with Mongoose ODM for data persistence

## Technology Stack

### Frontend
- **Next.js 15.5.2** - React framework with App Router
- **TypeScript 5.0** - Type-safe JavaScript
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Framer Motion** - Advanced animations and gestures
- **Recharts** - Responsive chart library
- **Lucide React** - Beautiful icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling
- **Nodemailer** - Email service integration
- **JWT** - Secure authentication tokens

### Additional Libraries
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation
- **React Hot Toast** - Beautiful notifications
- **React Circular Progressbar** - Animated progress indicators
- **React CountUp** - Smooth number animations

## Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account (or local MongoDB)
- Gmail account for email features

## Features Overview

### Credit Card Management
- Add unlimited credit cards with custom names and colors
- Track balances, limits, and utilization rates
- Smart payment strategies with interest calculations
- Due date reminders and payment history
- Visual progress bars and health indicators

### Income Tracking
- Multiple income sources (salary, freelance, investments)
- Flexible frequency options (weekly, biweekly, monthly, yearly)
- Automatic monthly and yearly projections
- Income trend analysis with charts
- Goal-based income planning

### Expense Management
- Fully customizable categories with icons and colors
- Fixed vs. variable expense classification
- Budget vs. actual spending tracking
- Recurring expense automation
- Category-wise spending analysis

### Goal Setting & Tracking
- SMART goal framework implementation
- Visual progress tracking with celebrations
- Automatic contribution calculations
- Priority-based goal management
- Achievement notifications and rewards

### Analytics Dashboard
- Comprehensive financial health scoring
- Multi-chart visualization (line, bar, pie, radar)
- Trend analysis and pattern recognition
- Credit utilization monitoring
- Net worth progression tracking

### Sample Document Structures

#### User Document
```javascript
{
  _id: ObjectId,
  email: "user@example.com",
  name: "John Doe",
  preferences: {
    currency: "USD",
    theme: "dark",
    notifications: { email: true, push: true }
  },
  profile: {
    monthlyIncome: 5000,
    emergencyFundGoal: 15000,
    riskTolerance: "medium"
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Credit Cards
- `GET /api/credit-cards` - Fetch all cards
- `POST /api/credit-cards` - Create new card
- `PUT /api/credit-cards` - Update card
- `DELETE /api/credit-cards` - Delete card

### Income
- `GET /api/income/sources` - Fetch income sources
- `POST /api/income/sources` - Create income source
- `GET /api/income/records` - Fetch income records
- `POST /api/income/records` - Add income record

### Expenses
- `GET /api/expenses/categories` - Fetch categories
- `POST /api/expenses/categories` - Create category
- `GET /api/expenses` - Fetch expenses
- `POST /api/expenses` - Add expense

### Goals
- `GET /api/goals` - Fetch all goals
- `POST /api/goals` - Create new goal
- `POST /api/goals/contribute` - Add contribution

### Email
- `POST /api/email` - Send email
- `GET /api/email?type=payment-reminders` - Automated emails

## Smart Features

### AI-Powered Suggestions
The dashboard includes an intelligent suggestion system that analyzes your financial data and provides personalized recommendations:

- **Debt Payoff Optimization**: Avalanche vs. Snowball strategy recommendations
- **Budget Adjustments**: Spending category optimizations
- **Income Enhancement**: Rate increase and side hustle suggestions
- **Emergency Fund**: Prioritization based on current financial health
- **Goal Acceleration**: Timeline optimization strategies

### Automated Calculations
- **Interest Projections**: Calculate total interest over time
- **Payoff Timelines**: Determine debt-free dates
- **Savings Goals**: Monthly contribution requirements
- **Financial Health**: Comprehensive scoring algorithm
- **Credit Utilization**: Optimization recommendations

## 📧 Email Integration

### Automated Emails
- **Welcome Emails**: Beautiful onboarding experience
- **Payment Reminders**: 3 days before due dates
- **Goal Achievements**: Celebration emails with confetti
- **Weekly Summaries**: Financial performance reports
- **Contact Responses**: Instant acknowledgments

### Email Templates
All emails feature modern, responsive HTML templates with:
- Gradient backgrounds and glass morphism effects
- Mobile-optimized layouts
- Call-to-action buttons
- Personalized content
- Brand-consistent styling

## Security Features

- **Environment Variables**: Secure configuration management
- **Input Validation**: Zod schema validation
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Built-in Next.js protections
- **Rate Limiting**: API endpoint protection
- **Secure Headers**: Security-first approach

## Mobile Experience

The dashboard is fully responsive with mobile-first design:
- Touch-friendly interfaces
- Swipe gestures for navigation
- Optimized chart interactions
- Mobile-specific animations
- Progressive Web App capabilities

## Deployment

### Vercel Deployment (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically with git pushes

### Environment Variables for Production
```env
MONGO_URI=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
CRON_SECRET=
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Use TypeScript for all new code
- Follow the existing code style
- Add proper error handling
- Include responsive design
- Test on multiple devices
- Document new features

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For seamless deployment platform
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **MongoDB** - For flexible data storage
- **Lucide** - For beautiful icons


**Built w/ hardcore codes. Just for fun**

*Empowering financial freedom through beautiful, intelligent software.*
