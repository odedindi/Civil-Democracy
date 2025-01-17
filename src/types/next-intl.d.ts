// next-intl.d.ts
import 'next-intl/server';

import { Locale } from '@/i18n/routing';

declare module 'next-intl/server' {
  // Augment the `getLocale` function
  export function getLocale(): Promise<Locale>;
}
