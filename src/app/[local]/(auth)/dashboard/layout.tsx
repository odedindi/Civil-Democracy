import { SignOutButton, SignedIn, UserButton } from '@clerk/nextjs';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

import { BaseLayoutTemplate } from '@/components/layouts/base-layout-template';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { Button } from '@/components/ui/button';

export default async function DashboardLayout(props: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'DashboardLayout',
  });

  return (
    <BaseLayoutTemplate
      leftNav={
        <>
          <li>
            <Link
              href="/dashboard/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              {t('dashboard_link')}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/user-profile/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              {t('user_profile_link')}
            </Link>
          </li>
        </>
      }
      rightNav={
        <>
          <SignedIn>
            <li>
              <Button variant={'ghost'} type="button">
                <UserButton />
              </Button>
            </li>
          </SignedIn>
          <SignedIn>
            <li>
              <SignOutButton>
                <Button
                  variant={'outline'}
                  className="border-none text-gray-700 hover:text-gray-900"
                  type="button"
                >
                  {t('sign_out')}
                </Button>
              </SignOutButton>
            </li>
          </SignedIn>
          <li>
            <LocaleSwitcher />
          </li>
        </>
      }
    >
      {props.children}
    </BaseLayoutTemplate>
  );
}
