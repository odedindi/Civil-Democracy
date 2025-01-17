import { SignOutButton } from '@clerk/nextjs';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

import { BaseTemplate } from '@/components/BaseTemplate';
import { LocaleSwitcher } from '@/components/locale-switcher';

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
    <BaseTemplate
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
          <li>
            <SignOutButton>
              <button
                className="border-none text-gray-700 hover:text-gray-900"
                type="button"
              >
                {t('sign_out')}
              </button>
            </SignOutButton>
          </li>

          <li>
            <LocaleSwitcher />
          </li>
        </>
      }
    >
      {props.children}
    </BaseTemplate>
  );
}
