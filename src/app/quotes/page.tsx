// app/quotes/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Quote {
  id: string;
  type: 'quote';
  number: string;
  date: string;
  clientName: string;
  total: number;
  status: string;
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const fetchQuotes = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setQuotes([
        {
          id: '1',
          type: 'quote',
          number: '8490',
          date: '2024-01-15',
          clientName: 'Gitabayu Property Services Sdn Bhd',
          total: 2500.00,
          status: 'Pending'
        },
        {
          id: '2',
          type: 'quote',
          number: '8491',
          date: '2024-01-14',
          clientName: 'Sunrise Development',
          total: 1800.50,
          status: 'Pending'
        }
      ]);
      setLoading(false);
    };

    fetchQuotes();
  }, []);

  const handleEdit = (id: string) => {
    // Navigate to editor or open modal
    console.log('Edit quote:', id);
  };

  const handlePrint = (id: string) => {
    // Print functionality
    console.log('Print quote:', id);
  };

  const handleConvertToInvoice = (id: string) => {
    // Convert quote to invoice
    console.log('Convert to invoice:', id);
  };

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Quotations</h1>
          <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="h-64 flex items-center justify-center">
            <div className="text-gray-500">Loading quotes...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quotations</h1>
        <Link
          href="/quotes/new"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-all"
        >
          <i className="fa-solid fa-plus"></i> New Quote
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Quote #</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium text-right">Amount</th>
              <th className="px-6 py-4 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {quotes.map((quote) => (
              <tr key={quote.id} className="hover:bg-gray-50 group">
                <td className="px-6 py-4">{quote.date}</td>
                <td className="px-6 py-4 font-mono text-gray-600">#{quote.number}</td>
                <td className="px-6 py-4 font-medium text-gray-800">{quote.clientName}</td>
                <td className="px-6 py-4 font-bold text-gray-700 text-right">
                  RM {quote.total.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleEdit(quote.id)}
                    className="text-blue-600 hover:underline mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handlePrint(quote.id)}
                    className="text-gray-600 hover:text-gray-900 mr-3"
                    title="Print"
                  >
                    <i className="fa-solid fa-print"></i>
                  </button>
                  <button
                    onClick={() => handleConvertToInvoice(quote.id)}
                    className="text-green-600 text-xs border border-green-200 px-2 py-1 rounded bg-green-50 hover:bg-green-100 transition-colors"
                  >
                    To Invoice
                  </button>
                </td>
              </tr>
            ))}
            {quotes.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                  No quotations found. <Link href="/quotes/new" className="text-green-600 hover:underline">Create your first quote</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}