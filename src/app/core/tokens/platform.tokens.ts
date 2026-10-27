import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

export function injectIsBrowser(): boolean {
  return isPlatformBrowser(inject(PLATFORM_ID));
}

export function injectIsServer(): boolean {
  return isPlatformServer(inject(PLATFORM_ID));
}

export function setCookie(name: string, value: string, days = 7, path = '/'): void {
  if (typeof document === 'undefined') {
    return;
  }
  const maxAge = days * 24 * 60 * 60;
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=${path}; SameSite=Lax${secure}`;
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  for (const raw of cookies) {
    const [key, ...rest] = raw.split('=');
    if (key === name) {
      return decodeURIComponent(rest.join('='));
    }
  }
  return null;
}

export function deleteCookie(name: string, path = '/'): void {
  if (typeof document === 'undefined') {
    return;
  }
  document.cookie = `${name}=; Max-Age=0; Path=${path}; SameSite=Lax`;
}
