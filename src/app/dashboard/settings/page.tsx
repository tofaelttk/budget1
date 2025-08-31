'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  User, 
  Bell, 
  Shield,
  Palette,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Globe,
  Mail,
  Smartphone,
  Lock,
  Key,
  CreditCard,
  DollarSign,
  Calendar,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    weekly: true,
    goals: true,
    bills: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Palette },
    { id: 'data', label: 'Data & Privacy', icon: Download },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl lg:text-5xl font-bold text-gradient-primary mb-4">
          Settings
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Customize your BudgetPi experience and manage your account preferences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <Card className="card-premium sticky top-8">
            <CardContent className="p-6">
              <nav className="space-y-2">
                {tabs.map((tab, index) => (
                  <motion.button
                    key={tab.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    whileHover={{ x: activeTab === tab.id ? 0 : 4 }}
                  >
                    <tab.icon className="w-5 h-5 mr-3" />
                    {tab.label}
                  </motion.button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </motion.div>

        {/* Settings Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 space-y-6"
        >
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        DU
                      </div>
                      <motion.button
                        className="absolute -bottom-2 -right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border-2 border-gray-200 dark:border-gray-700"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Upload className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </motion.button>
                    </motion.div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            First Name
                          </label>
                          <Input defaultValue="Demo" className="h-12" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Last Name
                          </label>
                          <Input defaultValue="User" className="h-12" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <Input defaultValue="demo@budgetpi.com" className="h-12" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button className="btn-primary">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-green-600" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { key: 'email', label: 'Email Notifications', description: 'Receive updates via email', icon: Mail },
                    { key: 'push', label: 'Push Notifications', description: 'Browser push notifications', icon: Bell },
                    { key: 'sms', label: 'SMS Alerts', description: 'Text message notifications', icon: Smartphone },
                    { key: 'weekly', label: 'Weekly Summary', description: 'Weekly financial summary emails', icon: Calendar },
                    { key: 'goals', label: 'Goal Achievements', description: 'Notifications when goals are reached', icon: Target },
                    { key: 'bills', label: 'Bill Reminders', description: 'Reminders for upcoming bill payments', icon: CreditCard },
                  ].map((setting, index) => (
                    <motion.div
                      key={setting.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover-lift"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <setting.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {setting.label}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {setting.description}
                          </p>
                        </div>
                      </div>
                      <motion.button
                        className={`relative w-12 h-6 rounded-full transition-all duration-200 ${
                          notifications[setting.key as keyof typeof notifications]
                            ? 'bg-green-500'
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                        onClick={() => setNotifications(prev => ({
                          ...prev,
                          [setting.key]: !prev[setting.key as keyof typeof notifications]
                        }))}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                          animate={{
                            x: notifications[setting.key as keyof typeof notifications] ? 24 : 2
                          }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </motion.button>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-600" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                      className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                          <Lock className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="font-semibold text-green-800 dark:text-green-200">
                          Change Password
                        </h3>
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                        Update your password to keep your account secure
                      </p>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Update Password
                      </Button>
                    </motion.div>

                    <motion.div 
                      className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-800"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                          <Key className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                          Two-Factor Authentication
                        </h3>
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                        Add an extra layer of security to your account
                      </p>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Enable 2FA
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'preferences' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-purple-600" />
                    App Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Theme Toggle */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        {darkMode ? <Moon className="w-5 h-5 text-purple-600" /> : <Sun className="w-5 h-5 text-purple-600" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Toggle dark/light theme</p>
                      </div>
                    </div>
                    <motion.button
                      className={`relative w-12 h-6 rounded-full transition-all duration-200 ${
                        darkMode ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                      onClick={() => setDarkMode(!darkMode)}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                        animate={{ x: darkMode ? 24 : 2 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </motion.button>
                  </div>

                  {/* Currency Settings */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Currency & Localization</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Currency
                        </label>
                        <select className="w-full h-12 px-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                          <option>USD ($)</option>
                          <option>EUR (€)</option>
                          <option>GBP (£)</option>
                          <option>CAD ($)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Language
                        </label>
                        <select className="w-full h-12 px-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'data' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-indigo-600" />
                    Data Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                      className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-800"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                          <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                          Export Data
                        </h3>
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                        Download your financial data in CSV or JSON format
                      </p>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Export Data
                      </Button>
                    </motion.div>

                    <motion.div 
                      className="p-6 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-2xl border border-red-200 dark:border-red-800"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-red-100 dark:bg-red-800 rounded-lg">
                          <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                        <h3 className="font-semibold text-red-800 dark:text-red-200">
                          Delete Account
                        </h3>
                      </div>
                      <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                        Permanently delete your account and all associated data
                      </p>
                      <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                        Delete Account
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
