import { FC } from 'react';

import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';

import { LocaleSwitcher } from './locale-switcher';

const AppConfig = {
  name: 'Civil Democracy',
};
export const BaseTemplate: FC<{
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}> = (props) => {
  const t = useTranslations('BaseTemplate');

  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      <div className="mx-auto max-w-screen-md">
        <header className="border-b border-gray-300">
          <div className="pb-8 pt-16">
            <Link href="/" className="flex items-center space-x-2">
              <h1 className="inline-block text-3xl font-bold text-gray-900">
                {AppConfig.name}
              </h1>
            </Link>
            <h2 className="mt-6 px-2 text-xl italic">{t('description')}</h2>
          </div>

          <div className="flex justify-between">
            <nav>
              <ul className="flex flex-wrap gap-x-5 text-xl">
                {props.leftNav}
              </ul>
            </nav>

            <nav>
              <ul className="flex flex-wrap gap-x-5 text-xl">
                {props.rightNav}
              </ul>
            </nav>
          </div>
        </header>

        <main>{props.children}</main>

        <footer className="flex flex-col gap-2 border-t border-gray-300 py-8 text-center text-sm">
          {`© Copyright ${new Date().getFullYear()} ${AppConfig.name}. `}
          <LocaleSwitcher className="w-min self-center" />
          {/* {t.rich('made_with', {
            author: () => (
              <a
                href="https://odedo.dev"
                className="text-blue-700 hover:border-b-2 hover:border-blue-700"
              >
                Odedindi
              </a>
            ),
          })} */}
        </footer>
      </div>
    </div>
  );
};
