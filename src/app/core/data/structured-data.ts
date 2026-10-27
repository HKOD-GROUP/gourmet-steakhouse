import { ESTABLISHMENTS, Establishment, MAIN_ESTABLISHMENT, SITE } from './restaurant';
import { ALCOHOL_NOTICE, MENU, MenuItem } from './menu';

/** Un établissement au format schema.org `Restaurant`. */
export function restaurantJsonLd(e: Establishment = MAIN_ESTABLISHMENT): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE.url}/#${e.id}`,
    name: e.name,
    url: SITE.url,
    image: `${SITE.url}/og-image.jpg`,
    logo: `${SITE.url}/images/logo/gourmet-steakhouse-logo-brun.png`,
    telephone: e.phoneHref,
    servesCuisine: SITE.cuisine,
    priceRange: SITE.priceRange,
    acceptsReservations: 'True',
    hasMenu: `${SITE.url}/carte`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: e.streetAddress,
      postalCode: e.postalCode,
      addressLocality: e.city,
      addressRegion: 'Île-de-France',
      addressCountry: 'FR',
    },
    ...(e.geo
      ? { geo: { '@type': 'GeoCoordinates', latitude: e.geo.lat, longitude: e.geo.lng } }
      : {}),
    openingHoursSpecification: e.openingHours.map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
  };
}

/** Tous les établissements (page d'accueil et infos pratiques). */
export function allRestaurantsJsonLd(): object[] {
  return ESTABLISHMENTS.map((e) => restaurantJsonLd(e));
}

function offers(item: MenuItem): object[] {
  const list: { label?: string; price: number }[] = [];
  if (item.price !== undefined) list.push({ price: item.price });
  if (item.priceLunch !== undefined) list.push({ label: 'Midi', price: item.priceLunch });
  if (item.priceDinner !== undefined) list.push({ label: 'Soir', price: item.priceDinner });
  for (const v of item.variants ?? []) list.push({ label: v.label, price: v.price });
  return list.map((o) => ({
    '@type': 'Offer',
    price: o.price.toFixed(2),
    priceCurrency: 'EUR',
    ...(o.label ? { name: o.label } : {}),
  }));
}

/** La carte au format schema.org `Menu` (page /carte). */
export function menuJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${SITE.url}/carte#menu`,
    name: `La carte du ${SITE.name}`,
    url: `${SITE.url}/carte`,
    inLanguage: 'fr',
    description: ALCOHOL_NOTICE,
    hasMenuSection: MENU.flatMap((group) =>
      group.sections.map((section) => ({
        '@type': 'MenuSection',
        name: section.title,
        ...(section.intro ? { description: section.intro } : {}),
        hasMenuItem: section.items.map((item) => ({
          '@type': 'MenuItem',
          name: item.name,
          ...(item.description ? { description: item.description } : {}),
          offers: offers(item),
        })),
      })),
    ),
  };
}

/** Fil d'Ariane pour les pages intérieures. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Accueil', path: '/' }, ...items].map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path === '/' ? '' : it.path}`,
    })),
  };
}
