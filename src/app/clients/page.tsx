// app/clients/page.tsx
'use client';

import { useState, useEffect } from 'react';

interface Client {
  id: number;
  name: string;
  custId: string;
  address: string;
  phone: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    custId: '',
    address: '',
    phone: ''
  });

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setClients([
        {
          id: 1,
          name: 'Gitabayu Property Services Sdn Bhd',
          custId: '93385',
          address: '2, Jalan Bayu 1, Bukit Gita Bayu, 43300 Seri Kembangan',
          phone: '+60 3-1234 5678'
        }
      ]);
      setLoading(false);
    };

    fetchClients();
  }, []);

  const handleSaveClient = () => {
    const newClient: Client = {
      id: Date.now(),
      name: formData.name,
      custId: formData.custId,
      address: formData.address,
      phone: formData.phone
    };

    setClients(prev => [...prev, newClient]);
    setShowModal(false);
    setFormData({
      name: '',
      custId: '',
      address: '',
      phone: ''
    });
  };

  const handleDeleteClient = (id: number) => {
    if (confirm('Delete this client?')) {
      setClients(prev => prev.filter(client => client.id !== id));
    }
  };

  const handleCreateQuote = (clientId: number) => {
    // Navigate to quote creation with client pre-selected
    console.log('Create quote for client:', clientId);
  };

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Clients</h1>
          <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Clients</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-all"
        >
          <i className="fa-solid fa-plus"></i> Add Client
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div key={client.id} className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm relative group hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-800 text-lg mb-2">{client.name}</h3>
            {client.custId && (
              <p className="text-sm text-gray-500 mb-2">ID: {client.custId}</p>
            )}
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{client.address}</p>
            {client.phone && (
              <p className="text-sm text-gray-500 mb-3">{client.phone}</p>
            )}
            
            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
              <button
                onClick={() => handleCreateQuote(client.id)}
                className="text-green-600 hover:text-green-700 text-sm font-medium cursor-pointer transition-colors"
              >
                New Quote
              </button>
              <button 
                onClick={() => handleDeleteClient(client.id)}
                className="text-red-400 hover:text-red-600 transition-colors"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
        
        {clients.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-4">
              <i className="fa-solid fa-users text-4xl mb-3"></i>
              <p className="text-lg">No clients found</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Add your first client
            </button>
          </div>
        )}
      </div>

      {/* Client Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">Add Client</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company / Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="Client name or company"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer ID (Optional)</label>
                <input
                  type="text"
                  value={formData.custId}
                  onChange={(e) => setFormData(prev => ({ ...prev, custId: e.target.value }))}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="e.g. 93385"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="Client full address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="Phone number"
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
                onClick={handleSaveClient}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Save Client
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}