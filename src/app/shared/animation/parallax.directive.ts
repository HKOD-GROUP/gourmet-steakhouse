import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

import { MotionService } from './motion.service';

/**
 * Parallaxe douce : expose `--parallax` (px) sur l'élément, calculé d'après sa
 * position par rapport au centre de la fenêtre. Le style global `.parallax`
 * applique la translation à l'image contenue (`app-picture`), légèrement
 * agrandie pour ne jamais laisser de bord vide.
 */
@Directive({
  selector: '[appParallax]',
  standalone: true,
  host: { class: 'parallax' },
})
export class ParallaxDirective {
  /** Intensité : 0,1 = l'image se décale de 10 % du déplacement relatif. */
  readonly parallaxSpeed = input<number>(0.08);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (motion.reduced) return;

      let ticking = false;
      const update = () => {
        ticking = false;
        const rect = el.getBoundingClientRect();
        const viewport = window.innerHeight;
        if (rect.bottom < 0 || rect.top > viewport) return;
        const offset = rect.top + rect.height / 2 - viewport / 2;
        el.style.setProperty('--parallax', `${(-offset * this.parallaxSpeed()).toFixed(1)}px`);
      };
      const schedule = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      };

      update();
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule, { passive: true });
      destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
      });
    });
  }
}
