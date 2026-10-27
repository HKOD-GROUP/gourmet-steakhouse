import { Routes } from '@angular/router';

/**
 * Arborescence des routes du site. Les titres et la balise `robots` sont gérés
 * par `SeoService` dans chaque composant (pas de `title` de route, pour éviter
 * que la `TitleStrategy` n'écrase le titre applicatif).
 *
 * Toutes les routes sont statiques : elles sont prérendues au build
 * (`prerender: true` dans angular.json) et servies telles quelles par Express.
 */
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'carte',
    loadComponent: () => import('./pages/menu/menu.component').then((m) => m.MenuComponent),
  },
  {
    path: 'le-restaurant',
    loadComponent: () =>
      import('./pages/restaurant/restaurant.component').then((m) => m.RestaurantComponent),
  },
  {
    path: 'infos-pratiques',
    loadComponent: () =>
      import('./pages/contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: 'mentions-legales',
    loadComponent: () => import('./pages/legal/legal.component').then((m) => m.LegalComponent),
  },
  {
    path: 'confidentialite',
    loadComponent: () =>
      import('./pages/privacy/privacy.component').then((m) => m.PrivacyComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
