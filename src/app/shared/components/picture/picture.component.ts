import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Image responsive : `<picture>` avec WebP + repli JPEG.
 *
 * Les visuels sont dans `public/images/<dossier>/<nom>-<largeur>.{webp,jpg}`.
 * - plats : largeurs 600 et 1200 (portrait 3:4,5)
 * - hero  : largeurs 1000 et 2000 (paysage 16:9)
 *
 * Exemple : `<app-picture folder="plats" name="cote-de-boeuf-frites-decoupe" alt="…" />`
 */
@Component({
  selector: 'app-picture',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <picture>
      <source type="image/webp" [attr.srcset]="webpSrcset()" [attr.sizes]="sizes()" />
      <img
        [src]="fallbackSrc()"
        [attr.srcset]="jpgSrcset()"
        [attr.sizes]="sizes()"
        [alt]="alt()"
        [attr.width]="width()"
        [attr.height]="height()"
        [attr.loading]="loading()"
        [attr.fetchpriority]="priority() ? 'high' : null"
        [attr.decoding]="priority() ? 'sync' : 'async'"
        [class]="imgClass()"
        draggable="false"
      />
    </picture>
  `,
  styles: [
    `
      :host { display: block; }
      picture, img { display: block; width: 100%; height: 100%; }
      img { object-fit: cover; }
    `,
  ],
})
export class PictureComponent {
  readonly folder = input<'plats' | 'hero'>('plats');
  readonly name = input.required<string>();
  readonly alt = input.required<string>();
  /** Attribut `sizes` : par défaut, pleine largeur sur mobile, demi-largeur ensuite. */
  readonly sizes = input<string>('(max-width: 768px) 100vw, 50vw');
  readonly loading = input<'lazy' | 'eager'>('lazy');
  /** Image LCP (héros) : fetchpriority high, décodage synchrone. */
  readonly priority = input<boolean>(false);
  readonly imgClass = input<string>('');

  private readonly widths = computed(() => (this.folder() === 'hero' ? [1000, 2000] : [600, 1200]));
  private readonly ratio = computed(() => (this.folder() === 'hero' ? 1125 / 2000 : 1600 / 1200));

  readonly width = computed(() => this.widths()[1]);
  readonly height = computed(() => Math.round(this.widths()[1] * this.ratio()));

  private readonly base = computed(() => `/images/${this.folder()}/${this.name()}`);

  readonly webpSrcset = computed(() =>
    this.widths().map((w) => `${this.base()}-${w}.webp ${w}w`).join(', '),
  );
  readonly jpgSrcset = computed(() =>
    this.widths().map((w) => `${this.base()}-${w}.jpg ${w}w`).join(', '),
  );
  readonly fallbackSrc = computed(() => `${this.base()}-${this.widths()[1]}.jpg`);
}
