import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import type { NextFetchEvent, NextRequest } from 'next/server';

import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/:locale/dashboard(.*)',
]);

const isAuthPage = createRouteMatcher([
  '/sign-in(.*)',
  '/:locale/sign-in(.*)',
  '/sign-up(.*)',
  '/:locale/sign-up(.*)',
  '/onboarding(.*)',
  '/:locale/onboarding(.*)',
]);

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  if (isAuthPage(request) || isProtectedRoute(request)) {
    return clerkMiddleware(
      async (auth, req) => {
        if (isProtectedRoute(req)) {
          const locale =
            req.nextUrl.pathname.match(/^\/([a-z]{2})\//)?.[1] ?? '';
          // console.info('clerk: locale inprotected rout', locale);
          const signInUrl = new URL(`${locale}/sign-in`, req.url);

          await auth.protect({
            // `unauthenticatedUrl` is needed to avoid error: "Unable to find `next-intl` locale because the middleware didn't run on this request"
            unauthenticatedUrl: signInUrl.toString(),
          });
        }

        return intlMiddleware(req);
      },
      {
        // debug: process.env.NODE_ENV === 'development',
        // authorizedParties: ['*'],
      },
    )(request, event);
  }
  return clerkMiddleware((_, req) => intlMiddleware(req))(request, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|monitoring|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
