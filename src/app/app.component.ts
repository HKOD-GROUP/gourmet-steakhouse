import { Component, afterNextRender, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { PageCurtainComponent } from './shared/animation/page-curtain.component';

/**
 * Shell applicatif : un `router-outlet` et le rideau de transition entre pages.
 * Chaque page porte son propre chrome (`app-site-shell`). Le défilement en haut
 * à chaque navigation est géré par le rideau, pendant qu'il couvre l'écran.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PageCurtainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {
    const document = inject(DOCUMENT);
    // Signale au script d'amorçage (index.html) que l'application pilote bien
    // les animations : les éléments cachés seront révélés au défilement.
    afterNextRender(() => document.documentElement.classList.add('anim-ready'));
  }
}
