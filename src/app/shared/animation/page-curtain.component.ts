import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { MotionService } from './motion.service';

type CurtainState = 'idle' | 'in' | 'out';

/** Durée pendant laquelle le rideau couvre l'écran avant de se relever. */
const COVER_MS = 560;
/** Durée de la remontée du rideau (doit suivre la transition CSS). */
const LIFT_MS = 640;

/**
 * Rideau bordeaux qui monte du bas de l'écran au début d'une navigation,
 * laisse la page changer et défiler en haut sous lui, puis se relève.
 * Désactivé à la première navigation et quand l'utilisateur a demandé moins
 * de mouvement (le changement de page est alors instantané).
 */
@Component({
  selector: 'app-page-curtain',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="curtain" [class.curtain--in]="state() === 'in'" [class.curtain--out]="state() === 'out'" aria-hidden="true">
      <img src="/images/logo/gourmet-steakhouse-logo-blanc.png" alt="" class="curtain__logo" width="1734" height="704" draggable="false" />
    </div>
  `,
  styles: [
    `
      .curtain {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bordeaux);
        transform: translateY(101%);
        visibility: hidden;
        pointer-events: none;
        will-change: transform;
      }
      .curtain--in,
      .curtain--out {
        visibility: visible;
      }
      .curtain--in {
        transform: translateY(0);
        transition: transform 0.52s cubic-bezier(0.76, 0, 0.24, 1);
      }
      .curtain--out {
        transform: translateY(-101%);
        transition: transform 0.64s cubic-bezier(0.76, 0, 0.24, 1);
      }
      .curtain__logo {
        width: min(220px, 40vw);
        height: auto;
        opacity: 0;
        transform: translateY(12px);
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
      .curtain--in .curtain__logo {
        opacity: 1;
        transform: none;
        transition-delay: 0.22s;
      }
      .curtain--out .curtain__logo {
        opacity: 0;
        transition: opacity 0.2s ease;
      }
    `,
  ],
})
export class PageCurtainComponent {
  readonly state = signal<CurtainState>('idle');

  private readonly router = inject(Router);
  private readonly motion = inject(MotionService);
  private startedAt = 0;
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    const sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.onStart(event);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.onSettled();
      }
    });
    inject(DestroyRef).onDestroy(() => {
      sub.unsubscribe();
      clearTimeout(this.timer);
    });
  }

  private onStart(event: NavigationStart): void {
    if (!this.motion.isBrowser || this.motion.reduced || event.id === 1) return;
    // Même page, seule l'ancre change : pas de rideau.
    const current = this.router.url.split('#')[0];
    const next = event.url.split('#')[0];
    if (current === next) return;

    clearTimeout(this.timer);
    this.startedAt = performance.now();
    this.motion.cover(COVER_MS + LIFT_MS);
    this.state.set('in');
  }

  private onSettled(): void {
    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    if (this.state() !== 'in') {
      if (this.motion.isBrowser) scrollTop();
      return;
    }

    const remaining = Math.max(0, COVER_MS - (performance.now() - this.startedAt));
    this.timer = setTimeout(() => {
      scrollTop();
      this.state.set('out');
      this.timer = setTimeout(() => this.state.set('idle'), LIFT_MS);
    }, remaining);
  }
}
