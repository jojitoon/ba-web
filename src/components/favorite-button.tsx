"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { useUser } from "@/contexts/user-context";
import AuthModal from "./auth-modal";
import { Id } from "convex/_generated/dataModel";

interface FavoriteButtonProps {
  itemType: "project" | "businessStory";
  itemId: Id<"projects"> | Id<"businessStories">;
  className?: string;
}

export default function FavoriteButton({
  itemType,
  itemId,
  className = "",
}: FavoriteButtonProps) {
  const { user, isAuthenticated } = useUser();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const favoriteStatus = useQuery(
    api.favorites.isFavorited,
    user
      ? {
          userId: user.email,
          itemType,
          itemId: itemId as string,
        }
      : "skip"
  );

  const toggleFavorite = useMutation(api.favorites.toggleFavorite);

  useEffect(() => {
    if (favoriteStatus !== undefined) {
      setIsFavorited(favoriteStatus);
      setIsLoading(false);
    }
  }, [favoriteStatus]);

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
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`inline-flex items-center justify-center space-x-2 border-2 border-foreground px-4 sm:px-6 py-3 font-semibold text-sm uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
          isFavorited
            ? "bg-foreground text-background hover:bg-foreground/90"
            : "text-foreground hover:bg-foreground hover:text-background"
        } ${className}`}
      >
        <Heart
          className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`}
        />
        <span className="hidden sm:inline">
          {isFavorited ? "Saved" : "Save"}
        </span>
      </button>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode="login"
        />
      )}
    </>
  );
}

