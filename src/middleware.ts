import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages, cookieName } from '~i18n/settings';

acceptLanguage.languages(languages);

export const config = {
   matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)'],
};

export function middleware(req: NextRequest) {
   const token = req.cookies.get('token');

   let lng;
   if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName)?.value ?? '');
   if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
   if (!lng) lng = fallbackLng;

   if (req.nextUrl.pathname === `/${lng}/dashboard`) {
      return NextResponse.redirect(new URL(`/${lng}/dashboard/views`, req.url));
   }

   const authRoutes = [lng + '/login', lng + '/register'];
   const isAuthRoute = authRoutes.some((route) => {
      return req.nextUrl.pathname.includes(route);
   });

   if (token && isAuthRoute) {
      return NextResponse.redirect(new URL('/', req.url));
   }

   const currentPath = req.nextUrl.pathname;
   const currentLngInPath = languages.find((loc) => currentPath.startsWith(`/${loc}`));

   if (lng && currentLngInPath && lng !== currentLngInPath) {
      let newUrl;
      if (currentPath === `/${currentLngInPath}`) {
         newUrl = new URL(`/${lng}`, req.url);
      } else {
         const newPath = `/${lng}${currentPath.slice(currentLngInPath.length + 1)}`;
         newUrl = new URL(newPath, req.url);
      }
      return NextResponse.redirect(newUrl);
   }

   // Redirect if lng in path is not supported
   if (
      !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
      !req.nextUrl.pathname.startsWith('/_next')
   ) {
      return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
   }

   if (req.headers.has('referer')) {
      const refererUrl = new URL(req.headers.get('referer') ?? '');

      const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
      const response = NextResponse.next();
      if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
      return response;
   }

   return NextResponse.next();
}
