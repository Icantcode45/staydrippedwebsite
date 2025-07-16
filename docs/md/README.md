# Stay Dripped Mobile IV Website

This repository contains the source files for the Stay Dripped Mobile IV marketing website. Components are located under `src/components/` while images and fonts live in `src/assets/`. All JavaScript modules reside in `src/js/` and styles are in `src/css/`.

## Local Development

1. Install Node dependencies with `npm install`. This provides a local web server and CSS linting.
2. Start a development server with `npm run start` and open `http://localhost:3000` in your browser.
3. Run `npm run lint` to check CSS files with Stylelint.
4. Edit files inside `src/components/` to update shared sections like the header, footer, or booking widgets.

## Additional Pages

Standalone pages such as `privacy-policy.html`, `terms-of-service.html`, and `memberships.html` reside in the `src/pages/` directory and reuse the same header and footer components for consistency.

## Assets

Image and font assets are stored under `src/assets/`. Placeholder images are included by default; replace them with production imagery for deployment.
