'use client';

import { Check, ChevronDown } from 'lucide-react';
import { type FC, useTransition } from 'react';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getLanguages, usePathname } from '@/i18n/routing';

import { FlagIcon } from './ui/flagIcon';

export const LocaleSwitcher: FC = () => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const languages = getLanguages();
  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start"
          icon={<ChevronDown className="ml-auto size-4 opacity-50" />}
          iconPlacement="right"
          title={currentLanguage.name}
        >
          <FlagIcon countryCode={currentLanguage.countryCode} />
          {currentLanguage.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              startTransition(() => {
                router.push(`/${lang.code}${pathname}`);
              });
            }}
            asChild
            disabled={isPending}
          >
            <Button
              variant="ghost"
              className="w-full justify-start"
              icon={<FlagIcon countryCode={lang.countryCode} />}
              iconPlacement="left"
              title={lang.name}
              disabled={currentLanguage.code === lang.code}
            >
              <span>{lang.name}</span>
              {currentLanguage.code === lang.code ? (
                <Check className="ml-auto size-4 opacity-50" />
              ) : null}
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
