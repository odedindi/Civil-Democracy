'use client';

import { Menu } from 'lucide-react';
import { useCallback } from 'react';

import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import { useLocale, useTranslations } from 'next-intl';
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

export function BaseNav() {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = useLocale();
  const isActivePath = useCallback(
    (path: string) => {
      // handle locale path
      if (
        (path === '/' && pathname === `/${locale}`) ||
        pathname === `/${locale}${path}`
      ) {
        return true;
      }

      return pathname === path;
    },
    [locale, pathname],
  );

  return (
    <nav className="flex items-center space-x-4 px-3 lg:space-x-6">
      <div className="hidden flex-wrap items-center gap-2 py-2 md:flex lg:space-x-6">
        {navItems.map((item) => {
          const isActive = isActivePath(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              aria-disabled={isActive ? 'true' : undefined}
              role="menuitem"
              className={cn(
                'rounded-sm p-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-primary hover:dark:bg-gray-800',
                isActive
                  ? 'text-primar pointer-events-none border bg-muted'
                  : 'text-muted-foreground',
              )}
            >
              {item.label}
            </Link>
          );
        })}
        <SignedIn>
          <SignOutButton>
            <Button
              variant={'ghost'}
              className="justify-start border-none px-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 rtl:justify-end"
              type="button"
              role="menuitem"
            >
              {t('DashboardLayout.sign_out')}
            </Button>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <SignInButton signUpForceRedirectUrl={'/'}>
            <Button
              variant={'ghost'}
              className="justify-start border-none px-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 rtl:justify-end"
              type="button"
              role="menuitem"
            >
              {t('RootLayout.sign_in_link')}
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="size-[1.2rem]" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="mr-0 rtl:mr-2.5">
            {navItems.map((item) => {
              const isActive = isActivePath(item.href);
              return (
                <DropdownMenuItem key={item.href} asChild>
                  <Button variant={'ghost'} asChild>
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      aria-disabled={isActive ? 'true' : undefined}
                      role="menuitem"
                      className={cn(
                        'mb-1 w-full cursor-pointer py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 hover:dark:bg-gray-800 dark:hover:text-gray-100 ltr:justify-start rtl:justify-end',
                        isActive
                          ? 'pointer-events-none border bg-gray-100 text-gray-800 text-primary dark:bg-gray-800 dark:text-gray-100'
                          : 'text-muted-foreground',
                      )}
                    >
                      {item.label}
                    </Link>
                  </Button>
                </DropdownMenuItem>
              );
            })}
            <SignedIn>
              <DropdownMenuItem
                asChild
                className="w-full cursor-pointer justify-start border-none px-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 rtl:justify-end"
              >
                <SignOutButton>
                  <Button variant={'ghost'} role="menuitem">
                    {t('DashboardLayout.sign_out')}
                  </Button>
                </SignOutButton>
              </DropdownMenuItem>
            </SignedIn>

            <SignedOut>
              <DropdownMenuItem
                asChild
                className="w-full cursor-pointer justify-start border-none bg-background px-2 text-gray-700 ring-transparent hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 hover:dark:bg-gray-800 dark:hover:text-gray-100 rtl:justify-end"
              >
                <SignInButton signUpForceRedirectUrl={'/'}>
                  <Button variant={'ghost'} role="menuitem">
                    {t('RootLayout.sign_in_link')}
                  </Button>
                </SignInButton>
              </DropdownMenuItem>
            </SignedOut>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
