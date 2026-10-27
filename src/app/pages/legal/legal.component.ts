import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MAIN_ESTABLISHMENT, SITE } from '../../core/data/restaurant';
import { breadcrumbJsonLd } from '../../core/data/structured-data';
import { SeoService } from '../../core/services/seo.service';
import { SiteShellComponent } from '../../shared/layout/site-shell/site-shell.component';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [RouterLink, SiteShellComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './legal.component.html',
  styleUrl: './doc.scss',
})
export class LegalComponent {
  readonly site = SITE;
  readonly main = MAIN_ESTABLISHMENT;

  constructor() {
    inject(SeoService).updateMetaTags({
      title: 'Mentions légales',
      description: `Mentions légales du site ${SITE.name} : éditeur, directeur de publication, hébergement, propriété intellectuelle et responsabilité.`,
      jsonLd: breadcrumbJsonLd([{ name: 'Mentions légales', path: '/mentions-legales' }]),
    });
  }
}
