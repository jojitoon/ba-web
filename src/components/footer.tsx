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
    <footer className='bg-secondary/30 border-t border-border'>
      <div className='max-w-[1920px] mx-auto px-6 lg:px-12 py-16 lg:py-20'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16'>
            {/* Company Info */}
            <div className='lg:col-span-1'>
              <div className='flex items-center space-x-3 mb-6'>
                <div className='w-10 h-10 bg-foreground rounded-sm flex items-center justify-center'>
                  <Building2 className='w-6 h-6 text-background' />
                </div>
                <div className='flex flex-col'>
                  <span className='text-lg font-serif font-bold text-foreground tracking-tight leading-none'>
                    Built Ancestry
                  </span>
                  <span className='text-[10px] text-muted-foreground uppercase tracking-wider font-medium'>
                    Legacy Documentation
                  </span>
                </div>
              </div>
              <p className='editorial-text text-foreground/70 mb-8 leading-relaxed'>
                Preserving legacies in construction and business through
                innovative documentation, immersive visuals, and compelling
                storytelling.
              </p>
              <div className='flex space-x-4'>
                <a
                  href='https://www.facebook.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-foreground/50 hover:text-foreground transition-colors'
                >
                  <Facebook className='w-5 h-5' />
                </a>
                <a
                  href='https://twitter.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-foreground/50 hover:text-foreground transition-colors'
                >
                  <Twitter className='w-5 h-5' />
                </a>
                <a
                  href='https://instagram.com/builtancestry'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-foreground/50 hover:text-foreground transition-colors'
                >
                  <Instagram className='w-5 h-5' />
                </a>
                <a
                  href='https://www.linkedin.com/company/builtancestry'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-foreground/50 hover:text-foreground transition-colors'
                >
                  <Linkedin className='w-5 h-5' />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className='text-sm font-semibold text-foreground mb-6 uppercase tracking-wider'>
                Quick Links
              </h3>
              <ul className='space-y-4'>
                <li>
                  <Link
                    href='/'
                    className='text-foreground/70 hover:text-foreground transition-colors text-sm'
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href='/projects'
                    className='text-foreground/70 hover:text-foreground transition-colors text-sm'
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href='/business-stories'
                    className='text-foreground/70 hover:text-foreground transition-colors text-sm'
                  >
                    Business Stories
                  </Link>
                </li>
                <li>
                  <Link
                    href='/about'
                    className='text-foreground/70 hover:text-foreground transition-colors text-sm'
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className='text-sm font-semibold text-foreground mb-6 uppercase tracking-wider'>
                Services
              </h3>
              <ul className='space-y-4'>
                <li>
                  <Link
                    href='/for-businesses'
                    className='text-foreground/70 hover:text-foreground transition-colors text-sm'
                  >
                    For Businesses
                  </Link>
                </li>
                <li>
                  <Link
                    href='/for-construction'
                    className='text-foreground/70 hover:text-foreground transition-colors text-sm'
                  >
                    For Construction
                  </Link>
                </li>
                <li>
                  <Link
                    href='/contact'
                    className='text-foreground/70 hover:text-foreground transition-colors text-sm'
                  >
                    Get Started
                  </Link>
                </li>
                {/* <li>
                  <Link
                    href="/pricing"
                    className="text-foreground/70 hover:text-foreground transition-colors text-sm"
                  >
                    Pricing
                  </Link>
                </li> */}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className='text-sm font-semibold text-foreground mb-6 uppercase tracking-wider'>
                Contact
              </h3>
              <ul className='space-y-4'>
                <li className='flex items-start space-x-3 text-foreground/70 text-sm'>
                  <Mail className='w-4 h-4 text-foreground/50 mt-0.5 flex-shrink-0' />
                  <a
                    href='mailto:builtAncestry@gmail.com'
                    className='hover:text-foreground transition-colors'
                  >
                    builtAncestry@gmail.com
                  </a>
                </li>
                <li className='flex items-start space-x-3 text-foreground/70 text-sm'>
                  <Phone className='w-4 h-4 text-foreground/50 mt-0.5 flex-shrink-0' />
                  <a
                    href='tel:+13476799566'
                    className='hover:text-foreground transition-colors'
                  >
                    347-679-9566
                  </a>
                </li>
                <li className='flex items-start space-x-3 text-foreground/70 text-sm'>
                  <MapPin className='w-4 h-4 text-foreground/50 mt-0.5 flex-shrink-0' />
                  <span>New York, NY</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className='border-t border-border pt-8'>
            <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
              <div className='text-foreground/50 text-sm text-center md:text-left'>
                © 2025 Built Ancestry. All rights reserved.
              </div>
              <div className='flex flex-wrap justify-center md:justify-end space-x-6 text-sm'>
                <Link
                  href='/privacy'
                  className='text-foreground/50 hover:text-foreground transition-colors'
                >
                  Privacy Policy
                </Link>
                <Link
                  href='/terms'
                  className='text-foreground/50 hover:text-foreground transition-colors'
                >
                  Terms of Service
                </Link>
                <Link
                  href='/cookies'
                  className='text-foreground/50 hover:text-foreground transition-colors'
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
