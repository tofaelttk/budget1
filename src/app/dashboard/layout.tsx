'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  CreditCard, 
  DollarSign, 
  PieChart, 
  Target, 
  Settings, 
  LogOut,
  Menu,
  X,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Credit Cards', href: '/dashboard/cards', icon: CreditCard },
  { name: 'Income', href: '/dashboard/income', icon: DollarSign },
  { name: 'Expenses', href: '/dashboard/expenses', icon: PieChart },
  { name: 'Goals', href: '/dashboard/goals', icon: Target },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Skip authentication for now - set default user
    console.log('🚀 Dashboard layout loading without authentication...');
    
    // Set a default user for development
    setUser({ email: 'demo@budgetpi.com', name: 'Demo User' });
    setIsLoading(false);
  }, [router]);

  const handleLogout = async () => {
    // For now, just redirect to login page
    console.log('🔄 Logout clicked - redirecting to login...');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : -320,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 w-80 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-200/50 dark:border-gray-700/50"
      >
        <div className="flex flex-col h-full">
          {/* Logo and close button */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200/50 dark:border-gray-700/50">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg animate-glow">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                BudgetPi
              </h1>
            </motion.div>
            <motion.button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setSidebarOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6 text-gray-400" />
            </motion.button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="group flex items-center px-4 py-3 text-sm font-medium rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 hover-lift"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <motion.div
                      className="mr-3 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-indigo-500 group-hover:text-white transition-all duration-200"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.div>
                    <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.name}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* User section */}
          <motion.div 
            className="p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div 
              className="flex items-center mb-4 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <User className="w-6 h-6 text-white" />
              </motion.div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {user.name || 'Demo User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            </motion.div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="lg:pl-80 relative">
        {/* Top bar */}
        <motion.div 
          className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 lg:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between h-16 px-4">
            <motion.button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="w-6 h-6" />
            </motion.button>
            <motion.h1 
              className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Dashboard
            </motion.h1>
            <div className="w-6" /> {/* Spacer */}
          </div>
        </motion.div>

        {/* Page content */}
        <motion.main 
          className="relative z-10 container-custom py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
