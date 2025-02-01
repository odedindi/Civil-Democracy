import { FC } from 'react';

import { AppConfig } from '@/lib/config';

export const BaseLayoutTemplate: FC<{
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
}> = (props) => {
  return (
    <div className="size-full antialiased">
      <div className="mx-auto flex h-full max-w-screen-xl flex-col">
        <header className="border-b border-gray-300">
          <div className="fixed flex w-full justify-between bg-background py-3 opacity-95">
            <nav>
              <ul className="flex flex-wrap gap-x-5 text-xl">
                {props.leftNav}
              </ul>
            </nav>

            <nav>
              <ul className="flex flex-nowrap gap-x-5 px-5 text-xl">
                {props.rightNav}
              </ul>
            </nav>
          </div>
          {props.header ? (
            <div className="px-4 pb-4 pt-16">{props.header}</div>
          ) : null}
        </header>

        <main className="flex-1 px-4">{props.children}</main>

        <footer className="flex flex-col gap-2 border-t border-gray-300 py-8 text-center text-sm">
          {`${AppConfig.name} © Copyright ${new Date().getFullYear()}. `}

          {/* {t.rich('made_with', {
            author: () => (
              <a
                href="https://odedo.dev"
                // className="text-blue-700 hover:border-b-2 hover:border-blue-700"
              >
                ODEDINDI
              </a>
            ),
          })} */}
        </footer>
      </div>
    </div>
  );
};
