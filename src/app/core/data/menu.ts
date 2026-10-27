/**
 * La carte du Gourmet Steakhouse, retranscrite depuis le menu papier (octobre 2026).
 * Prix nets en euros, service compris. « Avec buffet » = accès au buffet d'entrées à volonté inclus.
 */

export interface MenuItem {
  name: string;
  description?: string;
  /** Prix unique */
  price?: number;
  /** Prix midi / soir quand ils diffèrent */
  priceLunch?: number;
  priceDinner?: number;
  /** Déclinaisons (ex. 25 cl / 50 cl, 37,5 cl / 75 cl) */
  variants?: { label: string; price: number }[];
}

export interface MenuSection {
  id: string;
  title: string;
  /** Mention sous le titre, ex. « Avec buffet » */
  note?: string;
  /** Texte d'intro facultatif */
  intro?: string;
  /** Entête des colonnes de prix quand midi/soir */
  columns?: { lunch: string; dinner: string };
  items: MenuItem[];
}

export interface MenuGroup {
  id: string;
  title: string;
  sections: MenuSection[];
}

export const MENU: MenuGroup[] = [
  {
    id: 'grillades',
    title: 'Grillades et plats',
    sections: [
      {
        id: 'grillades',
        title: 'Grillades',
        note: 'Avec buffet',
        intro: 'Cuites au charbon de bois, servies avec le buffet d’entrées à volonté.',
        columns: { lunch: 'Midi', dinner: 'Soir' },
        items: [
          { name: 'Brochette de poulet', priceLunch: 17.5, priceDinner: 21.5 },
          { name: 'Brochette d’agneau', priceLunch: 18.5, priceDinner: 22.5 },
          { name: 'Brochette d’adana', priceLunch: 17.5, priceDinner: 21.5 },
          { name: 'Côtelette d’agneau', priceLunch: 18.5, priceDinner: 22.5 },
          { name: 'Ailes de poulet', priceLunch: 17.5, priceDinner: 21.5 },
          { name: 'Escalope de poulet', priceLunch: 17.5, priceDinner: 21.5 },
          { name: 'Kofte', priceLunch: 17.5, priceDinner: 21.5 },
          { name: 'Pavé de rumsteck', priceLunch: 20.5, priceDinner: 24.5 },
          { name: 'Entrecôte', priceLunch: 22.5, priceDinner: 26.5 },
          { name: 'Côte de bœuf', priceLunch: 23.5, priceDinner: 27.5 },
        ],
      },
      {
        id: 'poisson',
        title: 'Poisson',
        note: 'Avec buffet',
        columns: { lunch: 'Midi', dinner: 'Soir' },
        items: [
          { name: 'Daurade', priceLunch: 23.5, priceDinner: 25.5 },
          { name: 'Pavé de saumon', priceLunch: 22.5, priceDinner: 24.5 },
        ],
      },
      {
        id: 'formule-mixte',
        title: 'Formule mixte',
        note: 'Une personne, avec buffet',
        intro: '½ brochette de poulet, ½ brochette d’agneau, ½ adana kebab, 1 côtelette d’agneau, 1 aile de poulet.',
        items: [{ name: 'Formule mixte une personne', price: 22.5 }],
      },
      {
        id: 'plateau-mixte',
        title: 'Plateau mixte',
        note: 'Avec buffet',
        intro: 'L’assortiment de nos grillades à partager, dressé sur plateau.',
        items: [
          { name: '1 personne', price: 22.5 },
          { name: '2 personnes', price: 45 },
          { name: '3 personnes', price: 64 },
          { name: '4 personnes', price: 84 },
        ],
      },
      {
        id: 'buffet-seul',
        title: 'Buffet seul',
        note: 'Sans grillades',
        intro: 'Entrées turques traditionnelles, salades fraîches, plats chauds et accompagnements, à volonté.',
        columns: { lunch: 'Midi', dinner: 'Soir' },
        items: [{ name: 'Buffet à volonté', priceLunch: 15.5, priceDinner: 19.5 }],
      },
      {
        id: 'plats-speciaux',
        title: 'Plats spéciaux Gourmet',
        note: 'Avec buffet',
        items: [
          {
            name: 'Ali nazik',
            description: 'Brochette de viande hachée ou brochette d’agneau, purée d’aubergine à l’ail',
            price: 23.5,
          },
          { name: 'Alti ezmeli', description: 'Brochette d’agneau à la sauce tomate, épicé', price: 23.5 },
          { name: 'Yogurtlu adana', description: 'Brochette de viande hachée au yaourt', price: 23.5 },
          { name: 'Hunkar begendi', description: 'Brochette d’agneau, caviar d’aubergine', price: 24.5 },
          { name: 'Iskender', description: 'Pain grillé au beurre, kebab, sauce tomate, yaourt', price: 24.5 },
        ],
      },
      {
        id: 'burgers',
        title: 'Burgers',
        note: 'Avec buffet',
        columns: { lunch: 'Midi', dinner: 'Soir' },
        items: [{ name: 'Burger maison', priceLunch: 17.5, priceDinner: 20.5 }],
      },
      {
        id: 'tapas',
        title: 'Tapas',
        note: 'Sans buffet',
        items: [{ name: 'Tapas pour 4 personnes', price: 15.5 }],
      },
      {
        id: 'menu-enfants',
        title: 'Menu enfants',
        note: 'Avec buffet',
        items: [
          { name: 'Hamburger', price: 9.5 },
          { name: 'Nuggets', price: 9.5 },
        ],
      },
      {
        id: 'dessert',
        title: 'Dessert à la carte',
        items: [{ name: 'Künefe avec glace', price: 10 }],
      },
    ],
  },
  {
    id: 'boissons',
    title: 'Boissons',
    sections: [
      {
        id: 'softs',
        title: 'Boissons fraîches',
        items: [
          { name: 'Coca-Cola 33 cl', price: 3.5 },
          { name: 'Coca-Cola zéro 33 cl', price: 3.5 },
          { name: 'Fanta 33 cl', price: 3.5 },
          { name: 'Oasis 33 cl', price: 3.5 },
          { name: 'Schweppes 33 cl', price: 3.5 },
          { name: 'Orangina 33 cl', price: 3.5 },
          { name: 'Perrier 33 cl', price: 3.5 },
          { name: 'Jus d’orange', price: 3.5 },
          { name: 'Jus d’ananas', price: 3.5 },
          { name: 'Jus de pomme', price: 3.5 },
          { name: 'Jus de fraise', price: 3.5 },
          { name: 'Ayran fait maison', price: 3.5 },
          { name: 'Evian 33 cl', price: 3.5 },
          { name: 'San Pellegrino 33 cl', price: 3.5 },
          { name: 'Evian 1 l', price: 5.5 },
          { name: 'San Pellegrino 1 l', price: 5.5 },
        ],
      },
      {
        id: 'chaudes',
        title: 'Boissons chaudes',
        items: [
          { name: 'Café', price: 2.5 },
          { name: 'Thé turc', price: 2.5 },
          { name: 'Café turc', price: 3.5 },
        ],
      },
      {
        id: 'cocktails',
        title: 'Cocktails',
        intro: 'Cocktails avec alcool 9 €, cocktails sans alcool 7 €.',
        items: [
          { name: 'Mojito', description: 'Rhum, menthe, citron vert, sucre, eau gazeuse', price: 9 },
          { name: 'Spritz Apérol', description: 'Apérol, vin pétillant, eau gazeuse', price: 9 },
          { name: 'Cuba libre', description: 'Rhum, cola, citron', price: 9 },
          { name: 'Gin tonic', description: 'Gin, tonic, citron', price: 9 },
          { name: 'Tequila sunrise', description: 'Tequila, jus d’orange, grenadine', price: 9 },
          { name: 'Caïpirinha', description: 'Cachaça, citron vert, sucre de canne', price: 9 },
          { name: 'Piña colada', description: 'Rhum, jus d’ananas, crème de coco', price: 9 },
          { name: 'La Parisienne', description: 'Liqueur St-Germain, citron vert, framboise, Schweppes tonic', price: 9 },
          { name: 'Virgin mojito', description: 'Menthe, citron vert, sucre, eau gazeuse', price: 7 },
          { name: 'Cocktail tropical', description: 'Jus d’ananas, orange, grenadine', price: 7 },
          { name: 'Citronnade fraîche', description: 'Jus de citron, sucre, eau pétillante', price: 7 },
          { name: 'Cocktail fruits rouges', description: 'Jus de fruits rouges, citron, eau gazeuse', price: 7 },
          { name: 'Sunset exotic', description: 'Mangue, ananas, passion, grenadine', price: 7 },
          { name: 'Pêche framboise fizz', description: 'Purée de pêche, framboise, limonade', price: 7 },
        ],
      },
      {
        id: 'aperitifs',
        title: 'Apéritifs',
        items: [
          { name: 'Monaco', price: 5.5 },
          { name: 'Martini blanc', price: 6.5 },
          { name: 'Martini rouge', price: 6.5 },
          { name: 'Ricard', price: 5.5 },
          { name: 'Kir vin blanc', price: 7.5 },
          { name: 'Kir royal', price: 9.5 },
          { name: 'Porto blanc', price: 5.5 },
          { name: 'Porto rouge', price: 5.5 },
        ],
      },
      {
        id: 'spiritueux',
        title: 'Spiritueux',
        items: [
          { name: 'Chivas', price: 10 },
          { name: 'Jack Daniel’s', price: 9 },
          { name: 'Absolut vodka', price: 8 },
          { name: 'Grey Goose', price: 9 },
          { name: 'Yeni raki', price: 9 },
          { name: 'Raki Gold', price: 10 },
        ],
      },
      {
        id: 'bouteilles',
        title: 'Spiritueux en bouteille',
        items: [
          { name: 'Yeni raki', variants: [{ label: '35 cl', price: 70 }, { label: '70 cl', price: 110 }] },
          { name: 'Raki Gold', variants: [{ label: '35 cl', price: 80 }, { label: '70 cl', price: 120 }] },
          { name: 'Absolut vodka', variants: [{ label: '35 cl', price: 70 }, { label: '70 cl', price: 110 }] },
          { name: 'Chivas', variants: [{ label: '70 cl', price: 150 }] },
          { name: 'Jack Daniel’s', variants: [{ label: '70 cl', price: 120 }] },
          { name: 'Vodka Grey Goose', variants: [{ label: '70 cl', price: 160 }] },
        ],
      },
      {
        id: 'digestifs',
        title: 'Digestifs',
        items: [
          { name: 'Get 27', price: 7 },
          { name: 'Baileys', price: 7 },
          { name: 'Cognac', price: 7 },
        ],
      },
      {
        id: 'bieres',
        title: 'Bières',
        items: [
          { name: 'Desperados', description: 'Bouteille', price: 5.5 },
          { name: 'Corona', description: 'Bouteille', price: 5.5 },
          { name: 'Efes', description: 'Bouteille', price: 5.5 },
          { name: 'Heineken pression', variants: [{ label: '25 cl', price: 4 }, { label: '50 cl', price: 7 }] },
          { name: 'Affligem pression', variants: [{ label: '25 cl', price: 4 }, { label: '50 cl', price: 7 }] },
        ],
      },
      {
        id: 'vins',
        title: 'Vins',
        items: [
          { name: 'Vin au verre', description: 'Rouge, rosé ou blanc', price: 4.5 },
          { name: 'Yakut', description: 'Rouge', variants: [{ label: '37,5 cl', price: 15 }, { label: '75 cl', price: 25 }] },
          { name: 'Saint-Émilion', description: 'Rouge', variants: [{ label: '37,5 cl', price: 21 }, { label: '75 cl', price: 38 }] },
          { name: 'Pinot noir', description: 'Rouge', variants: [{ label: '75 cl', price: 36 }] },
          { name: 'Saint-Joseph', description: 'Rouge', variants: [{ label: '75 cl', price: 75 }] },
          { name: 'Lal', description: 'Rosé', variants: [{ label: '70 cl', price: 42 }] },
          { name: 'Côte de Provence', description: 'Rosé', variants: [{ label: '37,5 cl', price: 16 }, { label: '75 cl', price: 29 }] },
          { name: 'Chardonnay', description: 'Blanc', variants: [{ label: '75 cl', price: 25 }] },
          { name: 'Chablis', description: 'Blanc', variants: [{ label: '75 cl', price: 55 }] },
        ],
      },
    ],
  },
];

