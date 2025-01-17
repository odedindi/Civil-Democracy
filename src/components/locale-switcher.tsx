'use client';

import { Check, ChevronDown } from 'lucide-react';
import { type FC } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { Button, type ButtonProps } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type Locale, usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';

import { type CountryCode, FlagIcon } from './ui/flagIcon';

type LocaleSwitcherProps = Pick<ButtonProps, 'className' | 'variant'>;

const languages: { code: Locale; name: string; countryCode: CountryCode }[] = [
  { code: 'en', name: 'English', countryCode: 'GB' },
  { code: 'de', name: 'Deutsch', countryCode: 'DE' },
  { code: 'he', name: 'Hebrew', countryCode: 'IL' },
] as const;

export const LocaleSwitcher: FC<LocaleSwitcherProps> = ({
  className,
  variant = 'ghost',
}) => {
  const t = useTranslations('common.languages');

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];
  const currentLanguageIndex = languages.findIndex(
    (lang) => lang.code === locale,
  );
  const selectedIndex = currentLanguageIndex < 1 ? 0 : currentLanguageIndex;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          className={cn('w-full justify-start', className)}
          icon={<ChevronDown className="ml-auto size-4 opacity-50" />}
          iconPlacement="right"
          title={languages[selectedIndex].name}
        >
          <FlagIcon countryCode={languages[selectedIndex].countryCode} />
          {languages[selectedIndex].name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map(({ code: locale, countryCode }) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => {
              router.push(pathname, { locale });

              router.refresh();
            }}
            asChild
          >
            <Button
              variant={variant}
              className="w-full justify-start"
              icon={<FlagIcon countryCode={countryCode} />}
              iconPlacement="left"
              title={t(locale)}
              disabled={currentLanguage.code === locale}
            >
              <span>{t(locale)}</span>
              {currentLanguage.code === locale ? (
                <Check className="ml-auto size-4 opacity-50" />
              ) : null}
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
