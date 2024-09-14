import { clerkMiddleware } from '@clerk/nextjs/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { AppConfig } from './utils/AppConfig';

const intlMiddleware = createMiddleware({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

// export default function middleware(
//   request: NextRequest,
//   event: NextFetchEvent,
// ) {
//   // Run Clerk middleware only when it's necessary
//   if (
//     request.nextUrl.pathname.includes('/sign-in')
//     || request.nextUrl.pathname.includes('/sign-up')
//     || isProtectedRoute(request)
//   ) {
//     return clerkMiddleware((auth, req) => {
//       if (isProtectedRoute(req)) {
//         const locale
//           = req.nextUrl.pathname.match(/(\/.*)\/dashboard/)?.at(1) ?? '';

//         const signInUrl = new URL(`${locale}/sign-in`, req.url);

//         auth().protect({
//           // `unauthenticatedUrl` is needed to avoid error: "Unable to find `next-intl` locale because the middleware didn't run on this request"
//           unauthenticatedUrl: signInUrl.toString(),
//         });
//       }

//       return intlMiddleware(req);
//     })(request, event);
//   }

//   return intlMiddleware(request);
// }

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  // Run Clerk middleware for all routes except those explicitly excluded
  return clerkMiddleware((auth, req) => {
    const locale = req.nextUrl.pathname.match(/(\/.*)\/dashboard/)?.at(1) ?? '';
    const signInUrl = new URL(`${locale}/sign-in`, req.url);

    const { userId } = auth();

    if (!userId && !req.nextUrl.pathname.includes('/sign-in') && !req.nextUrl.pathname.includes('/sign-up')) {
      auth().protect({
        unauthenticatedUrl: signInUrl.toString(),
      });
    }

    return intlMiddleware(req);
  })(request, event);
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|monitoring).*)', '/', '/(api|trpc)(.*)'], // Also exclude tunnelRoute used in Sentry from the matcher
};
