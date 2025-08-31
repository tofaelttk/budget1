'use client';

import { motion } from 'framer-motion';
import { DollarSign, CreditCard, TrendingUp, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function TestDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            🎉 Dashboard Working!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-xl">
            This is a test dashboard to verify the routing is working.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium opacity-90">
                  Monthly Income
                </CardTitle>
                <DollarSign className="w-4 h-4 opacity-90" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,200</div>
              <div className="text-xs opacity-90 mt-1">+12% from last month</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium opacity-90">
                  Total Debt
                </CardTitle>
                <CreditCard className="w-4 h-4 opacity-90" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$15,750</div>
              <div className="text-xs opacity-90 mt-1">-5% from last month</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium opacity-90">
                  Cash Flow
                </CardTitle>
                <TrendingUp className="w-4 h-4 opacity-90" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$350</div>
              <div className="text-xs opacity-90 mt-1">+8% from last month</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium opacity-90">
                  Emergency Fund
                </CardTitle>
                <Target className="w-4 h-4 opacity-90" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,200</div>
              <div className="text-xs opacity-90 mt-1">+15% from last month</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">✅ Success!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                If you can see this page, it means:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>✅ Next.js routing is working properly</li>
                <li>✅ Dashboard components are loading correctly</li>
                <li>✅ Tailwind CSS styles are applied</li>
                <li>✅ Framer Motion animations are working</li>
                <li>✅ The issue is with authentication, not the dashboard itself</li>
              </ul>
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200 font-medium">
                  Next Steps:
                </p>
                <p className="text-blue-700 dark:text-blue-300 text-sm mt-2">
                  Now we need to fix the authentication flow so you can access /dashboard directly after login.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
