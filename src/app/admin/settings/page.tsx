'use client';

import { useState } from 'react';
import {
  Settings,
  Save,
  Eye,
  EyeOff,
  Bell,
  Shield,
  Database,
  Trash2,
  Download,
  Upload,
} from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'backup', label: 'Backup & Export', icon: Database },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Show success message
  };

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-foreground'>Settings</h1>
          <p className='text-foreground/70 mt-1'>
            Manage your application settings and preferences.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className='bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2 disabled:opacity-50'
        >
          <Save className='w-5 h-5' />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
        {/* Sidebar */}
        <div className='lg:col-span-1'>
          <div className='bg-card rounded-xl p-4 metallic-border'>
            <nav className='space-y-2'>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground/80 hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    <Icon className='w-5 h-5' />
                    <span className='font-medium'>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className='lg:col-span-3'>
          <div className='bg-card rounded-xl p-6 metallic-border'>
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className='space-y-6'>
                <h2 className='text-xl font-bold text-foreground'>
                  General Settings
                </h2>

                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-foreground mb-2'>
                      Site Name
                    </label>
                    <input
                      type='text'
                      defaultValue='Built Ancestry'
                      className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-foreground mb-2'>
                      Site Description
                    </label>
                    <textarea
                      defaultValue='Preserving Legacies in Construction & Business'
                      rows={3}
                      className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-foreground mb-2'>
                      Contact Email
                    </label>
                    <input
                      type='email'
                      defaultValue='admin@builtancestry.com'
                      className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-foreground mb-2'>
                      Default Language
                    </label>
                    <select className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'>
                      <option value='en'>English</option>
                      <option value='es'>Spanish</option>
                      <option value='fr'>French</option>
                    </select>
                  </div>

                  <div className='flex items-center space-x-3'>
                    <input
                      type='checkbox'
                      id='maintenance'
                      defaultChecked={false}
                      className='w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2'
                    />
                    <label
                      htmlFor='maintenance'
                      className='text-sm font-medium text-foreground'
                    >
                      Enable maintenance mode
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className='space-y-6'>
                <h2 className='text-xl font-bold text-foreground'>
                  Security Settings
                </h2>

                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-foreground mb-2'>
                      Current Password
                    </label>
                    <div className='relative'>
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        className='w-full px-4 py-3 pr-12 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                        placeholder='Enter current password'
                      />
                      <button
                        type='button'
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className='absolute inset-y-0 right-0 pr-3 flex items-center'
                      >
                        {showCurrentPassword ? (
                          <EyeOff className='h-5 w-5 text-foreground/40' />
                        ) : (
                          <Eye className='h-5 w-5 text-foreground/40' />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-foreground mb-2'>
                      New Password
                    </label>
                    <div className='relative'>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        className='w-full px-4 py-3 pr-12 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                        placeholder='Enter new password'
                      />
                      <button
                        type='button'
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className='absolute inset-y-0 right-0 pr-3 flex items-center'
                      >
                        {showNewPassword ? (
                          <EyeOff className='h-5 w-5 text-foreground/40' />
                        ) : (
                          <Eye className='h-5 w-5 text-foreground/40' />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-foreground mb-2'>
                      Confirm New Password
                    </label>
                    <div className='relative'>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        className='w-full px-4 py-3 pr-12 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                        placeholder='Confirm new password'
                      />
                      <button
                        type='button'
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className='absolute inset-y-0 right-0 pr-3 flex items-center'
                      >
                        {showConfirmPassword ? (
                          <EyeOff className='h-5 w-5 text-foreground/40' />
                        ) : (
                          <Eye className='h-5 w-5 text-foreground/40' />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className='flex items-center space-x-3'>
                    <input
                      type='checkbox'
                      id='twoFactor'
                      defaultChecked={false}
                      className='w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2'
                    />
                    <label
                      htmlFor='twoFactor'
                      className='text-sm font-medium text-foreground'
                    >
                      Enable two-factor authentication
                    </label>
                  </div>

                  <div className='flex items-center space-x-3'>
                    <input
                      type='checkbox'
                      id='sessionTimeout'
                      defaultChecked={true}
                      className='w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2'
                    />
                    <label
                      htmlFor='sessionTimeout'
                      className='text-sm font-medium text-foreground'
                    >
                      Auto-logout after 24 hours of inactivity
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div className='space-y-6'>
                <h2 className='text-xl font-bold text-foreground'>
                  Notification Settings
                </h2>

                <div className='space-y-4'>
                  <div className='flex items-center justify-between p-4 bg-background rounded-lg'>
                    <div>
                      <h3 className='font-medium text-foreground'>
                        Email Notifications
                      </h3>
                      <p className='text-sm text-foreground/60'>
                        Receive notifications via email
                      </p>
                    </div>
                    <input
                      type='checkbox'
                      defaultChecked={true}
                      className='w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2'
                    />
                  </div>

                  <div className='flex items-center justify-between p-4 bg-background rounded-lg'>
                    <div>
                      <h3 className='font-medium text-foreground'>
                        New Project Submissions
                      </h3>
                      <p className='text-sm text-foreground/60'>
                        Get notified when new projects are submitted
                      </p>
                    </div>
                    <input
                      type='checkbox'
                      defaultChecked={true}
                      className='w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2'
                    />
                  </div>

                  <div className='flex items-center justify-between p-4 bg-background rounded-lg'>
                    <div>
                      <h3 className='font-medium text-foreground'>
                        New Story Submissions
                      </h3>
                      <p className='text-sm text-foreground/60'>
                        Get notified when new stories are submitted
                      </p>
                    </div>
                    <input
                      type='checkbox'
                      defaultChecked={true}
                      className='w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2'
                    />
                  </div>

                  <div className='flex items-center justify-between p-4 bg-background rounded-lg'>
                    <div>
                      <h3 className='font-medium text-foreground'>
                        System Updates
                      </h3>
                      <p className='text-sm text-foreground/60'>
                        Get notified about system maintenance and updates
                      </p>
                    </div>
                    <input
                      type='checkbox'
                      defaultChecked={false}
                      className='w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2'
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Backup & Export Settings */}
            {activeTab === 'backup' && (
              <div className='space-y-6'>
                <h2 className='text-xl font-bold text-foreground'>
                  Backup & Export
                </h2>

                <div className='space-y-4'>
                  <div className='p-4 bg-background rounded-lg'>
                    <h3 className='font-medium text-foreground mb-2'>
                      Export Data
                    </h3>
                    <p className='text-sm text-foreground/60 mb-4'>
                      Download all your data including projects, stories, and
                      media files.
                    </p>
                    <button className='bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2'>
                      <Download className='w-4 h-4' />
                      <span>Export All Data</span>
                    </button>
                  </div>

                  <div className='p-4 bg-background rounded-lg'>
                    <h3 className='font-medium text-foreground mb-2'>
                      Import Data
                    </h3>
                    <p className='text-sm text-foreground/60 mb-4'>
                      Import data from a previous export or backup file.
                    </p>
                    <button className='bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center space-x-2'>
                      <Upload className='w-4 h-4' />
                      <span>Import Data</span>
                    </button>
                  </div>

                  <div className='p-4 bg-red-500/10 border border-red-500/20 rounded-lg'>
                    <h3 className='font-medium text-red-500 mb-2'>
                      Danger Zone
                    </h3>
                    <p className='text-sm text-foreground/60 mb-4'>
                      Permanently delete all data. This action cannot be undone.
                    </p>
                    <button className='bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center space-x-2'>
                      <Trash2 className='w-4 h-4' />
                      <span>Delete All Data</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
