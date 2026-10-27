import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ESTABLISHMENTS } from '../../core/data/restaurant';
import { allRestaurantsJsonLd, breadcrumbJsonLd } from '../../core/data/structured-data';
import { SeoService } from '../../core/services/seo.service';
import { PictureComponent } from '../../shared/components/picture/picture.component';
import { SiteShellComponent } from '../../shared/layout/site-shell/site-shell.component';

/** Photo illustrant chaque établissement (repli sur la première si l'id est inconnu). */
const PHOTOS: Record<string, { name: string; alt: string }> = {
  'villiers-le-bel': {
    name: 'table-cote-de-boeuf-adana-iskender',
    alt: 'Table dressée avec côte de bœuf, adana et iskender kebab au Gourmet Steakhouse de Villiers-le-Bel',
  },
  fosses: {
    name: 'plateau-grillades-mixtes-piments-grilles',
    alt: 'Plateau de grillades mixtes et piments grillés au Gourmet Steakhouse de Fosses',
  },
};

const DEFAULT_PHOTO = PHOTOS['villiers-le-bel'];

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, SiteShellComponent, PictureComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly establishments = ESTABLISHMENTS;

  constructor() {
    inject(SeoService).updateMetaTags({
      title: 'Infos pratiques : adresses, horaires, réservation',
      description:
        'Adresses, horaires et téléphone du Gourmet Steakhouse, restaurant halal à Villiers-le-Bel et à Fosses (Val-d’Oise). Ouvert 7 jours sur 7 midi et soir, réservation par téléphone.',
      keywords:
        'restaurant halal Villiers-le-Bel, restaurant halal Fosses, steakhouse Val-d’Oise, horaires, réservation, grillades charbon de bois',
      jsonLd: [
        ...allRestaurantsJsonLd(),
        breadcrumbJsonLd([{ name: 'Infos pratiques', path: '/infos-pratiques' }]),
      ],
    });
  }

  photo(id: string): { name: string; alt: string } {
    return PHOTOS[id] ?? DEFAULT_PHOTO;
  }
}
