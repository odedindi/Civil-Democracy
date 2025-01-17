import { createNavigation } from 'next-intl/navigation';
import { LocalePrefixMode, defineRouting } from 'next-intl/routing';

const localePrefix: LocalePrefixMode = 'as-needed';

export const routing = defineRouting({
  locales: ['en', 'de', 'he'], // A list of all locales that are supported
  defaultLocale: 'en', // Used when no locale matches
  localePrefix,
});

export type Locale = (typeof routing.locales)[number];

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
