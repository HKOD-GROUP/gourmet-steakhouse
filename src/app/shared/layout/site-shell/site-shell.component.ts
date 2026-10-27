import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';

import { ESTABLISHMENTS, MAIN_ESTABLISHMENT, SITE } from '../../../core/data/restaurant';
import { RevealDirective } from '../../animation/reveal.directive';

/**
 * Chrome commun à toutes les pages : en-tête (logo, navigation, téléphone)
 * et pied de page (adresses, horaires, liens légaux). Le contenu est projeté
 * via `<ng-content>`. L'en-tête se compacte dès qu'on a défilé.
 */
@Component({
  selector: 'app-site-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-shell.component.html',
  styleUrl: './site-shell.component.scss',
})
export class SiteShellComponent {
  readonly site = SITE;
  readonly main = MAIN_ESTABLISHMENT;
  readonly establishments = ESTABLISHMENTS;
  readonly year = new Date().getFullYear();
  readonly menuOpen = signal(false);
  readonly compact = signal(false);

  readonly links = [
    { path: '/carte', label: 'La carte' },
    { path: '/le-restaurant', label: 'Le restaurant' },
    { path: '/infos-pratiques', label: 'Infos pratiques' },
  ];

  constructor() {
    const destroyRef = inject(DestroyRef);

    inject(Router)
      .events.pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.menuOpen.set(false));

    afterNextRender(() => {
      const onScroll = () => {
        const next = window.scrollY > 48;
        if (next !== this.compact()) this.compact.set(next);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
}
