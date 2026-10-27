import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { SITE } from '../data/restaurant';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  /**
   * Données structurées schema.org injectées dans un `<script type="application/ld+json">`.
   * Rendu côté serveur (prérendu) : Google les lit sans exécuter l'application.
   */
  jsonLd?: object | object[];
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private meta = inject(Meta);
  private title = inject(Title);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  private readonly siteName = SITE.name;
  private readonly siteUrl = SITE.url;
  private readonly defaultImage = `${SITE.url}/og-image.jpg`;

  updateMetaTags(config: SeoConfig): void {
    const fullTitle = `${config.title} | ${this.siteName}`;
    const path = this.router.url.split('?')[0].split('#')[0];
    const currentUrl = `${this.siteUrl}${path === '/' ? '' : path}`;
    const image = config.ogImage || this.defaultImage;

    // Title
    this.title.setTitle(fullTitle);

    // Basic Meta Tags
    this.meta.updateTag({ name: 'description', content: config.description });

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Robots
    if (config.noIndex) {
      this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    } else {
      this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    }

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: currentUrl });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:type', content: config.ogType || 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:locale', content: 'fr_FR' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    // Canonical URL + données structurées : manipulés via DOCUMENT, qui existe
    // aussi côté serveur (domino), donc présents dans le HTML prérendu.
    this.updateCanonicalUrl(currentUrl);
    this.updateJsonLd(config.jsonLd);
  }

  private updateCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }

  private updateJsonLd(data: object | object[] | undefined): void {
    const id = 'seo-json-ld';
    let script: HTMLScriptElement | null = this.document.getElementById(id) as HTMLScriptElement | null;

    if (!data) {
      script?.remove();
      return;
    }

    if (!script) {
      script = this.document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);
  }

  /** Vrai uniquement dans le navigateur (utile aux composants). */
  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
