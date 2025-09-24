'use client';

import Link from 'next/link';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-card border-t border-border'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
          {/* Company Info */}
          <div className='lg:col-span-1'>
            <div className='flex items-center space-x-2 mb-4'>
              <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
                <Building2 className='w-5 h-5 text-primary-foreground' />
              </div>
              <span className='text-xl font-bold text-foreground'>
                Built Ancestry
              </span>
            </div>
            <p className='text-sm sm:text-base text-foreground/70 mb-6 leading-relaxed'>
              Preserving legacies in construction and business through
              innovative documentation, immersive visuals, and compelling
              storytelling.
            </p>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='text-foreground/60 hover:text-primary transition-colors'
              >
                <Facebook className='w-5 h-5' />
              </a>
              <a
                href='#'
                className='text-foreground/60 hover:text-primary transition-colors'
              >
                <Twitter className='w-5 h-5' />
              </a>
              <a
                href='#'
                className='text-foreground/60 hover:text-primary transition-colors'
              >
                <Instagram className='w-5 h-5' />
              </a>
              <a
                href='#'
                className='text-foreground/60 hover:text-primary transition-colors'
              >
                <Linkedin className='w-5 h-5' />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-lg font-semibold text-foreground mb-4'>
              Quick Links
            </h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/'
                  className='text-foreground/70 hover:text-primary transition-colors'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/projects'
                  className='text-foreground/70 hover:text-primary transition-colors'
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href='/business-stories'
                  className='text-foreground/70 hover:text-primary transition-colors'
                >
                  Business Stories
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='text-foreground/70 hover:text-primary transition-colors'
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className='text-lg font-semibold text-foreground mb-4'>
              Services
            </h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/for-businesses'
                  className='text-foreground/70 hover:text-primary transition-colors'
                >
                  For Businesses
                </Link>
              </li>
              <li>
                <Link
                  href='/for-construction'
                  className='text-foreground/70 hover:text-primary transition-colors'
                >
                  For Construction
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-foreground/70 hover:text-primary transition-colors'
                >
                  Get Started
                </Link>
              </li>
              <li>
                <Link
                  href='/pricing'
                  className='text-foreground/70 hover:text-primary transition-colors'
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-lg font-semibold text-foreground mb-4'>
              Contact
            </h3>
            <ul className='space-y-3'>
              <li className='flex items-center space-x-3 text-foreground/70'>
                <Mail className='w-4 h-4 text-primary' />
                <span>hello@builtancestry.com</span>
              </li>
              <li className='flex items-center space-x-3 text-foreground/70'>
                <Phone className='w-4 h-4 text-primary' />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className='flex items-center space-x-3 text-foreground/70'>
                <MapPin className='w-4 h-4 text-primary' />
                <span>New York, NY</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-border mt-8 sm:mt-12 pt-6 sm:pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <div className='text-foreground/60 text-sm text-center md:text-left'>
              © 2025 Built Ancestry. All rights reserved.
            </div>
            <div className='flex flex-wrap justify-center md:justify-end space-x-4 sm:space-x-6 text-sm'>
              <Link
                href='/privacy'
                className='text-foreground/60 hover:text-primary transition-colors'
              >
                Privacy Policy
              </Link>
              <Link
                href='/terms'
                className='text-foreground/60 hover:text-primary transition-colors'
              >
                Terms of Service
              </Link>
              <Link
                href='/cookies'
                className='text-foreground/60 hover:text-primary transition-colors'
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
