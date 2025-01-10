import { ClerkProvider } from '@clerk/nextjs';
import { setRequestLocale } from 'next-intl/server';

import { Locale, routing } from '@/i18n/routing';
import { deDE, enUS, heIL } from '@clerk/localizations';

export default async function AuthLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await props.params;

  console.log('AuthLayout', locale);

  setRequestLocale(locale);
  let clerkLocale = enUS;
  let signInUrl = '/sign-in';
  let signUpUrl = '/sign-up';
  let dashboardUrl = '/dashboard';
  let afterSignOutUrl = '/';

  if (locale !== 'en')
    switch (locale) {
      case 'de': {
        clerkLocale = deDE;
        break;
      }
      case 'he': {
        clerkLocale = heIL;
        break;
      }
      // default: {
      //   // @ts-expect-error please add the missing locale
      //   console.error(`Unsupported locale: ${locale}`);
      //   break;
      // }
    }

  if (locale !== routing.defaultLocale) {
    signInUrl = `/${locale}${signInUrl}`;
    signUpUrl = `/${locale}${signUpUrl}`;
    dashboardUrl = `/${locale}${dashboardUrl}`;
    afterSignOutUrl = `/${locale}${afterSignOutUrl}`;
  }

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
