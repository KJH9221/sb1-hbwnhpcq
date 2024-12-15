import React from 'react';
import { DollarSign, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import type { FinanceStats } from '../types/finance';

interface DashboardProps {
  stats: FinanceStats;
}

export function Dashboard({ stats }: DashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">총 수입</p>
            <p className="text-2xl font-bold text-green-600">
              ₩{stats.totalIncome.toLocaleString()}
            </p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <TrendingUp className="text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">총 지출</p>
            <p className="text-2xl font-bold text-red-600">
              ₩{stats.totalExpense.toLocaleString()}
            </p>
          </div>
          <div className="bg-red-100 p-3 rounded-full">
            <TrendingDown className="text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">현재 잔액</p>
            <p className="text-2xl font-bold text-blue-600">
              ₩{stats.balance.toLocaleString()}
            </p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <Wallet className="text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
}