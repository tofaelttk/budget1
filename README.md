# 💰 Personal Finance Dashboard - BudgetPi

A comprehensive personal finance management web application built with modern technologies, featuring beautiful animations, smart calculations, and intuitive design.

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-38B2AC)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11.0-purple)

## 🌟 Features

### ✅ Completed Features

#### 🔐 **Authentication System**
- JWT-based secure authentication
- Beautiful animated login/register forms
- HTTP-only cookies for security
- Protected routes with middleware

#### 💳 **Credit Card Management**
- **Visual Card Interface**: Beautiful gradient cards with real-time data
- **Payment Strategies**: Choose between minimum payments or percentage-based
- **Smart Calculations**: Automatic payoff timeline and interest calculations
- **Utilization Tracking**: Visual progress bars with color-coded alerts
- **CRUD Operations**: Add, edit, delete cards with smooth animations

#### 📊 **Interactive Dashboard**
- **Key Metrics**: Income, debt, cash flow, emergency fund tracking
- **Responsive Design**: Mobile-first approach with collapsible sidebar
- **Real-time Updates**: Live calculations as you input data
- **Smart Alerts**: High utilization warnings and financial tips
- **Beautiful Animations**: Staggered loading, hover effects, and transitions

#### 🎨 **Modern UI/UX**
- **Design System**: Custom Tailwind configuration with CSS variables
- **Dark Mode**: Complete light/dark theme support
- **Animations**: Framer Motion for smooth page transitions
- **Responsive**: Works perfectly on all device sizes
- **Accessibility**: ARIA labels and keyboard navigation support

### 🚧 Upcoming Features

#### 💰 **Income Management**
- Weekly income tracking (every Friday)
- Multiple income sources support
- Year-to-date calculations
- Income visualization charts

#### 📈 **Expense Categories**
- **Fixed Expenses**: Tuition, family support, subscriptions
- **Variable Expenses**: Food, transportation, entertainment
- **Smart Categorization**: Auto-categorize transactions
- **Budget vs. Actual**: Track spending against budgets

#### 🎯 **Financial Goals**
- **SMART Goals**: Specific, measurable financial targets
- **Progress Tracking**: Visual progress with milestone celebrations
- **Goal Categories**: Emergency fund, debt payoff, savings
- **Achievement Badges**: Gamification elements

#### 🧠 **Smart Features**
- **Debt Strategies**: Avalanche vs. Snowball recommendations
- **Financial Health Score**: Overall wellness rating
- **Payment Optimization**: Optimal payment timing suggestions
- **Budget Analysis**: Cash flow analysis and recommendations

#### 📧 **Email Integration**
- **Welcome Emails**: Personalized onboarding
- **Payment Reminders**: Automated due date notifications
- **Goal Celebrations**: Achievement milestone emails
- **Weekly Summaries**: Financial overview every Friday

## 🚀 Tech Stack

### Frontend
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Recharts** - Chart visualization library
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### Development
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Git** - Version control

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tofaelttk/budget-sigmapointpi.git
   cd budget-sigmapointpi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── cards/         # Credit card CRUD operations
│   ├── dashboard/         # Protected dashboard pages
│   │   ├── cards/         # Credit card management
│   │   └── layout.tsx     # Dashboard layout
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   └── ui/               # Base UI components
├── lib/                  # Utility functions
│   ├── auth.ts           # Authentication utilities
│   ├── db.ts             # Database connection
│   └── utils.ts          # Helper functions
├── models/               # Mongoose schemas
│   ├── User.ts           # User model
│   ├── CreditCard.ts     # Credit card model
│   ├── Income.ts         # Income model
│   ├── Expense.ts        # Expense model
│   └── Goal.ts           # Goal model
└── middleware.ts         # Route protection middleware
```

## 🎯 Key Features Showcase

### Credit Card Management
- **Visual Cards**: Beautiful gradient cards showing balance, limit, and utilization
- **Payment Calculator**: Real-time payoff timeline calculations
- **Smart Alerts**: Warnings for high utilization rates
- **Strategy Comparison**: Choose between minimum payments or percentage-based

### Dashboard Analytics
- **Financial Overview**: Key metrics at a glance
- **Progress Tracking**: Visual progress bars for goals and debt reduction
- **Recent Activity**: Transaction history with categorization
- **Smart Insights**: Personalized financial recommendations

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Adaptive Layout**: Sidebar collapses on smaller screens
- **Touch-Friendly**: Large tap targets and smooth gestures
- **Cross-Platform**: Works on all modern browsers

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **HTTP-Only Cookies**: Prevents XSS attacks
- **Route Protection**: Middleware-based route guarding
- **Input Validation**: Server-side validation for all inputs
- **Password Hashing**: bcrypt for secure password storage

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#3B82F6 to #1E40AF)
- **Success**: Green (#10B981)
- **Warning**: Orange (#F59E0B)
- **Danger**: Red (#EF4444)
- **Neutral**: Gray scale with dark mode support

### Typography
- **Headings**: Inter font family, various weights
- **Body**: System font stack for optimal performance
- **Code**: Monospace for technical content

### Animations
- **Page Transitions**: Smooth fade and slide effects
- **Loading States**: Skeleton loaders and spinners
- **Hover Effects**: Subtle scale and color transitions
- **Progress Animations**: Smooth progress bar fills

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy with automatic CI/CD

### AWS
1. Build the application: `npm run build`
2. Deploy to EC2 with CloudFront
3. Configure Route 53 for custom domain

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **MongoDB** - For the flexible database solution
- **Vercel** - For seamless deployment platform

## 📞 Support

For support, email contact@sigmapointpi.com or create an issue in the GitHub repository.

## 🌟 Show Your Support

If you like this project, please give it a ⭐ on GitHub!

---

**Built with ❤️ by the SigmaPointPi Team**

Visit us at: [budget.sigmapointpi.com](https://budget.sigmapointpi.com)