# gourmet-steakhouse

Site vitrine du restaurant Gourmet Steakhouse (buffet à volonté et grillades au charbon de bois à la carte, viandes halal, Fosses dans le Val-d’Oise).

Application Angular 18 standalone avec SSR (Angular SSR / Express, port 4000), prérendue au build, déployée sur Kubernetes via Helm. Socle technique repris du projet `orvya`.

- Production : [https://gourmet-steakhouse.fr](https://gourmet-steakhouse.fr) / [https://www.gourmet-steakhouse.fr](https://www.gourmet-steakhouse.fr)
- Dev : [https://dev.gourmet-steakhouse.fr](https://dev.gourmet-steakhouse.fr) (branche `dev`)

## Contenu

- `src/app/core/data/restaurant.ts` : adresse, téléphone, horaires (un seul fichier à corriger si l'un d'eux change ; il alimente les pages, le pied de page et les données structurées schema.org).
- `src/app/core/data/menu.ts` : la carte complète, retranscrite du menu papier d'octobre 2026, sans les prix (volontairement non publiés).
- `public/images/` : visuels renommés et redimensionnés (`plats/` en 600 et 1200 px, `hero/` en 1000 et 2000 px, WebP + JPEG, `logo/` en 5 couleurs).

## Pages

`/` accueil, `/carte`, `/le-restaurant`, `/infos-pratiques`, `/mentions-legales`, `/confidentialite`, 404.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4209/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## SSR

Run `npm run serve:ssr:gourmet-steakhouse` after a build to start the Express SSR server on port 4000.

## Deployment

- L'image Docker est construite et poussée sur `ghcr.io/hermann93360/gourmet-steakhouse` par le workflow GitHub Actions `publish-image.yaml` à chaque push sur `main` (`publish-image-dev.yaml` sur `dev`, `publish-image-manually.yaml` pour redéployer un tag).
- Le déploiement se fait via Helm avec le chart `.helm-chart/angular-app` (release `gourmet-steakhouse`, `-f values-dev.yaml` pour la release `gourmet-steakhouse-dev`).
- TLS géré par cert-manager (ClusterIssuer `letsencrypt-prod`), ingress nginx sur `gourmet-steakhouse.fr` et `www.gourmet-steakhouse.fr`.

Secrets GitHub Actions requis : `TOKEN` (GHCR) et `KUBECONFIG`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
