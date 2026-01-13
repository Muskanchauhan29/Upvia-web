"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, User } from "lucide-react";

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  
  return (
    <div className="h-screen flex bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Fixed Sidebar */}
      <aside className="hidden md:flex w-64 bg-gradient-to-r from-purple-600 to-purple-800 flex-col">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center">
            <span className="text-2xl font-bold text-white">UPVIA</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 pb-4">
          <ul className="space-y-2">
            <li>
              <Link 
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  pathname === "/dashboard" 
                    ? "bg-white/20 text-white backdrop-blur-sm" 
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`} 
                href="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  pathname === "/dashboard/resume" 
                    ? "bg-white/20 text-white backdrop-blur-sm" 
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`} 
                href="/dashboard/resume"
              >
                Resume
              </Link>
            </li>
            <li>
              <Link 
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  pathname === "/dashboard/jobs" 
                    ? "bg-white/20 text-white backdrop-blur-sm" 
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`} 
                href="/dashboard/jobs"
              >
                Job Recommendations
              </Link>
            </li>
            <li>
              <Link 
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  pathname === "/dashboard/applied" 
                    ? "bg-white/20 text-white backdrop-blur-sm" 
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`} 
                href="/dashboard/applied"
              >
                Applied Jobs
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-white/20">
          <ul className="space-y-2">
            <li>
              <Link 
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  pathname === "/dashboard/settings" 
                    ? "bg-white/20 text-white backdrop-blur-sm" 
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`} 
                href="/dashboard/settings"
              >
                Settings
              </Link>
            </li>
            <li>
              <Link 
                className="flex items-center px-4 py-2 text-sm font-medium text-white/80 rounded-lg hover:bg-white/10 hover:text-white transition-all" 
                href="/"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white/70 backdrop-blur-md border-b border-white/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1 max-w-xl">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, or keywords..."
                  className="w-full pl-10 pr-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4 ml-6">
              <button className="relative p-2 text-gray-600 hover:bg-white/50 backdrop-blur-sm rounded-lg transition-all">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-chart-1 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-linear-to-r from-chart-1 to-chart-1/80 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">John Doe</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar (Hidden for now) */}
      <aside className="md:hidden fixed inset-0 z-50 hidden">
        {/* Mobile sidebar implementation if needed */}
      </aside>
    </div>
  );
}
