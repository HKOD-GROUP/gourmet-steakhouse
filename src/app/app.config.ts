import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { routes } from './app.routes';

registerLocaleData(localeFr, 'fr-FR');

// IMPORTANT : `provideClientHydration` est volontairement omis (décision
// documentée sur trainia / orvya). Avec hydration active, le DOM pré-rendu
// côté serveur est préservé et les changements de signals post-hydration
// ne forçaient pas le re-render des blocs `@if`. Sans hydration, Angular
// re-render l'arbre côté client à la prise de main. Le SSR reste actif.
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      })
    ),
    provideAnimations(),
    provideHttpClient(withFetch())
  ]
};
