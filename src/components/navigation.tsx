"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Hotel,
  Home,
  Building2,
  Video,
  Users,
  Info,
  Phone,
  User,
  LogOut,
  LogIn,
} from "lucide-react";
import { useUser } from "@/contexts/user-context";
import AuthModal from "./auth-modal";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useUser();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/projects", label: "Projects", icon: Building2 },
    { href: "/business-stories", label: "Business Stories", icon: Video },
    { href: "/about", label: "About", icon: Info },
    { href: "/for-businesses", label: "For Businesses", icon: Users },
    { href: "/for-construction", label: "For Construction", icon: Hotel },
    { href: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-md border-b border-border/50">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-foreground rounded-sm flex items-center justify-center transition-transform group-hover:scale-105">
              <Building2 className="w-6 h-6 text-background" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-serif font-bold text-foreground tracking-tight leading-none">
                Built Ancestry
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                Legacy Documentation
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-secondary/50 transition-all duration-200 uppercase tracking-wider relative group"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
            ))}
            
            {/* User Menu */}
            <div className="relative ml-4" ref={userMenuRef}>
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-secondary/50 transition-all duration-200 uppercase tracking-wider"
                  >
                    <User className="w-4 h-4" />
                    <span>{user?.name || user?.email?.split("@")[0]}</span>
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-background border border-border shadow-lg z-50">
                      <div className="p-4 border-b border-border">
                        <p className="text-sm font-medium text-foreground">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-foreground/60">{user?.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center space-x-2 px-4 py-3 text-sm text-foreground/70 hover:bg-secondary/50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-secondary/50 transition-all duration-200 uppercase tracking-wider"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-sm hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-border/50 bg-background">
            <div className="py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-6 py-3 text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors uppercase tracking-wider text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="border-t border-border/50 mt-2 pt-2">
                {isAuthenticated ? (
                  <>
                    <div className="px-6 py-3">
                      <p className="text-sm font-medium text-foreground">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-foreground/60">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-3 px-6 py-3 text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors uppercase tracking-wider text-sm font-medium w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-3 px-6 py-3 text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors uppercase tracking-wider text-sm font-medium w-full"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </nav>
  );
}
