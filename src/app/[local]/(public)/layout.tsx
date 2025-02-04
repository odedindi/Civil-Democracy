import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';

import { ModeToggle } from '@/components/dark-mode-toggle';
import { BaseLayoutTemplate } from '@/components/layouts/base-layout-template';
import { BaseNav } from '@/components/layouts/base-nav';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { Link } from '@/i18n/routing';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  setRequestLocale(locale);

  const t = await getTranslations({ locale });

  return (
    <BaseLayoutTemplate
      leftNav={<BaseNav />}
      rightNav={
        <>
          <ModeToggle mode="menu" />
          <LocaleSwitcher variant="outline" />
        </>
      }
      header={
        <>
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="inline-block text-3xl font-bold">
              {t('Index.meta_title')}
            </h1>
          </Link>
        </>
      }
    >
      {children}
    </BaseLayoutTemplate>
  );
}
