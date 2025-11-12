'use client';

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from 'convex/_generated/api';
import {
  Mail,
  Phone,
  Building2,
  Calendar,
  CheckCircle,
  Circle,
  Trash2,
  X,
  Filter,
} from 'lucide-react';
import { Id } from 'convex/_generated/dataModel';

export default function AdminMessages() {
  const [selectedMessage, setSelectedMessage] = useState<Id<'messages'> | null>(
    null
  );
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id: Id<'messages'> | null;
  }>({ isOpen: false, id: null });

  const messages = useQuery(api.messages.getAll);
  const unreadCount = useQuery(api.messages.getUnreadCount);
  const markAsRead = useMutation(api.messages.markAsRead);
  const markAsUnread = useMutation(api.messages.markAsUnread);
  const deleteMessage = useMutation(api.messages.deleteMessage);

  const selectedMessageData = selectedMessage
    ? messages?.find((m) => m._id === selectedMessage)
    : null;

  const filteredMessages =
    !messages
      ? []
      : filter === 'all'
      ? messages
      : filter === 'unread'
      ? messages.filter((m) => !m.read)
      : messages.filter((m) => m.read);

  const handleMarkAsRead = async (id: Id<'messages'>) => {
    await markAsRead({ id });
    if (selectedMessage === id && selectedMessageData) {
      // Update local state optimistically
      if (messages) {
        const updated = messages.map((m) =>
          m._id === id ? { ...m, read: true } : m
        );
      }
    }
  };

  const handleMarkAsUnread = async (id: Id<'messages'>) => {
    await markAsUnread({ id });
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    await deleteMessage({ id: deleteModal.id });
    if (selectedMessage === deleteModal.id) {
      setSelectedMessage(null);
    }
    setDeleteModal({ isOpen: false, id: null });
  };

  const handleViewMessage = async (id: Id<'messages'>) => {
    setSelectedMessage(id);
    const message = messages?.find((m) => m._id === id);
    if (message && !message.read) {
      await markAsRead({ id });
    }
  };

  if (messages === undefined) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-foreground'>Messages</h1>
          <p className='text-foreground/70 mt-1'>
            Manage contact form submissions
          </p>
        </div>
        {unreadCount !== undefined && unreadCount > 0 && (
          <div className='mt-4 sm:mt-0'>
            <span className='bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium'>
              {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className='flex items-center space-x-2'>
        <Filter className='w-4 h-4 text-foreground/60' />
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-foreground/70 hover:bg-secondary'
          }`}
        >
          All ({messages?.length ?? 0})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'unread'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-foreground/70 hover:bg-secondary'
          }`}
        >
          Unread ({messages?.filter((m) => !m.read).length ?? 0})
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'read'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-foreground/70 hover:bg-secondary'
          }`}
        >
          Read ({messages?.filter((m) => m.read).length ?? 0})
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Messages List */}
        <div className='lg:col-span-1 space-y-3'>
          {filteredMessages && filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <div
                key={message._id}
                onClick={() => handleViewMessage(message._id)}
                className={`bg-card rounded-lg p-4 cursor-pointer transition-all border ${
                  selectedMessage === message._id
                    ? 'border-primary shadow-lg'
                    : message.read
                    ? 'border-border hover:border-primary/50'
                    : 'border-primary/50 shadow-sm'
                }`}
              >
                <div className='flex items-start justify-between mb-2'>
                  <div className='flex items-center space-x-2'>
                    {message.read ? (
                      <Circle className='w-4 h-4 text-foreground/30' />
                    ) : (
                      <div className='w-4 h-4 rounded-full bg-primary'></div>
                    )}
                    <h3 className='font-semibold text-foreground truncate'>
                      {message.name}
                    </h3>
                  </div>
                  <span className='text-xs text-foreground/50'>
                    {new Date(message.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className='text-sm text-foreground/70 truncate mb-2'>
                  {message.email}
                </p>
                <p className='text-sm text-foreground/60 truncate'>
                  {message.message}
                </p>
                <div className='mt-2 flex items-center space-x-2'>
                  <span className='text-xs bg-primary/10 text-primary px-2 py-1 rounded'>
                    {message.service}
                  </span>
                  {message.projectType && (
                    <span className='text-xs bg-accent/10 text-accent px-2 py-1 rounded'>
                      {message.projectType}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className='bg-card rounded-lg p-8 text-center'>
              <Mail className='w-12 h-12 text-foreground/30 mx-auto mb-4' />
              <p className='text-foreground/60'>No messages found</p>
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className='lg:col-span-2'>
          {selectedMessageData ? (
            <div className='bg-card rounded-lg p-6 border border-border'>
              <div className='flex items-start justify-between mb-6'>
                <div>
                  <div className='flex items-center space-x-3 mb-2'>
                    <h2 className='text-2xl font-bold text-foreground'>
                      {selectedMessageData.name}
                    </h2>
                    {selectedMessageData.read ? (
                      <button
                        onClick={() => handleMarkAsUnread(selectedMessageData._id)}
                        className='text-xs bg-secondary text-foreground/70 px-3 py-1 rounded-full hover:bg-secondary/80 transition-colors flex items-center space-x-1'
                      >
                        <Circle className='w-3 h-3' />
                        <span>Mark as unread</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMarkAsRead(selectedMessageData._id)}
                        className='text-xs bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20 transition-colors flex items-center space-x-1'
                      >
                        <CheckCircle className='w-3 h-3' />
                        <span>Mark as read</span>
                      </button>
                    )}
                  </div>
                  <p className='text-foreground/70'>{selectedMessageData.email}</p>
                </div>
                <div className='flex items-center space-x-2'>
                  <button
                    onClick={() =>
                      setDeleteModal({
                        isOpen: true,
                        id: selectedMessageData._id,
                      })
                    }
                    className='p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors'
                    title='Delete message'
                  >
                    <Trash2 className='w-5 h-5' />
                  </button>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className='lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors'
                  >
                    <X className='w-5 h-5' />
                  </button>
                </div>
              </div>

              <div className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {selectedMessageData.phone && (
                    <div className='flex items-center space-x-3'>
                      <Phone className='w-5 h-5 text-foreground/60' />
                      <div>
                        <p className='text-sm text-foreground/60'>Phone</p>
                        <a
                          href={`tel:${selectedMessageData.phone}`}
                          className='text-foreground hover:text-primary transition-colors'
                        >
                          {selectedMessageData.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {selectedMessageData.company && (
                    <div className='flex items-center space-x-3'>
                      <Building2 className='w-5 h-5 text-foreground/60' />
                      <div>
                        <p className='text-sm text-foreground/60'>Company</p>
                        <p className='text-foreground'>
                          {selectedMessageData.company}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className='flex items-center space-x-3'>
                    <Calendar className='w-5 h-5 text-foreground/60' />
                    <div>
                      <p className='text-sm text-foreground/60'>Received</p>
                      <p className='text-foreground'>
                        {new Date(selectedMessageData.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-foreground/60 mb-2'>
                    Service Interest
                  </label>
                  <p className='text-foreground'>{selectedMessageData.service}</p>
                </div>

                {selectedMessageData.projectType && (
                  <div>
                    <label className='block text-sm font-medium text-foreground/60 mb-2'>
                      Project Type
                    </label>
                    <p className='text-foreground'>
                      {selectedMessageData.projectType}
                    </p>
                  </div>
                )}

                <div>
                  <label className='block text-sm font-medium text-foreground/60 mb-2'>
                    Message
                  </label>
                  <div className='bg-background rounded-lg p-4 border border-border'>
                    <p className='text-foreground whitespace-pre-wrap'>
                      {selectedMessageData.message}
                    </p>
                  </div>
                </div>

                <div className='flex items-center space-x-3 pt-4 border-t border-border'>
                  <a
                    href={`mailto:${selectedMessageData.email}`}
                    className='bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2'
                  >
                    <Mail className='w-4 h-4' />
                    <span>Reply via Email</span>
                  </a>
                  {selectedMessageData.phone && (
                    <a
                      href={`tel:${selectedMessageData.phone}`}
                      className='bg-card border border-border text-foreground px-6 py-2 rounded-lg font-medium hover:bg-secondary transition-colors flex items-center space-x-2'
                    >
                      <Phone className='w-4 h-4' />
                      <span>Call</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className='bg-card rounded-lg p-12 text-center border border-border'>
              <Mail className='w-16 h-16 text-foreground/30 mx-auto mb-4' />
              <p className='text-foreground/60'>
                Select a message to view details
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm'>
          <div className='bg-card rounded-lg p-6 max-w-md w-full mx-4 border border-border'>
            <h3 className='text-xl font-bold text-foreground mb-4'>
              Delete Message
            </h3>
            <p className='text-foreground/70 mb-6'>
              Are you sure you want to delete this message? This action cannot be
              undone.
            </p>
            <div className='flex items-center justify-end space-x-3'>
              <button
                onClick={() => setDeleteModal({ isOpen: false, id: null })}
                className='px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className='px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

