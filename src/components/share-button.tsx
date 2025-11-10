"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Share2, X, Copy, Check, Facebook, Twitter, Linkedin, Mail } from "lucide-react";

interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

export default function ShareButton({
  url,
  title,
  description,
  className = "",
}: ShareButtonProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showShareModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showShareModal]);

  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url;
  const shareText = description || title;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n\n${fullUrl}`)}`,
  };

  return (
    <>
      <button
        onClick={() => setShowShareModal(true)}
        className={`inline-flex items-center justify-center space-x-2 border-2 border-foreground text-foreground px-4 sm:px-6 py-3 font-semibold text-sm uppercase tracking-wider hover:bg-foreground hover:text-background transition-all duration-300 ${className}`}
      >
        <Share2 className="w-5 h-5" />
        <span className="hidden sm:inline">Share</span>
      </button>

      {showShareModal && mounted && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm"
          onClick={(e) => {
            // Close modal when clicking the overlay
            if (e.target === e.currentTarget) {
              setShowShareModal(false);
            }
          }}
        >
          <div className="relative bg-background border border-border w-full max-w-md mx-4 p-8 editorial-card">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-2">
                Share
              </h2>
              <p className="text-foreground/60">{title}</p>
            </div>

            <div className="space-y-6">
              {/* Copy Link Section */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3 uppercase tracking-wider">
                  Copy Link
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    readOnly
                    value={fullUrl}
                    className="flex-1 px-4 py-3 bg-secondary/30 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent"
                  />
                  <button
                    onClick={handleCopy}
                    className={`flex items-center justify-center space-x-2 px-6 py-3 bg-foreground text-background text-sm font-semibold uppercase tracking-wider hover:bg-foreground/90 transition-all duration-300 min-w-[120px] ${
                      copied ? "bg-green-600 hover:bg-green-700" : ""
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border"></div>

              {/* Social Share Buttons */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3 uppercase tracking-wider">
                  Share via
                </label>
                <div className="grid grid-cols-2 gap-3">
                <a
                  href={shareLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 p-4 bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  <span className="text-sm font-medium">Facebook</span>
                </a>
                <a
                  href={shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 p-4 bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  <span className="text-sm font-medium">Twitter</span>
                </a>
                <a
                  href={shareLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 p-4 bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
                <a
                  href={shareLinks.email}
                  className="flex items-center justify-center space-x-2 p-4 bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm font-medium">Email</span>
                </a>
              </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

