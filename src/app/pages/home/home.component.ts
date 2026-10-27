import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../core/services/seo.service';
import { ESTABLISHMENTS, MAIN_ESTABLISHMENT, SITE } from '../../core/data/restaurant';
import { SIGNATURE_DISHES } from '../../core/data/menu';
import { allRestaurantsJsonLd } from '../../core/data/structured-data';
import { SiteShellComponent } from '../../shared/layout/site-shell/site-shell.component';
import { PictureComponent } from '../../shared/components/picture/picture.component';
import { MarqueeComponent } from '../../shared/components/marquee/marquee.component';
import { RevealDirective } from '../../shared/animation/reveal.directive';
import { ParallaxDirective } from '../../shared/animation/parallax.directive';

/** Page d'accueil : le buffet, la braise, les incontournables, l'adresse. */
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
    'Buffet à volonté',
    'Entrées froides, entrées chaudes, plats cuisinés',
    'Grillades au charbon de bois',
    'Plats préparés à la minute',
    'Ouvert 7 jours sur 7',
    'Fosses, Val-d’Oise',
    'Plateaux à partager',
  ];

  constructor() {
    inject(SeoService).updateMetaTags({
      title: 'Buffet à volonté et grillades au charbon de bois à Fosses',
      description: SITE.description,
      keywords:
        'buffet à volonté Fosses, restaurant Fosses, grillades charbon de bois, steakhouse halal, côte de bœuf, restaurant turc 95, Val-d’Oise, iskender, adana',
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

}
