import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';

import { ESTABLISHMENTS, MAIN_ESTABLISHMENT, SITE } from '../../../core/data/restaurant';

/**
 * Chrome commun à toutes les pages : en-tête (logo, navigation, téléphone)
 * et pied de page (adresses, horaires, liens légaux). Le contenu est projeté
 * via `<ng-content>`.
 */
@Component({
  selector: 'app-site-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
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

  readonly links = [
    { path: '/carte', label: 'La carte' },
    { path: '/le-restaurant', label: 'Le restaurant' },
    { path: '/infos-pratiques', label: 'Infos pratiques' },
  ];

  constructor() {
    inject(Router)
      .events.pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.menuOpen.set(false));
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
}
