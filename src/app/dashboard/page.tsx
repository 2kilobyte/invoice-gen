// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';

interface DashboardData {
  netProfit: number;
  revenue: number;
  expenses: number;
  pending: number;
  quotes: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({
    netProfit: 0,
    revenue: 0,
    expenses: 0,
    pending: 0,
    quotes: 0,
  });

  useEffect(() => {
    // Fetch dashboard data
    // This would typically come from an API
    const fetchData = async () => {
      // Mock data for demonstration
      setData({
        netProfit: 12500.75,
        revenue: 45000.50,
        expenses: 32500.25,
        pending: 15000.00,
        quotes: 8,
      });
    };

    fetchData();
  }, []);

  const formatCurrency = (amount: number) => {
    return `RM ${amount.toLocaleString()}`;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Financial Overview</h1>
          <p className="text-gray-500">Track your business performance.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Net Profit (Income - Expense)</p>
          <h2 className={`text-3xl font-bold ${
            data.netProfit >= 0 ? 'text-green-700' : 'text-red-600'
          }`}>
            {formatCurrency(data.netProfit)}
          </h2>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Revenue (Paid)</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">
            {formatCurrency(data.revenue)}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Expenses</p>
          <h3 className="text-2xl font-bold text-red-600 mt-2">
            {formatCurrency(data.expenses)}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Pending Invoices</p>
          <h3 className="text-2xl font-bold text-orange-600 mt-2">
            {formatCurrency(data.pending)}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Active Quotes</p>
          <h3 className="text-2xl font-bold text-blue-600 mt-2">
            {data.quotes}
          </h3>
        </div>
      </div>

      {/* Rest of your dashboard content */}
    </div>
  );
}