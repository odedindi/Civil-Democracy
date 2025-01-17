import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, setRequestLocale } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';

import ThemeProvider from '@/components/theme-provider';
// import { Env } from '@/env';
import { routing } from '@/i18n/routing';
// import arcjet, { detectBot, request } from '@/lib/Arcjet';
import { getLangDir } from 'rtl-detect';

// export const generateStaticParams = () =>
//   routing.locales.map((locale) => ({ locale }));

// // Improve security with Arcjet
// const aj = arcjet.withRule(
//   detectBot({
//     mode: 'LIVE',
//     // Block all bots except the following
//     allow: [
//       // See https://docs.arcjet.com/bot-protection/identifying-bots
//       'CATEGORY:SEARCH_ENGINE', // Allow search engines
//       'CATEGORY:PREVIEW', // Allow preview links to show OG images
//       'CATEGORY:MONITOR', // Allow uptime monitoring services
//     ],
//   }),
// );

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const direction = getLangDir(locale);

  if (!!locale && !routing.locales.includes(locale)) notFound();

  setRequestLocale(locale);

  // Verify the request with Arcjet
  // if (Env.ARCJET_KEY) {
  //   const req = await request();
  //   const decision = await aj.protect(req);

  //   // These errors are handled by the global error boundary, but you could also
  //   // redirect or show a custom error page
  //   if (decision.isDenied()) {
  //     if (decision.reason.isBot()) throw new Error('No bots allowed');
  //     throw new Error('Access denied');
  //   }
  // }

  // Using internationalization in Client Components
  const messages = await getMessages();

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
