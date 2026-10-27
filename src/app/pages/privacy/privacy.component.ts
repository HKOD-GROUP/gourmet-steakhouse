import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MAIN_ESTABLISHMENT, SITE } from '../../core/data/restaurant';
import { breadcrumbJsonLd } from '../../core/data/structured-data';
import { SeoService } from '../../core/services/seo.service';
import { SiteShellComponent } from '../../shared/layout/site-shell/site-shell.component';
import { RevealDirective } from '../../shared/animation/reveal.directive';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterLink, SiteShellComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './privacy.component.html',
  styleUrl: '../legal/doc.scss',
})
export class PrivacyComponent {
  readonly site = SITE;
  readonly main = MAIN_ESTABLISHMENT;

  constructor() {
    inject(SeoService).updateMetaTags({
      title: 'Politique de confidentialité',
      description: `Politique de confidentialité du site ${SITE.name} : aucune donnée personnelle collectée, aucun cookie de suivi, aucun traceur tiers. Vos droits et le contact RGPD.`,
      jsonLd: breadcrumbJsonLd([{ name: 'Politique de confidentialité', path: '/confidentialite' }]),
    });
  }
}
