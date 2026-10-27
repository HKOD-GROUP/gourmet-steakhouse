import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../core/services/seo.service';
import { ESTABLISHMENTS, MAIN_ESTABLISHMENT, SITE } from '../../core/data/restaurant';
import { MENU, SIGNATURE_DISHES } from '../../core/data/menu';
import { allRestaurantsJsonLd } from '../../core/data/structured-data';
import { SiteShellComponent } from '../../shared/layout/site-shell/site-shell.component';
import { PictureComponent } from '../../shared/components/picture/picture.component';
import { MarqueeComponent } from '../../shared/components/marquee/marquee.component';
import { RevealDirective } from '../../shared/animation/reveal.directive';
import { ParallaxDirective } from '../../shared/animation/parallax.directive';

/** Page d'accueil : la braise, le buffet, les incontournables, les deux adresses. */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SiteShellComponent, PictureComponent, MarqueeComponent, RevealDirective, ParallaxDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly site = SITE;
  readonly main = MAIN_ESTABLISHMENT;
  readonly establishments = ESTABLISHMENTS;
  readonly dishes = SIGNATURE_DISHES;
  readonly marquee = [
    'Grillades au charbon de bois',
    'Buffet à volonté',
    'Cuisine halal',
    'Ouvert 7 jours sur 7',
    'Villiers-le-Bel',
    'Fosses',
    'Plateaux à partager',
  ];

  /** Repères de prix lus dans la carte, pour ne jamais les dupliquer à la main. */
  readonly prices = (() => {
    const sections = MENU.flatMap((g) => g.sections);
    const find = (id: string) => sections.find((s) => s.id === id);
    const grill = find('grillades');
    const buffet = find('buffet-seul');
    const platter = find('plateau-mixte');
    return {
      grillFrom: Math.min(...(grill?.items.map((i) => i.priceLunch ?? Infinity) ?? [0])),
      buffetLunch: buffet?.items[0]?.priceLunch ?? 0,
      buffetDinner: buffet?.items[0]?.priceDinner ?? 0,
      platterTwo: platter?.items.find((i) => i.name.startsWith('2'))?.price ?? 0,
      kids: find('menu-enfants')?.items[0]?.price ?? 0,
    };
  })();

  constructor() {
    inject(SeoService).updateMetaTags({
      title: 'Steakhouse halal à Villiers-le-Bel, grillades au charbon de bois et buffet à volonté',
      description: SITE.description,
      keywords:
        'steakhouse halal, restaurant Villiers-le-Bel, grillades charbon de bois, buffet à volonté, côte de bœuf, restaurant turc 95, restaurant Fosses, iskender, adana',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE.name,
          url: SITE.url,
          inLanguage: 'fr',
        },
        ...allRestaurantsJsonLd(),
      ],
    });
  }

  format(price: number): string {
    return price.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
  }
}
