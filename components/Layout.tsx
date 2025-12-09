import React from 'react';
import { Menu, Bell, UserCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
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
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-2 cursor-pointer p-1 pr-2 rounded-full hover:bg-gray-100 transition-colors">
              <UserCircle className="w-8 h-8 text-gray-400" />
              <span className="hidden sm:block text-sm font-medium text-gray-700">Finance Team</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};