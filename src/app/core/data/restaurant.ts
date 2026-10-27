/**
 * Informations pratiques du restaurant.
 * Fichier unique à corriger si une adresse, un téléphone ou un horaire change :
 * tout le site (pages, pied de page, données structurées SEO) lit ces valeurs.
 */

export interface OpeningSlot {
  /** Jours concernés (schema.org : Monday … Sunday) */
  days: string[];
  /** Libellé affiché, ex. « Tous les jours » */
  label: string;
  opens: string;
  closes: string;
}

export interface Establishment {
  id: string;
  name: string;
  city: string;
  streetAddress: string;
  postalCode: string;
  phone: string;
  /** Téléphone au format international pour les liens tel: et le SEO */
  phoneHref: string;
  mapsUrl: string;
  geo?: { lat: number; lng: number };
  openingHours: OpeningSlot[];
}

export const SITE = {
  name: 'Gourmet Steakhouse',
  domain: 'gourmet-steakhouse.fr',
  url: 'https://gourmet-steakhouse.fr',
  tagline: 'Grillades au charbon de bois et buffet à volonté',
  description:
    'Gourmet Steakhouse, restaurant halal à Fosses (95) : côte de bœuf, entrecôte, brochettes et kebabs grillés au charbon de bois, servis avec un buffet d’entrées à volonté. Ouvert midi et soir, 7 jours sur 7.',
  legalName: 'Gourmet Steakhouse',
  email: 'contact@gourmet-steakhouse.fr',
  socials: {
    instagram: '',
    facebook: '',
  },
  cuisine: ['Steakhouse', 'Grillades', 'Cuisine turque', 'Halal'],
};

export const ESTABLISHMENTS: Establishment[] = [
  {
    id: 'fosses',
    name: 'Gourmet Steakhouse',
    city: 'Fosses',
    streetAddress: '5 rue de la Ferme Saint-Ladre',
    postalCode: '95470',
    phone: '01 34 68 58 88',
    phoneHref: '+33134685888',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gourmet+Steakhouse+5+rue+de+la+Ferme+Saint-Ladre+95470+Fosses',
    openingHours: [
      {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        label: 'Tous les jours, midi',
        opens: '11:00',
        closes: '15:00',
      },
      {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        label: 'Tous les jours, soir',
        opens: '18:30',
        closes: '23:00',
      },
    ],
  },
];

/** Établissement principal (mis en avant sur la page d'accueil) */
export const MAIN_ESTABLISHMENT = ESTABLISHMENTS[0];
