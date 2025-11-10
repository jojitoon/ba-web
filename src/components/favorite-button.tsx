'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useMutation, useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import { useUser } from '@/contexts/user-context';
import AuthModal from './auth-modal';
import { Id } from 'convex/_generated/dataModel';

interface FavoriteButtonProps {
  itemType: 'project' | 'businessStory';
  itemId: Id<'projects'> | Id<'businessStories'>;
  className?: string;
  favoriteCount?: number; // Optional favorite count from the story/project object
}

export default function FavoriteButton({
  itemType,
  itemId,
  className = '',
  favoriteCount: propFavoriteCount,
}: FavoriteButtonProps) {
  const { user, isAuthenticated } = useUser();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [localFavoriteCount, setLocalFavoriteCount] = useState<
    number | undefined
  >(propFavoriteCount);

  const favoriteStatus = useQuery(
    api.favorites.isFavorited,
    user
      ? {
          userId: user.email,
          itemType,
          itemId: itemId as string,
        }
      : 'skip'
  );

  // Use prop if available, otherwise fall back to query (for projects or backward compatibility)
  const favoriteCountQuery = useQuery(
    api.favorites.getFavoriteCount,
    propFavoriteCount === undefined && itemType === 'businessStory'
      ? 'skip'
      : {
          itemType,
          itemId: itemId as string,
        }
  );

  const favoriteCount =
    propFavoriteCount !== undefined
      ? localFavoriteCount ?? propFavoriteCount
      : favoriteCountQuery;

  const toggleFavorite = useMutation(api.favorites.toggleFavorite);

  useEffect(() => {
    if (propFavoriteCount !== undefined) {
      setLocalFavoriteCount(propFavoriteCount);
    }
  }, [propFavoriteCount]);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }
    if (favoriteStatus !== undefined) {
      setIsFavorited(favoriteStatus);
      setIsLoading(false);
    }
  }, [favoriteStatus, isAuthenticated]);

  const handleClick = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (!user) return;

    setIsLoading(true);
    try {
      const result = await toggleFavorite({
        userId: user.email,
        itemType,
        itemId: itemId as string,
      });
      setIsFavorited(result.favorited);

      // Update local count if we're using prop-based count
      if (propFavoriteCount !== undefined && localFavoriteCount !== undefined) {
        setLocalFavoriteCount(
          result.favorited
            ? localFavoriteCount + 1
            : Math.max(0, localFavoriteCount - 1)
        );
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`group inline-flex items-center justify-center space-x-2 border-2 border-foreground px-4 sm:px-6 py-3 font-semibold text-sm uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
          isFavorited
            ? 'bg-foreground text-background hover:bg-foreground/90'
            : 'text-foreground hover:bg-foreground hover:text-background'
        } ${className}`}
      >
        <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
        <span className='hidden sm:inline'>
          {isFavorited ? 'Saved' : 'Save'}
        </span>
        {favoriteCount !== undefined && favoriteCount > 0 && (
          <span
            className={`inline-flex items-center justify-center min-w-[24px] h-6 px-2 text-xs font-semibold rounded-full border transition-all duration-300 ${
              isFavorited
                ? 'bg-background/30 text-background border-background/40 group-hover:bg-background/40 group-hover:border-background/50'
                : 'bg-foreground/10 text-foreground border-foreground/20 group-hover:bg-background/30 group-hover:text-background group-hover:border-background/40'
            }`}
          >
            {favoriteCount}
          </span>
        )}
      </button>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode='login'
        />
      )}
    </>
  );
}
