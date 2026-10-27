import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * Shell applicatif : uniquement un `router-outlet`. Chaque page/layout porte
 * son propre chrome (landing : navbar+footer inline ; auth : AuthLayout ;
 * dashboard : MainLayout ; portail public : plein écran sans chrome).
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
  }
}
