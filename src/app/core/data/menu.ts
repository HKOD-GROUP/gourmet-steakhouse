/**
 * La carte du Gourmet Steakhouse, retranscrite depuis le menu papier (octobre 2026).
 * Les prix ne sont volontairement pas publiés sur le site : seule la carte au restaurant fait foi.
 * Deux offres distinctes : le buffet à volonté (indépendant) et les grillades / plats à la carte.
 */

export interface MenuItem {
  name: string;
  description?: string;
}

export interface MenuSection {
  id: string;
  title: string;
  /** Mention sous le titre, ex. « À la carte » */
  note?: string;
  /** Texte d'intro facultatif */
  intro?: string;
  items: MenuItem[];
}

export interface MenuGroup {
  id: string;
  title: string;
  sections: MenuSection[];
}

export const MENU: MenuGroup[] = [
  {
    id: 'buffet',
    title: 'Buffet à volonté',
    sections: [
      {
        id: 'buffet-a-volonte',
        title: 'Le buffet',
        note: 'Servi midi et soir',
        intro:
          'Le buffet se suffit à lui-même : on en profite sans rien commander d’autre. On se sert, on revient, on compose son assiette comme on veut.',
        items: [
          { name: 'Entrées froides' },
          { name: 'Entrées chaudes' },
          {
            name: 'Plats cuisinés',
            description: 'Lasagnes, bœuf accompagné de riz et d’autres préparations',
          },
        ],
      },
    ],
  },
  {
    id: 'grillades',
    title: 'Grillades et plats à la carte',
    sections: [
      {
        id: 'grillades',
        title: 'Grillades',
        note: 'À la carte',
        intro: 'Viandes cuites au charbon de bois, à la demande. Une offre distincte du buffet.',
        items: [
          { name: 'Brochette de poulet' },
          { name: 'Brochette d’agneau' },
          { name: 'Brochette d’adana' },
          { name: 'Côtelette d’agneau' },
          { name: 'Ailes de poulet' },
          { name: 'Escalope de poulet' },
          { name: 'Kofte' },
          { name: 'Pavé de rumsteck' },
          { name: 'Entrecôte' },
          { name: 'Côte de bœuf' },
        ],
      },
      {
        id: 'poisson',
        title: 'Poisson',
        note: 'À la carte',
        items: [
          { name: 'Daurade' },
          { name: 'Pavé de saumon' },
        ],
      },
      {
        id: 'formule-mixte',
        title: 'Formule mixte',
        note: 'Une personne',
        intro: '½ brochette de poulet, ½ brochette d’agneau, ½ adana kebab, 1 côtelette d’agneau, 1 aile de poulet.',
        items: [{ name: 'Formule mixte une personne' }],
      },
      {
        id: 'plateau-mixte',
        title: 'Plateau mixte',
        note: 'À partager',
        intro: 'L’assortiment de nos grillades à partager, dressé sur plateau.',
        items: [
          { name: '1 personne' },
          { name: '2 personnes' },
          { name: '3 personnes' },
          { name: '4 personnes' },
        ],
      },
      {
        id: 'plats-speciaux',
        title: 'Plats spéciaux Gourmet',
        note: 'Préparés à la minute',
        items: [
          {
            name: 'Ali nazik',
            description: 'Brochette de viande hachée ou brochette d’agneau, purée d’aubergine à l’ail',
          },
          { name: 'Alti ezmeli', description: 'Brochette d’agneau à la sauce tomate, épicé' },
          { name: 'Yogurtlu adana', description: 'Brochette de viande hachée au yaourt' },
          { name: 'Hunkar begendi', description: 'Brochette d’agneau, caviar d’aubergine' },
          { name: 'Iskender', description: 'Pain grillé au beurre, kebab, sauce tomate, yaourt' },
        ],
      },
      {
        id: 'burgers',
        title: 'Burgers',
        items: [{ name: 'Burger maison' }],
      },
      {
        id: 'tapas',
        title: 'Tapas',
        items: [{ name: 'Tapas pour 4 personnes' }],
      },
      {
        id: 'menu-enfants',
        title: 'Menu enfants',
        items: [
          { name: 'Hamburger' },
          { name: 'Nuggets' },
        ],
      },
      {
        id: 'dessert',
        title: 'Dessert à la carte',
        items: [{ name: 'Künefe avec glace' }],
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
          { name: 'Coca-Cola 33 cl' },
          { name: 'Coca-Cola zéro 33 cl' },
          { name: 'Fanta 33 cl' },
          { name: 'Oasis 33 cl' },
          { name: 'Schweppes 33 cl' },
          { name: 'Orangina 33 cl' },
          { name: 'Perrier 33 cl' },
          { name: 'Jus d’orange' },
          { name: 'Jus d’ananas' },
          { name: 'Jus de pomme' },
          { name: 'Jus de fraise' },
          { name: 'Ayran fait maison' },
          { name: 'Evian 33 cl' },
          { name: 'San Pellegrino 33 cl' },
          { name: 'Evian 1 l' },
          { name: 'San Pellegrino 1 l' },
        ],
      },
      {
        id: 'chaudes',
        title: 'Boissons chaudes',
        items: [
          { name: 'Café' },
          { name: 'Thé turc' },
          { name: 'Café turc' },
        ],
      },
      {
        id: 'cocktails',
        title: 'Cocktails',
        intro: 'Avec ou sans alcool.',
        items: [
          { name: 'Mojito', description: 'Rhum, menthe, citron vert, sucre, eau gazeuse' },
          { name: 'Spritz Apérol', description: 'Apérol, vin pétillant, eau gazeuse' },
          { name: 'Cuba libre', description: 'Rhum, cola, citron' },
          { name: 'Gin tonic', description: 'Gin, tonic, citron' },
          { name: 'Tequila sunrise', description: 'Tequila, jus d’orange, grenadine' },
          { name: 'Caïpirinha', description: 'Cachaça, citron vert, sucre de canne' },
          { name: 'Piña colada', description: 'Rhum, jus d’ananas, crème de coco' },
          { name: 'La Parisienne', description: 'Liqueur St-Germain, citron vert, framboise, Schweppes tonic' },
          { name: 'Virgin mojito', description: 'Menthe, citron vert, sucre, eau gazeuse' },
          { name: 'Cocktail tropical', description: 'Jus d’ananas, orange, grenadine' },
          { name: 'Citronnade fraîche', description: 'Jus de citron, sucre, eau pétillante' },
          { name: 'Cocktail fruits rouges', description: 'Jus de fruits rouges, citron, eau gazeuse' },
          { name: 'Sunset exotic', description: 'Mangue, ananas, passion, grenadine' },
          { name: 'Pêche framboise fizz', description: 'Purée de pêche, framboise, limonade' },
        ],
      },
      {
        id: 'aperitifs',
        title: 'Apéritifs',
        items: [
          { name: 'Monaco' },
          { name: 'Martini blanc' },
          { name: 'Martini rouge' },
          { name: 'Ricard' },
          { name: 'Kir vin blanc' },
          { name: 'Kir royal' },
          { name: 'Porto blanc' },
          { name: 'Porto rouge' },
        ],
      },
      {
        id: 'spiritueux',
        title: 'Spiritueux',
        items: [
          { name: 'Chivas' },
          { name: 'Jack Daniel’s' },
          { name: 'Absolut vodka' },
          { name: 'Grey Goose' },
          { name: 'Yeni raki' },
          { name: 'Raki Gold' },
        ],
      },
      {
        id: 'bouteilles',
        title: 'Spiritueux en bouteille',
        items: [
          { name: 'Yeni raki', description: '35 cl ou 70 cl' },
          { name: 'Raki Gold', description: '35 cl ou 70 cl' },
          { name: 'Absolut vodka', description: '35 cl ou 70 cl' },
          { name: 'Chivas', description: '70 cl' },
          { name: 'Jack Daniel’s', description: '70 cl' },
          { name: 'Vodka Grey Goose', description: '70 cl' },
        ],
      },
      {
        id: 'digestifs',
        title: 'Digestifs',
        items: [
          { name: 'Get 27' },
          { name: 'Baileys' },
          { name: 'Cognac' },
        ],
      },
      {
        id: 'bieres',
        title: 'Bières',
        items: [
          { name: 'Desperados', description: 'Bouteille' },
          { name: 'Corona', description: 'Bouteille' },
          { name: 'Efes', description: 'Bouteille' },
          { name: 'Heineken pression', description: '25 cl ou 50 cl' },
          { name: 'Affligem pression', description: '25 cl ou 50 cl' },
        ],
      },
      {
        id: 'vins',
        title: 'Vins',
        items: [
          { name: 'Vin au verre', description: 'Rouge, rosé ou blanc' },
          { name: 'Yakut', description: 'Rouge, 37,5 cl ou 75 cl' },
          { name: 'Saint-Émilion', description: 'Rouge, 37,5 cl ou 75 cl' },
          { name: 'Pinot noir', description: 'Rouge, 75 cl' },
          { name: 'Saint-Joseph', description: 'Rouge, 75 cl' },
          { name: 'Lal', description: 'Rosé, 70 cl' },
          { name: 'Côte de Provence', description: 'Rosé, 37,5 cl ou 75 cl' },
          { name: 'Chardonnay', description: 'Blanc, 75 cl' },
          { name: 'Chablis', description: 'Blanc, 75 cl' },
        ],
      },
    ],
  },
];

