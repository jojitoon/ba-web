'use client';

import { Check, Star } from 'lucide-react';
import Link from 'next/link';

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  ctaLink: string;
  popular?: boolean;
  accent?: 'primary' | 'accent';
}

export default function PricingCard({
  title,
  price,
  period,
  description,
  features,
  cta,
  ctaLink,
  popular = false,
  accent = 'primary',
}: PricingCardProps) {
  const accentColor = accent === 'primary' ? 'primary' : 'accent';
  const accentBg = accent === 'primary' ? 'bg-primary' : 'bg-accent';
  const accentText = accent === 'primary' ? 'text-primary' : 'text-accent';
  const accentBorder =
    accent === 'primary' ? 'border-primary' : 'border-accent';

  return (
    <div
      className={`relative bg-card rounded-xl p-8 metallic-border hover:metallic-glow transition-all duration-300 ${
        popular ? `${accentBorder} border-2` : ''
      }`}
    >
      {popular && (
        <div
          className={`absolute -top-4 left-1/2 transform -translate-x-1/2 ${accentBg} text-${accentColor}-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1`}
        >
          <Star className='w-4 h-4 fill-current' />
          <span>Most Popular</span>
        </div>
      )}

      <div className='text-center mb-8'>
        <h3 className='text-2xl font-bold text-foreground mb-2'>{title}</h3>
        <p className='text-foreground/70 mb-4'>{description}</p>
        <div className='mb-4'>
          <span className={`text-4xl font-bold ${accentText}`}>{price}</span>
          <span className='text-foreground/60 ml-2'>{period}</span>
        </div>
      </div>

      <ul className='space-y-4 mb-8'>
        {features.map((feature, index) => (
          <li key={index} className='flex items-start space-x-3'>
            <Check className={`w-5 h-5 ${accentText} mt-0.5 flex-shrink-0`} />
            <span className='text-foreground/80'>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={ctaLink}
        className={`w-full ${accentBg} text-${accentColor}-foreground py-3 px-6 rounded-lg font-semibold text-center block hover:opacity-90 transition-opacity`}
      >
        {cta}
      </Link>
    </div>
  );
}
