'use client';

import { Menu } from 'lucide-react';
import * as React from 'react';

import { useUser } from '@clerk/nextjs';
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

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/participate', label: 'Participate' },
  { href: '/vote/1', label: 'Vote' },
  { href: '/actors', label: 'Actors' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
];

const authenticatedNavItems = [{ href: '/sign-out', label: 'Sign Out' }];

const unAuthenticatedNavItems = [
  { href: '/sign-in', label: 'Sign In' },
  { href: '/sign-up', label: 'Sign Up' },
];

export function BaseNav() {
  const pathname = usePathname();
  const user = useUser();
  const navLinks = React.useMemo(
    () =>
      user
        ? [...navItems, ...authenticatedNavItems]
        : [...navItems, ...unAuthenticatedNavItems],
    [user],
  );
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 rtl:px-3">
      <div className="hidden items-center space-x-4 py-2 md:flex lg:space-x-6">
        {navLinks.map((item) => (
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
            {navLinks.map((item) => (
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
