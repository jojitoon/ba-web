'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const success = await login(password);
    if (success) {
      router.push('/admin');
    } else {
      setError('Invalid password. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Logo */}
        <div className='text-center mb-8'>
          <div className='w-16 h-16 relative mx-auto mb-4'>
            <Image
              src='/logo.png'
              alt='Built Ancestry Logo'
              fill
              className='object-contain'
              unoptimized
            />
          </div>
          <h1 className='text-2xl font-bold text-foreground'>Built Ancestry</h1>
          <p className='text-foreground/60 mt-1'>Admin Portal</p>
        </div>

        {/* Login Form */}
        <div className='bg-card rounded-2xl p-8 metallic-border'>
          <div className='text-center mb-6'>
            <h2 className='text-xl font-semibold text-foreground mb-2'>
              Sign in to Admin
            </h2>
            <p className='text-foreground/60'>
              Enter your admin password to access the dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-foreground mb-2'
              >
                Admin Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='h-5 w-5 text-foreground/40' />
                </div>
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='block w-full pl-10 pr-12 py-3 bg-background border border-border rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  placeholder='Enter admin password'
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5 text-foreground/40 hover:text-foreground/60' />
                  ) : (
                    <Eye className='h-5 w-5 text-foreground/40 hover:text-foreground/60' />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-3'>
                <p className='text-sm text-red-500'>{error}</p>
              </div>
            )}

            <button
              type='submit'
              disabled={isLoading || !password}
              className='w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2'
            >
              {isLoading ? (
                <>
                  <div className='w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin' />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-xs text-foreground/50'>
              For security, this session will expire after 24 hours
            </p>
          </div>
        </div>

        {/* Back to Site */}
        <div className='text-center mt-6'>
          <a
            href='/'
            className='text-sm text-foreground/60 hover:text-foreground transition-colors'
          >
            ← Back to main site
          </a>
        </div>
      </div>
    </div>
  );
}
