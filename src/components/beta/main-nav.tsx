'use client';

import { Menu } from 'lucide-react';
import * as React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

import { LocaleSwitcher as LanguageSwitcher } from '../locale-switcher';
import ModeToggle from './dark-mode-toggle';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/participate', label: 'Participate' },
  { href: '/vote/1', label: 'Vote' },
  { href: '/actors', label: 'Actors' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/login', label: 'Login' },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <div className="hidden items-center space-x-4 md:flex lg:space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname === item.href ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            {item.label}
          </Link>
        ))}
        <ModeToggle mode="menu" />
      </div>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="size-[1.2rem]" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {navItems.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link
                  href={item.href}
                  className={cn(
                    'w-full',
                    pathname === item.href
                      ? 'text-primary'
                      : 'text-muted-foreground',
                  )}
                >
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem asChild>
              <ModeToggle />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <LanguageSwitcher />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
