'use client';

import { MonitorCog, Moon, Sun } from 'lucide-react';
import { FC, useCallback } from 'react';

import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const icons = {
  light: <Sun className="h-5 w-5" />,
  dark: <Moon className="h-5 w-5" />,
  system: <MonitorCog className="h-5 w-5" />,
};

const ModeToggle: FC<{ mode?: 'button' | 'menu' }> = ({ mode = 'button' }) => {
  const { theme = 'light', setTheme, themes } = useTheme();

  const getNextThemeMode = useCallback(
    (currentTheme: typeof theme) => {
      const currentIndex = themes.indexOf(currentTheme);

      if (currentIndex === -1) {
        throw new Error(`Invalid theme mode: ${currentTheme}`);
      }

      const nextIndex = (currentIndex + 1) % themes.length;
      return themes[nextIndex];
    },
    [themes],
  );

  if (mode === 'button')
    return (
      <Button
        className="w-full"
        variant="ghost"
        onClick={() => setTheme(getNextThemeMode(theme))}
      >
        {icons[theme as keyof typeof icons]}
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-full">
        <Button className="w-full" variant="ghost">
          {icons[theme as keyof typeof icons]}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption}
            onClick={() => setTheme(themeOption)}
            asChild
          >
            <Button
              variant="ghost"
              className="w-full justify-start"
              icon={icons[themeOption as keyof typeof icons]}
              iconPlacement="left"
            >
              {themeOption}
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggle;
