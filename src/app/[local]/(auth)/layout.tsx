import { ClerkProvider, GoogleOneTap } from '@clerk/nextjs';
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

  const onboardingtUrl = `${prefix}/onboarding`;
  const afterSignOutUrl = prefix === '/' ? prefix : `${prefix}/`;
  return (
    <ClerkProvider
      localization={clerkLocaleMap[locale] ?? clerktDefaulLocale}
      signInUrl={`${prefix}/sign-in`}
      signUpUrl={`${prefix}/sign-up`}
      signInFallbackRedirectUrl={`${prefix}/dashboard`}
      signUpFallbackRedirectUrl={onboardingtUrl}
      afterSignOutUrl={afterSignOutUrl}
    >
      <GoogleOneTap
      // signUpForceRedirectUrl={onboardingtUrl}
      // signInForceRedirectUrl={afterSignOutUrl}
      />

      {props.children}
    </ClerkProvider>
  );
}
