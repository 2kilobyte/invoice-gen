// components/Sidebar.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen = true, onClose }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeView, setActiveView] = useState('dashboard');

  useEffect(() => {
    // Extract current view from pathname
    const currentView = pathname.split('/').pop() || 'dashboard';
    setActiveView(currentView);
  }, [pathname]);

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'chart-pie',
      href: '/dashboard'
    },
    {
      id: 'quotes',
      label: 'Quotations',
      icon: 'file-invoice-dollar',
      href: '/quotes'
    },
    {
      id: 'invoices',
      label: 'Invoices',
      icon: 'file-invoice-dollar',
      href: '/invoices'
    },
    {
      id: 'expenses',
      label: 'Expenses',
      icon: 'receipt',
      href: '/expenses'
    },
    {
      id: 'clients',
      label: 'Clients',
      icon: 'users',
      href: '/clients'
    },
  ];

  const handleNavigation = (href: string, viewId: string) => {
    setActiveView(viewId);
    router.push(href);
    if (onClose) onClose();
  };

  const isActive = (viewId: string) => activeView === viewId;

  return (
    <>
      {/* Mobile overlay */}
      {!isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white border-r border-gray-200 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-2 text-green-700 font-bold text-2xl">
            <i className="fa-solid fa-leaf"></i>
            <span>elecotrim</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.href, item.id)}
                  className={`
                    nav-item w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                    ${isActive(item.id)
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                    }
                  `}
                >
                  <i className={`fa-solid fa-${item.icon} w-5`}></i>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Settings */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => handleNavigation('/settings', 'settings')}
            className={`
              flex items-center gap-3 text-sm transition-colors w-full
              ${isActive('settings')
                ? 'text-green-600'
                : 'text-gray-500 hover:text-green-600'
              }
            `}
          >
            <i className="fa-solid fa-gear"></i>
            Settings
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;