'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  Video,
  Image,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  Plus,
  BarChart3,
  Mail,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

const adminNavItems = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/admin/projects',
    label: 'Projects',
    icon: Building2,
  },
  {
    href: '/admin/business-stories',
    label: 'Business Stories',
    icon: Video,
  },
  {
    href: '/admin/media',
    label: 'Media Library',
    icon: Image,
  },
  {
    href: '/admin/users',
    label: 'Users',
    icon: Users,
  },
  {
    href: '/admin/analytics',
    label: 'Analytics',
    icon: BarChart3,
  },
  {
    href: '/admin/messages',
    label: 'Messages',
    icon: Mail,
  },
  {
    href: '/admin/settings',
    label: 'Settings',
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className='min-h-screen bg-background'>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex flex-col h-full'>
          {/* Logo */}
          <div className='flex items-center justify-between p-6 border-b border-border'>
            <Link href='/admin' className='flex items-center space-x-2'>
              <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
                <Building2 className='w-5 h-5 text-primary-foreground' />
              </div>
              <span className='text-xl font-bold text-foreground'>
                Built Ancestry
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className='lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors'
            >
              <X className='w-5 h-5 text-foreground' />
            </button>
          </div>

          {/* Navigation */}
          <nav className='flex-1 p-4 space-y-2'>
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/80 hover:text-foreground hover:bg-secondary'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className='w-5 h-5' />
                  <span className='font-medium'>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className='p-4 border-t border-border'>
            <div className='flex items-center space-x-3 p-3 rounded-lg bg-secondary/50'>
              <div className='w-8 h-8 bg-primary rounded-full flex items-center justify-center'>
                <span className='text-sm font-semibold text-primary-foreground'>
                  A
                </span>
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-foreground truncate'>
                  Admin User
                </p>
                <p className='text-xs text-foreground/60 truncate'>
                  admin@builtancestry.com
                </p>
              </div>
              <button
                onClick={logout}
                className='p-2 rounded-lg hover:bg-secondary transition-colors'
                title='Logout'
              >
                <LogOut className='w-4 h-4 text-foreground/60' />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className='lg:pl-64'>
        {/* Top bar */}
        <header className='sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border'>
          <div className='flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16'>
            <button
              onClick={() => setSidebarOpen(true)}
              className='lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors'
            >
              <Menu className='w-6 h-6 text-foreground' />
            </button>

            <div className='flex items-center space-x-4'>
              <Link
                href='/'
                className='text-sm text-foreground/60 hover:text-foreground transition-colors'
              >
                View Site
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className='p-4 sm:p-6 lg:p-8'>{children}</main>
      </div>
    </div>
  );
}
