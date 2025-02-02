import { SignedIn, UserButton } from '@clerk/nextjs';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';

import { ModeToggle } from '@/components/dark-mode-toggle';
import { BaseLayoutTemplate } from '@/components/layouts/base-layout-template';
import { BaseNav } from '@/components/layouts/base-nav';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { Button } from '@/components/ui/button';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  setRequestLocale(locale);
  const _t = await getTranslations({ locale });
  return (
    <BaseLayoutTemplate
      leftNav={<BaseNav />}
      rightNav={
        <>
          <SignedIn>
            <li>
              <Button variant={'ghost'} type="button">
                <UserButton />
              </Button>
            </li>
          </SignedIn>

          <ModeToggle mode="menu" />
          <LocaleSwitcher variant="outline" />
        </>
      }
    >
      {children}
    </BaseLayoutTemplate>
  );
}
