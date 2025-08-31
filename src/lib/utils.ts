import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(2)}%`;
}

export function calculateInterest(principal: number, rate: number, months: number): number {
  const monthlyRate = rate / 12;
  return principal * monthlyRate * months;
}

export function calculateMinimumPayment(balance: number, rate: number): number {
  // Standard minimum payment calculation (2-3% of balance or $25, whichever is higher)
  const percentage = Math.max(balance * 0.025, 25);
  return Math.min(percentage, balance);
}

export function calculatePayoffTime(
  balance: number,
  rate: number,
  payment: number
): { months: number; totalInterest: number } {
  if (payment <= balance * (rate / 12)) {
    return { months: Infinity, totalInterest: Infinity };
  }

  const monthlyRate = rate / 12;
  let currentBalance = balance;
  let months = 0;
  let totalInterest = 0;

  while (currentBalance > 0.01) {
    const interestPayment = currentBalance * monthlyRate;
    const principalPayment = Math.min(payment - interestPayment, currentBalance);
    
    totalInterest += interestPayment;
    currentBalance -= principalPayment;
    months++;

    if (months > 600) break; // Safety check
  }

  return { months, totalInterest };
}

export function getDebtAvalancheOrder(debts: Array<{ id: string; balance: number; rate: number }>) {
  return debts.sort((a, b) => b.rate - a.rate);
}

export function getDebtSnowballOrder(debts: Array<{ id: string; balance: number; rate: number }>) {
  return debts.sort((a, b) => a.balance - b.balance);
}

export function calculateFinancialHealthScore(data: {
  totalDebt: number;
  monthlyIncome: number;
  emergencyFund: number;
  creditUtilization: number;
}): number {
  const { totalDebt, monthlyIncome, emergencyFund, creditUtilization } = data;
  
  let score = 100;
  
  // Debt-to-income ratio (30% weight)
  const debtToIncomeRatio = totalDebt / (monthlyIncome * 12);
  if (debtToIncomeRatio > 0.4) score -= 30;
  else if (debtToIncomeRatio > 0.2) score -= 15;
  
  // Emergency fund (25% weight)
  const monthsOfExpenses = emergencyFund / monthlyIncome;
  if (monthsOfExpenses < 1) score -= 25;
  else if (monthsOfExpenses < 3) score -= 15;
  else if (monthsOfExpenses < 6) score -= 5;
  
  // Credit utilization (25% weight)
  if (creditUtilization > 0.8) score -= 25;
  else if (creditUtilization > 0.5) score -= 15;
  else if (creditUtilization > 0.3) score -= 10;
  
  return Math.max(0, Math.min(100, score));
}
