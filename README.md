# ECHOA

ECHOA is a React, TypeScript, and Vite portfolio site.

## Development

- `npm ci` installs the locked dependencies.
- `npm run dev` starts the local development server.
- `npm run build` type-checks and builds the production site.
- `npm run lint` checks the code with ESLint.
- `npm run preview` serves the production build locally.

## Deployment

- Use Node.js 20.19+ or 22.12+.
- Set `VITE_SITE_URL` to the public site origin before building (defaults to `https://echoa1.sana.codes`).
- Run `npm ci` and `npm run build`, then publish the generated `dist/` directory to a static host.
- The build creates crawlable `/about/` and portfolio category pages, `sitemap.xml`, `robots.txt`, and AI-readable `llms.txt` files.
- Configure the host to serve each directory's `index.html` for trailing-slash routes.

## Media

- Raster images in the project use WebP.
- Category galleries discover media from `public/category-assets/<category>/`.
- Public videos must be smaller than 25 MB; the Vite build checks this limit. Gallery videos load as they approach the viewport.
