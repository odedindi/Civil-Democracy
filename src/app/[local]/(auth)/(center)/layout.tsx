import { getLocale, setRequestLocale } from 'next-intl/server';

import { LocaleSwitcher } from '@/components/locale-switcher';

export default async function CenteredLayout(props: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center">
        {props.children}
      </div>
      <LocaleSwitcher className="w-auto self-end" />
    </div>
  );
}
