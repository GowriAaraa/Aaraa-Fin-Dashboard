import React, { useEffect, useState } from 'react';
import { Menu, Bell, UserCircle, Database, WifiOff } from 'lucide-react';
import { checkSupabaseConnection } from '../services/dataService';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  useEffect(() => {
    checkSupabaseConnection().then((isConnected) => {
      setDbStatus(isConnected ? 'connected' : 'disconnected');
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-gray-900 font-sans selection:bg-apple-blue selection:text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <Menu className="w-6 h-6 text-gray-500" />
            </div>
            <img 
              src="https://aaraainfrastructure.com/logo.png" 
              alt="AARAA Logo" 
              className="h-8 w-auto object-contain"
              onError={(e) => {
                // Fallback if image fails
                e.currentTarget.style.display = 'none';
              }} 
            />
            <span className="hidden md:block font-semibold text-lg tracking-tight text-gray-800">
              AARAA <span className="text-gray-400 font-normal">FinDash</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* DB Status Indicator */}
            <div 
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-500 ${
                dbStatus === 'checking' ? 'bg-gray-50 border-gray-200 text-gray-500' :
                dbStatus === 'connected' ? 'bg-green-50 border-green-200 text-green-700' :
                'bg-amber-50 border-amber-200 text-amber-700'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${
                dbStatus === 'checking' ? 'bg-gray-400' :
                dbStatus === 'connected' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' :
                'bg-amber-500'
              }`} />
              {dbStatus === 'checking' && 'Connecting...'}
              {dbStatus === 'connected' && 'Supabase Live'}
              {dbStatus === 'disconnected' && 'Mock Data Mode'}
            </div>

            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-2 cursor-pointer p-1 pr-2 rounded-full hover:bg-gray-100 transition-colors">
              <UserCircle className="w-8 h-8 text-gray-400" />
              <span className="hidden md:block text-sm font-medium text-gray-700">Finance Team</span>
            </div>
          </div>
        </div>
        
        {/* Mobile Status Bar (visible only on small screens) */}
        <div className={`sm:hidden h-1 w-full ${
          dbStatus === 'checking' ? 'bg-gray-200' :
          dbStatus === 'connected' ? 'bg-green-500' :
          'bg-amber-500'
        }`} />
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};