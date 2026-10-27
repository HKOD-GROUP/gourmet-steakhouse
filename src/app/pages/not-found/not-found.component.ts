import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../core/services/seo.service';
import { SiteShellComponent } from '../../shared/layout/site-shell/site-shell.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, SiteShellComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-site-shell>
      <section class="section nf" aria-labelledby="nf-titre">
        <div class="container-site nf__inner">
          <p class="display-xl nf__code" aria-hidden="true">404</p>
          <h1 id="nf-titre" class="display-md">Cette page n’existe pas</h1>
          <p class="nf__text muted">
            L’adresse a peut-être changé, ou le lien que vous avez suivi n’est plus valide.
          </p>
          <div class="nf__actions">
            <a routerLink="/" class="btn">Retour à l’accueil</a>
            <a routerLink="/carte" class="btn btn--ghost">Voir la carte</a>
          </div>
        </div>
      </section>
    </app-site-shell>
  `,
  styles: [
    `
      .nf__inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .nf__code {
        margin: 0;
        color: var(--bordeaux);
      }

      h1 {
        margin: 24px 0 0;
      }

      .nf__text {
        max-width: 28rem;
        margin: 16px 0 0;
      }

      .nf__actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 12px;
        margin-top: 32px;
      }
    `,
  ],
})
export class NotFoundComponent {
  constructor() {
    inject(SeoService).updateMetaTags({
      title: 'Page introuvable',
      description: 'La page demandée n’existe pas sur le site du Gourmet Steakhouse.',
      noIndex: true,
    });
  }
}
