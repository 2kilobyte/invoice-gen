// app/invoices/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Invoice {
  id: string;
  type: 'invoice';
  number: string;
  date: string;
  clientName: string;
  total: number;
  status: 'Paid' | 'Unpaid';
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setInvoices([
        {
          id: '1',
          type: 'invoice',
          number: 'INV-8492',
          date: '2024-01-16',
          clientName: 'Gitabayu Property Services Sdn Bhd',
          total: 2500.00,
          status: 'Unpaid'
        },
        {
          id: '2',
          type: 'invoice',
          number: 'INV-8491',
          date: '2024-01-10',
          clientName: 'Sunrise Development',
          total: 1800.50,
          status: 'Paid'
        }
      ]);
      setLoading(false);
    };

    fetchInvoices();
  }, []);

  const togglePaymentStatus = (id: string) => {
    setInvoices(prev => prev.map(invoice => 
      invoice.id === id 
        ? { ...invoice, status: invoice.status === 'Paid' ? 'Unpaid' : 'Paid' }
        : invoice
    ));
  };

  const handlePrint = (id: string) => {
    console.log('Print invoice:', id);
  };

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Invoices</h1>
          <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="h-64 flex items-center justify-center">
            <div className="text-gray-500">Loading invoices...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Invoices</h1>
        <Link
          href="/invoices/new"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-all"
        >
          <i className="fa-solid fa-plus"></i> New Invoice
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Invoice #</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Amount</th>
              <th className="px-6 py-4 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50 group">
                <td className="px-6 py-4">{invoice.date}</td>
                <td className="px-6 py-4 font-mono text-gray-600">{invoice.number}</td>
                <td className="px-6 py-4 font-medium text-gray-800">{invoice.clientName}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => togglePaymentStatus(invoice.id)}
                    className={`cursor-pointer px-2 py-1 rounded-full text-xs font-medium ${
                      invoice.status === 'Paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {invoice.status}
                  </button>
                </td>
                <td className="px-6 py-4 font-bold text-gray-700 text-right">
                  RM {invoice.total.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handlePrint(invoice.id)}
                    className="text-gray-600 hover:text-gray-900"
                    title="Print"
                  >
                    <i className="fa-solid fa-print"></i>
                  </button>
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                  No invoices found. <Link href="/invoices/new" className="text-green-600 hover:underline">Create your first invoice</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}