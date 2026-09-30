"use client";
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { 
  Sparkles, 
  LayoutDashboard, 
  BookOpen, 
  HelpCircle, 
  CreditCard, 
  Menu, 
  X
} from 'lucide-react';
import Logo from '@/components/Logo';

function Header() {
  const path = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Question Bank', href: '/dashboard/question', icon: HelpCircle },
    { name: 'Preparation Guide', href: '/dashboard/instruction', icon: BookOpen },
    { name: 'Membership', href: '/dashboard/upgrade', icon: CreditCard },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Logo href="/dashboard" />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => {
            const isActive = path === item.href || (item.href !== '/dashboard' && path.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all ${
                  isActive
                    ? 'text-white bg-zinc-800/90 shadow-inner'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-blue-400' : 'text-zinc-500'}`} />
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section / Auth */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-zinc-400 font-medium">Session Ready</span>
          </div>

          <div className="flex items-center pl-2 border-l border-zinc-800">
            <UserButton 
              afterSignOutUrl="/" 
              appearance={{
                elements: {
                  avatarBox: 'h-8 w-8 ring-2 ring-zinc-700/50 hover:ring-blue-500 transition-all'
                }
              }}
            />
          </div>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950/95 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((item) => {
            const isActive = path === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'text-white bg-zinc-800'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Icon className="h-4 w-4 text-blue-400" />
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

export default Header;
