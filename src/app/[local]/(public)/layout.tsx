import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

import { BaseTemplate } from '@/components/BaseTemplate';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { MainNav } from '@/components/main-nav';

export default async function Layout(props: { children: React.ReactNode }) {
  const locale = await getLocale();

  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: 'RootLayout',
  });

  return (
    <BaseTemplate
      leftNav={<MainNav />}
      rightNav={
        <>
          <li>
            <Link
              href="/sign-in/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              {t('sign_in_link')}
            </Link>
          </li>

          <li>
            <Link
              href="/sign-up/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              {t('sign_up_link')}
            </Link>
          </li>

          <li>
            <LocaleSwitcher />
          </li>
        </>
      }
    >
      <div>{props.children}</div>
    </BaseTemplate>
  );
}