export const ALCOHOL_NOTICE =
  'L’abus d’alcool est dangereux pour la santé, à consommer avec modération.';

/** Plats mis en avant sur la page d'accueil, avec leur visuel. */
export interface SignatureDish {
  name: string;
  description: string;
  image: string;
  alt: string;
}

export const SIGNATURE_DISHES: SignatureDish[] = [
  {
    name: 'Côte de bœuf',
    description: 'Saisie au charbon de bois, servie avec frites maison, tomate et piment grillés.',
    image: 'cote-de-boeuf-frites-decoupe',
    alt: 'Côte de bœuf grillée découpée au couteau, servie avec des frites',
  },
  {
    name: 'Plateau mixte',
    description: 'Brochettes de poulet et d’agneau, adana, côtelettes et ailes à partager.',
    image: 'plateau-grillades-mixtes-piments-grilles',
    alt: 'Plateau de grillades mixtes avec piments grillés',
  },
  {
    name: 'Iskender',
    description: 'Pain grillé au beurre, kebab, sauce tomate et yaourt, servi sur plat en fonte.',
    image: 'iskender-kebab-plat-en-fonte',
    alt: 'Iskender kebab servi dans un plat en fonte avec du yaourt',
  },
  {
    name: 'Pavé de saumon',
    description: 'Grillé à la braise, accompagné de frites et de légumes grillés.',
    image: 'pave-de-saumon-grille-frites',
    alt: 'Pavé de saumon grillé avec des frites',
  },
];
