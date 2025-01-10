import { FC } from 'react';

import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from 'next-themes';

const ThemeProvider: FC<ThemeProviderProps> = ({
  attribute = 'class',
  defaultTheme = 'system',
  enableSystem = true,
  disableTransitionOnChange = true,
  children,
}) => (
  <NextThemesProvider
    attribute={attribute}
    defaultTheme={defaultTheme}
    enableSystem={enableSystem}
    disableTransitionOnChange={disableTransitionOnChange}
  >
    {children}
  </NextThemesProvider>
);

export default ThemeProvider;
