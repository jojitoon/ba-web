'use client';

import { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Shield,
  UserCheck,
} from 'lucide-react';

// Mock data - in a real app, this would come from Convex
const users = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@builtancestry.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15 10:30',
    createdAt: '2024-01-01',
    avatar: null,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@builtancestry.com',
    role: 'editor',
    status: 'active',
    lastLogin: '2024-01-14 15:45',
    createdAt: '2024-01-05',
    avatar: null,
  },
  {
    id: 3,
    name: 'Mike Chen',
    email: 'mike@builtancestry.com',
    role: 'viewer',
    status: 'inactive',
    lastLogin: '2024-01-10 09:15',
    createdAt: '2024-01-08',
    avatar: null,
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily@builtancestry.com',
    role: 'editor',
    status: 'active',
    lastLogin: '2024-01-15 14:20',
    createdAt: '2024-01-12',
    avatar: null,
  },
];

const roleOptions = ['All', 'Admin', 'Editor', 'Viewer'];
const statusOptions = ['All', 'Active', 'Inactive'];

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      roleFilter === 'All' || user.role === roleFilter.toLowerCase();
    const matchesStatus =
      statusFilter === 'All' || user.status === statusFilter.toLowerCase();
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className='w-4 h-4 text-red-500' />;
      case 'editor':
        return <Edit className='w-4 h-4 text-blue-500' />;
      case 'viewer':
        return <UserCheck className='w-4 h-4 text-green-500' />;
      default:
        return <Users className='w-4 h-4 text-gray-500' />;
    }
  };

  const getRoleBadge = (role: string) => {
    const styles = {
      admin: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      editor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      viewer:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    };
    return (
      styles[role as keyof typeof styles] ||
      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    );
  };

  const getStatusBadge = (status: string) => {
    return status === 'active'
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-foreground'>
            User Management
          </h1>
          <p className='text-foreground/70 mt-1'>
            Manage user accounts, roles, and permissions.
          </p>
        </div>
        <div className='mt-4 sm:mt-0 flex space-x-3'>
          <button className='bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2'>
            <Plus className='w-5 h-5' />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-foreground/60'>Total Users</p>
              <p className='text-3xl font-bold text-foreground mt-1'>
                {users.length}
              </p>
            </div>
            <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center'>
              <Users className='w-6 h-6 text-primary' />
            </div>
          </div>
        </div>

        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-foreground/60'>Active Users</p>
              <p className='text-3xl font-bold text-foreground mt-1'>
                {users.filter((u) => u.status === 'active').length}
              </p>
            </div>
            <div className='w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center'>
              <UserCheck className='w-6 h-6 text-green-500' />
            </div>
          </div>
        </div>

        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-foreground/60'>Admins</p>
              <p className='text-3xl font-bold text-foreground mt-1'>
                {users.filter((u) => u.role === 'admin').length}
              </p>
            </div>
            <div className='w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center'>
              <Shield className='w-6 h-6 text-red-500' />
            </div>
          </div>
        </div>

        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-foreground/60'>Editors</p>
              <p className='text-3xl font-bold text-foreground mt-1'>
                {users.filter((u) => u.role === 'editor').length}
              </p>
            </div>
            <div className='w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center'>
              <Edit className='w-6 h-6 text-blue-500' />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-card rounded-xl p-6 metallic-border'>
        <div className='flex flex-col lg:flex-row gap-4'>
          <div className='flex-1'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5' />
              <input
                type='text'
                placeholder='Search users...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
              />
            </div>
          </div>
          <div className='flex gap-4'>
            <div className='relative'>
              <Filter className='absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5' />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className='pl-10 pr-8 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none min-w-[120px]'
              >
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none min-w-[120px]'
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className='bg-card rounded-xl overflow-hidden metallic-border'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-secondary/50'>
              <tr>
                <th className='px-6 py-4 text-left text-sm font-medium text-foreground'>
                  User
                </th>
                <th className='px-6 py-4 text-left text-sm font-medium text-foreground'>
                  Role
                </th>
                <th className='px-6 py-4 text-left text-sm font-medium text-foreground'>
                  Status
                </th>
                <th className='px-6 py-4 text-left text-sm font-medium text-foreground'>
                  Last Login
                </th>
                <th className='px-6 py-4 text-left text-sm font-medium text-foreground'>
                  Created
                </th>
                <th className='px-6 py-4 text-right text-sm font-medium text-foreground'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-border'>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className='hover:bg-secondary/20 transition-colors'
                >
                  <td className='px-6 py-4'>
                    <div className='flex items-center space-x-3'>
                      <div className='w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center'>
                        <span className='text-sm font-semibold text-foreground'>
                          {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </span>
                      </div>
                      <div>
                        <div className='font-medium text-foreground'>
                          {user.name}
                        </div>
                        <div className='text-sm text-foreground/60 flex items-center space-x-1'>
                          <Mail className='w-3 h-3' />
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center space-x-2'>
                      {getRoleIcon(user.role)}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadge(
                          user.role
                        )}`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        user.status
                      )}`}
                    >
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-foreground/80'>
                    {user.lastLogin}
                  </td>
                  <td className='px-6 py-4 text-foreground/80'>
                    {user.createdAt}
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center justify-end space-x-2'>
                      <button className='p-2 rounded-lg hover:bg-secondary transition-colors'>
                        <Edit className='w-4 h-4 text-foreground/60' />
                      </button>
                      <button className='p-2 rounded-lg hover:bg-secondary transition-colors'>
                        <MoreVertical className='w-4 h-4 text-foreground/60' />
                      </button>
                      <button className='p-2 rounded-lg hover:bg-secondary transition-colors'>
                        <Trash2 className='w-4 h-4 text-foreground/60' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className='text-center py-16'>
          <Users className='w-16 h-16 text-foreground/30 mx-auto mb-4' />
          <h3 className='text-xl font-semibold text-foreground/70 mb-2'>
            No users found
          </h3>
          <p className='text-foreground/50 mb-6'>
            Try adjusting your search or filter criteria.
          </p>
          <button className='bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center space-x-2'>
            <Plus className='w-5 h-5' />
            <span>Add Your First User</span>
          </button>
        </div>
      )}
    </div>
  );
}
