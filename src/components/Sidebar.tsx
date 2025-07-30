'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Settings, 
  Mail, 
  Phone, 
  FileText, 
  Clock,
  LogOut
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

interface SidebarProps {
  onLogout: () => void;
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <BarChart3 size={18} />
  },
  {
    label: 'Configuration',
    href: '/configuration',
    icon: <Settings size={18} />,
    children: [
      { label: 'End-of-Call', href: '/configuration/end-of-call', icon: <FileText size={16} /> },
      { label: 'End-of-Day', href: '/configuration/end-of-day', icon: <Clock size={16} /> }
    ]
  },
  {
    label: 'Mail Box',
    href: '/mailbox',
    icon: <Mail size={18} />,
    children: [
      { label: 'End-of-Call', href: '/mailbox/end-of-call', icon: <FileText size={16} /> },
      { label: 'End-of-Day', href: '/mailbox/end-of-day', icon: <Clock size={16} /> }
    ]
  },
  {
    label: 'Call List',
    href: '/calls',
    icon: <Phone size={18} />
  }
];

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const isChildActive = (children: NavItem[]) => {
    return children.some(child => isActive(child.href));
  };

  return (
    <div className="w-64 bg-[#1e3653] text-white h-screen fixed left-0 top-0 overflow-y-auto flex flex-col">
      <div className="p-6 flex-1">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-[#e1a730] rounded-lg flex items-center justify-center mr-3">
            <BarChart3 size={16} className="text-black" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Pulse Co-Pilot</h1>
            <p className="text-xs text-gray-300">Daily Recap</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href) || (item.children && isChildActive(item.children))
                    ? 'bg-[#e1a730] text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
              
              {item.children && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                        isActive(child.href)
                          ? 'text-[#e1a730] font-medium'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      <span className="mr-2">{child.icon}</span>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-6 border-t border-gray-600">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
        >
          <LogOut size={18} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 