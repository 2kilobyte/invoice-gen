// app/settings/page.tsx
'use client';

import { useState, useEffect } from 'react';

interface Settings {
  companyName: string;
  bankDetails: string;
  terms: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    companyName: 'Eco Trim Enterprise',
    bankDetails: 'MAYBANK: 564762369335',
    terms: 'Quote valid for 30 days.\n50% deposit secures booking.\nBalance due upon completion.'
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load settings from localStorage or API
    const savedSettings = localStorage.getItem('ecotrim_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    // Save to localStorage or API
    localStorage.setItem('ecotrim_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (field: keyof Settings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Business Settings</h1>
      
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={settings.companyName}
            onChange={(e) => handleChange('companyName', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bank Details (Appears on Invoice)
          </label>
          <textarea
            value={settings.bankDetails}
            onChange={(e) => handleChange('bankDetails', e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Terms & Conditions
          </label>
          <textarea
            value={settings.terms}
            onChange={(e) => handleChange('terms', e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none transition-colors"
            placeholder="Enter terms and conditions, one per line"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            onClick={handleSave}
            className="bg-gray-900 text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <i className="fa-solid fa-floppy-disk"></i>
            Save Changes
          </button>
          
          {saved && (
            <span className="text-green-600 flex items-center gap-2">
              <i className="fa-solid fa-check"></i>
              Settings saved successfully!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}