export const ALCOHOL_NOTICE =
  'L’abus d’alcool est dangereux pour la santé, à consommer avec modération. Prix nets, service compris.';

/** Plats mis en avant sur la page d'accueil, avec leur visuel. */
export interface SignatureDish {
  name: string;
  description: string;
  image: string;
  alt: string;
  price: string;
}

export const SIGNATURE_DISHES: SignatureDish[] = [
  {
    name: 'Côte de bœuf',
    description: 'Saisie au charbon de bois, servie avec frites maison, tomate et piment grillés.',
    image: 'cote-de-boeuf-frites-decoupe',
    alt: 'Côte de bœuf grillée découpée au couteau, servie avec des frites',
    price: 'dès 23,50 €',
  },
  {
    name: 'Plateau mixte',
    description: 'Brochettes de poulet et d’agneau, adana, côtelettes et ailes à partager.',
    image: 'plateau-grillades-mixtes-piments-grilles',
    alt: 'Plateau de grillades mixtes avec piments grillés',
    price: 'dès 22,50 €',
  },
  {
    name: 'Iskender',
    description: 'Pain grillé au beurre, kebab, sauce tomate et yaourt, servi sur plat en fonte.',
    image: 'iskender-kebab-plat-en-fonte',
    alt: 'Iskender kebab servi dans un plat en fonte avec du yaourt',
    price: '24,50 €',
  },
  {
    name: 'Pavé de saumon',
    description: 'Grillé à la braise, accompagné de frites et de légumes grillés.',
    image: 'pave-de-saumon-grille-frites',
    alt: 'Pavé de saumon grillé avec des frites',
    price: 'dès 22,50 €',
  },
];
