import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    MONGO_URI: process.env.MONGO_URI || 'mongodb+srv://hossainmdtofael1:HossainMdTofael1%2F2@cluster0.2ijeh.mongodb.net/BudgetApp?retryWrites=true&w=majority&appName=Cluster0',
    JWT_SECRET: process.env.JWT_SECRET || 'HossainMdTofael1/2',
    EMAIL_USER: process.env.EMAIL_USER || 'contactelitetriangle@gmail.com',
    EMAIL_PASS: process.env.EMAIL_PASS || 'hhnn rihr ehyl vkmm',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'HossainMdTofael1/2Budget',
  },
  serverExternalPackages: ['mongoose'],
}

export default nextConfig