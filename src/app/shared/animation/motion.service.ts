import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * État partagé des animations.
 * - `reduced` : l'utilisateur a demandé moins de mouvement (tout devient instantané).
 * - `enterDelay()` : délai à ajouter aux révélations pendant qu'un rideau de
 *   transition couvre encore l'écran, pour que la nouvelle page s'anime au
 *   moment où elle apparaît et non en dessous du rideau.
 */
@Injectable({ providedIn: 'root' })
export class MotionService {
  readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly reduced =
    this.isBrowser && typeof matchMedia === 'function'
      ? matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  /** Horodatage (performance.now) jusqu'auquel l'écran est couvert par le rideau. */
  private coveredUntil = 0;

  cover(durationMs: number): void {
    this.coveredUntil = performance.now() + durationMs;
  }

  enterDelay(): number {
    return Math.max(0, this.coveredUntil - performance.now());
  }
}
