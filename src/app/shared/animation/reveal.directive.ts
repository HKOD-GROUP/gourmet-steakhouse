import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

import { MotionService } from './motion.service';

/**
 * Révèle l'élément quand il entre dans la fenêtre (classe `is-visible`).
 *
 * Le style de l'état caché et de la transition est global (`styles.scss`,
 * section « Mouvement ») et n'est actif que si `<html>` porte la classe `anim`,
 * ajoutée par un script en ligne avant le premier rendu : sans JavaScript, tout
 * reste visible.
 *
 * Variantes (classes à ajouter à côté de `appReveal`) :
 * - (défaut)        : fondu + légère montée
 * - `reveal--lines` : chaque `.line > span` monte depuis le bas, en cascade
 * - `reveal--clip`  : l'image se dévoile du haut vers le bas, avec un zoom qui se pose
 * - `reveal--wipe`  : un panneau bordeaux balaie l'image et disparaît
 * - `reveal--stagger` : les enfants directs apparaissent les uns après les autres
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
  host: { class: 'reveal' },
})
export class RevealDirective {
  /** Délai supplémentaire (ms) avant la transition, pour orchestrer une séquence. */
  readonly revealDelay = input<number>(0);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (motion.reduced || typeof IntersectionObserver === 'undefined') {
        el.classList.add('is-visible');
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const delay = this.revealDelay() + motion.enterDelay();
            el.style.setProperty('--reveal-delay', `${Math.round(delay)}ms`);
            el.classList.add('is-visible');
            observer.disconnect();
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      );

      observer.observe(el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
