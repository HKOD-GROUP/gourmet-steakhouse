import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Bandeau de texte qui défile lentement, en boucle continue (la liste est
 * doublée pour que la jonction soit invisible). Statique si l'utilisateur
 * a demandé moins de mouvement.
 */
@Component({
  selector: 'app-marquee',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="marquee" aria-hidden="true">
      <div class="marquee__track">
        @for (item of items(); track $index) {
          <span class="marquee__item">{{ item }}</span>
        }
        @for (item of items(); track $index) {
          <span class="marquee__item">{{ item }}</span>
        }
      </div>
    </div>
    <p class="visually-hidden">{{ items().join('. ') }}.</p>
  `,
  styles: [
    `
      :host {
        display: block;
        background: var(--bordeaux);
        color: var(--blanc);
        overflow: hidden;
      }
      .marquee {
        overflow: hidden;
        padding: 18px 0;
        mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
      }
      .marquee__track {
        display: flex;
        width: max-content;
        animation: marquee 48s linear infinite;
      }
      .marquee__item {
        display: inline-flex;
        align-items: center;
        font-family: var(--font-display);
        font-weight: 600;
        font-size: 24px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        white-space: nowrap;
        padding-right: 44px;
      }
      .marquee__item::after {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        margin-left: 44px;
        background: var(--cuivre);
        transform: rotate(45deg);
      }
      @keyframes marquee {
        to {
          transform: translateX(-50%);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .marquee__track {
          animation: none;
        }
      }
    `,
  ],
})
export class MarqueeComponent {
  readonly items = input.required<string[]>();
}
