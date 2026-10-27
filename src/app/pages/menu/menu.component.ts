import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { formatNumber } from '@angular/common';
import { RouterLink } from '@angular/router';

import { SiteShellComponent } from '../../shared/layout/site-shell/site-shell.component';
import { SeoService } from '../../core/services/seo.service';
import { ALCOHOL_NOTICE, MENU, MenuItem, MenuSection } from '../../core/data/menu';
import { MAIN_ESTABLISHMENT } from '../../core/data/restaurant';
import { breadcrumbJsonLd, menuJsonLd } from '../../core/data/structured-data';

/**
 * Page « La carte » (/carte) : la carte complète lue depuis `MENU`,
 * avec un sommaire d’ancres collant sous l’en-tête du site.
 */
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [SiteShellComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly groups = MENU;
  readonly sections: MenuSection[] = MENU.flatMap((group) => group.sections);
  readonly main = MAIN_ESTABLISHMENT;
  readonly alcoholNotice = ALCOHOL_NOTICE;

  /** Prix du buffet seul (midi / soir), lus dans la section `buffet-seul`. */
  readonly buffet: MenuItem | undefined = this.sections.find((s) => s.id === 'buffet-seul')?.items[0];

  /** Identifiant de la section visible à l’écran (souligné dans le sommaire). */
  readonly activeSection = signal<string | null>(null);

  constructor() {
    inject(SeoService).updateMetaTags({
      title: 'La carte : grillades, buffet et boissons',
      description:
        'La carte du Gourmet Steakhouse, steakhouse halal à Villiers-le-Bel (95) : côte de bœuf, entrecôte, brochettes et kebabs grillés au charbon de bois, servis avec le buffet d’entrées à volonté. Prix midi et soir, menu enfants, cocktails, vins et boissons.',
      keywords:
        'carte steakhouse halal Villiers-le-Bel, côte de bœuf halal, entrecôte, brochettes, buffet à volonté, prix, restaurant halal 95, grillades charbon de bois',
      jsonLd: [menuJsonLd(), breadcrumbJsonLd([{ name: 'La carte', path: '/carte' }])],
    });

    const destroyRef = inject(DestroyRef);

    // Uniquement dans le navigateur, une fois le DOM rendu : suivi de la section visible.
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') return;

      const root = this.host.nativeElement;
      const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-menu-section]'));
      if (targets.length === 0) return;

      const order = targets.map((el) => el.id);
      const visible = new Set<string>();

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visible.add(entry.target.id);
            else visible.delete(entry.target.id);
          }
          const first = order.find((id) => visible.has(id));
          if (first && first !== this.activeSection()) {
            this.activeSection.set(first);
            this.revealTocLink(first);
          }
        },
        {
          // Bande de détection : sous l’en-tête du site et le sommaire, jusqu’à
          // un peu au-dessus du milieu de la fenêtre.
          rootMargin: `-${this.stickyOffset()}px 0px -55% 0px`,
          threshold: 0,
        },
      );

      targets.forEach((el) => observer.observe(el));
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  /** Prix en français : « 17,50 € », « 70 € » (espace insécable avant le symbole). */
  price(value: number): string {
    const digits = Number.isInteger(value) ? '1.0-0' : '1.2-2';
    return `${formatNumber(value, 'fr-FR', digits)} €`;
  }

  /**
   * Clic sur une ancre du sommaire : défilement vers la section sans passer
   * par le routeur (évite la transition de vue sur un simple changement de
   * fragment). Sans JavaScript, le `href` natif fait le travail.
   */
  goTo(event: Event, id: string): void {
    const target = this.host.nativeElement.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ block: 'start' });
    target.focus({ preventScroll: true });
  }

  /** Hauteur cumulée de l’en-tête du site et du sommaire collant. */
  private stickyOffset(): number {
    const toc = this.host.nativeElement.querySelector<HTMLElement>('.toc');
    const header = toc ? parseFloat(getComputedStyle(toc).top) || 0 : 0;
    return header + (toc?.offsetHeight ?? 0);
  }

  /** Sur mobile, fait défiler le sommaire pour garder le lien actif visible. */
  private revealTocLink(id: string): void {
    const list = this.host.nativeElement.querySelector<HTMLElement>('.toc__list');
    const link = list?.querySelector<HTMLElement>(`a[href="#${CSS.escape(id)}"]`);
    if (!list || !link || list.scrollWidth <= list.clientWidth) return;

    const left = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    list.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' });
  }
}
