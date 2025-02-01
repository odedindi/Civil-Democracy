import { getLocale, setRequestLocale } from 'next-intl/server';

import { ModeToggle } from '@/components/dark-mode-toggle';
import { BaseLayoutTemplate } from '@/components/layouts/base-layout-template';
import { BaseNav } from '@/components/layouts/base-nav';
import { LocaleSwitcher } from '@/components/locale-switcher';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  setRequestLocale(locale);

  return (
    <BaseLayoutTemplate
      leftNav={<BaseNav />}
      rightNav={
        <>
          <ModeToggle mode="menu" />
          <LocaleSwitcher variant="outline" />
        </>
      }
    >
      {children}
    </BaseLayoutTemplate>
  );
}
