'use client';

import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  itemName: string;
  isLoading?: boolean;
}

export default function DeleteConfirmation({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  itemName,
  isLoading = false,
}: DeleteConfirmationProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-background/80 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='relative bg-card rounded-xl p-6 max-w-md w-full mx-4 metallic-border'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center space-x-3'>
            <div className='w-10 h-10 bg-destructive/20 rounded-full flex items-center justify-center'>
              <AlertTriangle className='w-5 h-5 text-destructive' />
            </div>
            <h3 className='text-lg font-semibold text-foreground'>{title}</h3>
          </div>
          <button
            onClick={onClose}
            className='p-1 rounded-lg hover:bg-secondary transition-colors'
            disabled={isLoading}
          >
            <X className='w-5 h-5 text-foreground/60' />
          </button>
        </div>

        <div className='mb-6'>
          <p className='text-foreground/70 mb-2'>{description}</p>
          <div className='bg-destructive/10 border border-destructive/20 rounded-lg p-3'>
            <p className='text-sm font-medium text-destructive'>"{itemName}"</p>
          </div>
        </div>

        <div className='flex items-center justify-end space-x-3'>
          <button
            onClick={onClose}
            disabled={isLoading}
            className='px-4 py-2 text-foreground/70 hover:text-foreground transition-colors disabled:opacity-50'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className='px-4 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2'
          >
            {isLoading && (
              <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-destructive-foreground' />
            )}
            <span>{isLoading ? 'Deleting...' : 'Delete'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
