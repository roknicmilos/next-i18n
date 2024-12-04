import { defaultLanguage, locales } from "@/config/locales";
import { NextRequest, NextResponse } from "next/server";
import acceptLanguageParser from "accept-language-parser";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import {isRootPublicFile} from "@/utils/url";


export function middleware(request: NextRequest): NextResponse | undefined {
  const { pathname } = request.nextUrl;
  if (isRootPublicFile(pathname)) {
    return;
  }

  const pathnameLocale = getPathnameLocale(pathname);
  const requestLocale = getRequestLocale(request);
  if (pathnameLocale && pathnameLocale === requestLocale) {
    return;
  }

  const preferredLocale = pathnameLocale || requestLocale || defaultLanguage.locale;
  if (!pathnameLocale) {
    request.nextUrl.pathname = `/${preferredLocale}${request.nextUrl.pathname}`;
  }
  const response = NextResponse.redirect(request.nextUrl);

  setPreferredLanguageCookie(response, preferredLocale);
  return response;
}

function getRequestLocale(request: NextRequest): string | null {
  const preferredLanguageCookie = request.cookies.get("Preferred-Language");
  let locale;
  if (preferredLanguageCookie) {
    locale = acceptLanguageParser.pick(locales, preferredLanguageCookie.value);
  }
  if (!locale) {
    const acceptLanguage = request.headers.get("accept-language") || "";
    locale = acceptLanguageParser.pick(locales, acceptLanguage, { loose: true });
  }
  return locale;
}

function getPathnameLocale(pathname: string): string | undefined {
  return locales.find(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
}

/**
 * Setting a cookie with the preferred language is necessary to ensure that the server
 * can user the correct language when the user navigates to a different page.
 * Translations are located in JSON files available on the server, so the server needs
 * to know which language to use.
 */
function setPreferredLanguageCookie(response: NextResponse, locale: string): void {
  const cookieOptions: Partial<ResponseCookie> = {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  };
  response.cookies.set("Preferred-Language", locale, cookieOptions);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
