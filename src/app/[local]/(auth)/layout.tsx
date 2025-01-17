import { ClerkProvider } from '@clerk/nextjs';
import { getLocale, setRequestLocale } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import { deDE, enUS, heIL } from '@clerk/localizations';

const clerkLocaleMap = { en: enUS, de: deDE, he: heIL } as const;
const clerktDefaulLocale = clerkLocaleMap[routing.defaultLocale];

export default async function AuthLayout(props: { children: React.ReactNode }) {
  const locale = await getLocale();

  setRequestLocale(locale);

  const prefix =
    !!locale && locale !== routing.defaultLocale ? `/${locale}` : '/';

  const clerkLocale = clerkLocaleMap[locale] ?? clerktDefaulLocale;
  const signInUrl = `${prefix}/sign-in`;
  const signUpUrl = `${prefix}/sign-up`;
  const dashboardUrl = `${prefix}/dashboard`;
  const afterSignOutUrl = prefix === '/' ? prefix : `${prefix}/`;

  return (
    <ClerkProvider
      localization={clerkLocale}
      signInUrl={signInUrl}
      signUpUrl={signUpUrl}
      signInFallbackRedirectUrl={dashboardUrl}
      signUpFallbackRedirectUrl={dashboardUrl}
      afterSignOutUrl={afterSignOutUrl}
    >
      {props.children}
    </ClerkProvider>
  );
}
