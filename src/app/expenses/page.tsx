// app/expenses/page.tsx
'use client';

import { useState, useEffect } from 'react';

interface Expense {
  id: number;
  date: string;
  desc: string;
  category: string;
  amount: number;
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    desc: '',
    category: 'Fuel',
    amount: ''
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setExpenses([
        {
          id: 1,
          date: '2024-01-16',
          desc: 'Diesel for lorry',
          category: 'Fuel',
          amount: 200.00
        },
        {
          id: 2,
          date: '2024-01-15',
          desc: 'Tree disposal fees',
          category: 'Disposal',
          amount: 150.00
        }
      ]);
      setLoading(false);
    };

    fetchExpenses();
  }, []);

  const handleSaveExpense = () => {
    const newExpense: Expense = {
      id: Date.now(),
      date: formData.date,
      desc: formData.desc,
      category: formData.category,
      amount: parseFloat(formData.amount) || 0
    };

    setExpenses(prev => [newExpense, ...prev]);
    setShowModal(false);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      desc: '',
      category: 'Fuel',
      amount: ''
    });
  };

  const handleDeleteExpense = (id: number) => {
    if (confirm('Delete this expense?')) {
      setExpenses(prev => prev.filter(expense => expense.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
          <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="h-64 flex items-center justify-center">
            <div className="text-gray-500">Loading expenses...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-all"
        >
          <i className="fa-solid fa-plus"></i> Record Expense
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium text-right">Amount</th>
              <th className="px-6 py-4 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{expense.date}</td>
                <td className="px-6 py-4">{expense.desc}</td>
                <td className="px-6 py-4">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {expense.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-red-600 font-medium">
                  RM {expense.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-center">
                  <button 
                    onClick={() => handleDeleteExpense(expense.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No expenses recorded.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Expense Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">Record Expense</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={formData.desc}
                  onChange={(e) => setFormData(prev => ({ ...prev, desc: e.target.value }))}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="e.g. Fuel for Lorry"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="Fuel">Fuel</option>
                  <option value="Wages">Wages</option>
                  <option value="Materials">Materials</option>
                  <option value="Tools">Tools/Machinery</option>
                  <option value="Food">Food/Drinks</option>
                  <option value="Disposal">Disposal Fees</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount (RM)</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveExpense}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Save Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}