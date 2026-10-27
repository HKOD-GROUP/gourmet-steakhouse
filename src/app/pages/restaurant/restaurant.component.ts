import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../core/services/seo.service';
import { MAIN_ESTABLISHMENT, SITE } from '../../core/data/restaurant';
import { breadcrumbJsonLd, restaurantJsonLd } from '../../core/data/structured-data';
import { SiteShellComponent } from '../../shared/layout/site-shell/site-shell.component';
import { PictureComponent } from '../../shared/components/picture/picture.component';
import { RevealDirective } from '../../shared/animation/reveal.directive';
import { ParallaxDirective } from '../../shared/animation/parallax.directive';

interface Chapter {
  title: string;
  text: string;
  image: string;
  alt: string;
}

/** Page « Le restaurant » : la braise, le buffet, les plats, la galerie. */
@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [RouterLink, SiteShellComponent, PictureComponent, RevealDirective, ParallaxDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss',
})
export class RestaurantComponent {
  readonly site = SITE;
  readonly main = MAIN_ESTABLISHMENT;

  readonly chapters: Chapter[] = [
    {
      title: 'La braise',
      text:
        'Tout part du gril au charbon de bois. Les pièces de bœuf y sont saisies à la demande, les brochettes tournent au-dessus des braises, l’adana prend sa croûte. Pas de plancha, pas de four : la fumée, la chaleur vive et le temps qu’il faut.',
      image: 'cuisson-au-charbon-de-bois-entrecote-adana',
      alt: 'Entrecôte et brochette adana sur le gril au charbon de bois',
    },
    {
      title: 'Le buffet',
      text:
        'Avant la viande, le buffet. Mezzés turcs, salades fraîches, boulgour, légumes, plats chauds et accompagnements : on se sert, on revient, on compose son assiette comme on veut. Il est compris avec chaque grillade et se prend aussi seul.',
      image: 'assiette-buffet-boulgour-legumes-onion-rings',
      alt: 'Assiette composée au buffet : boulgour, brocolis, chou-fleur et onion rings',
    },
    {
      title: 'À partager',
      text:
        'Le plateau mixte réunit brochettes de poulet et d’agneau, adana, côtelettes et ailes, dressé pour deux, trois ou quatre. C’est la table du dimanche, celle des anniversaires et des grandes tablées.',
      image: 'grillades-mixtes-dressage-en-cuisine',
      alt: 'Dressage d’un plateau de grillades mixtes en cuisine',
    },
    {
      title: 'Les plats en fonte',
      text:
        'Iskender, ali nazik, hunkar begendi, alti ezmeli : les spécialités arrivent brûlantes dans leur plat en fonte, avec le yaourt, la sauce tomate ou la purée d’aubergine qui les accompagne. La cuisine turque telle qu’on la sert à la maison.',
      image: 'viande-mijotee-sauce-tomate-plat-en-fonte',
      alt: 'Viande mijotée à la sauce tomate servie dans un plat en fonte',
    },
  ];

  readonly gallery = [
    { image: 'cote-de-boeuf-frites-decoupe', alt: 'Côte de bœuf découpée au couteau, frites et tomate grillée' },
    { image: 'iskender-kebab-vue-de-dessus', alt: 'Iskender kebab vu de dessus, avec yaourt et tomates' },
    { image: 'pave-de-saumon-grille-service', alt: 'Pavé de saumon grillé servi avec des frites' },
    { image: 'grillades-mixtes-vue-de-dessus', alt: 'Grillades mixtes vues de dessus : côtelettes, adana et brochettes' },
    { image: 'iskender-kebab-degustation', alt: 'Dégustation d’un iskender kebab' },
    { image: 'plateau-grillades-mixtes-piments-grilles', alt: 'Plateau de grillades mixtes et piments grillés' },
  ];

  constructor() {
    inject(SeoService).updateMetaTags({
      title: 'Le restaurant : la braise, le buffet et la cuisine turque',
      description:
        'Découvrez le Gourmet Steakhouse à Fosses : un gril au charbon de bois, un buffet d’entrées à volonté, des plateaux à partager et des spécialités turques servies en plat de fonte. Cuisine halal.',
      keywords:
        'restaurant halal Fosses, grill charbon de bois, buffet turc à volonté, plateau mixte, iskender, restaurant familial 95',
      jsonLd: [restaurantJsonLd(), breadcrumbJsonLd([{ name: 'Le restaurant', path: '/le-restaurant' }])],
    });
  }
}
