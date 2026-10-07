# Cal State LA EcoCAR Website

The public-facing website for the Cal State LA EcoCAR team, a participant in the EcoCAR Innovation Challenge.

## Pages

- Home (`index.html`)
- About (`about.html`)
- Vehicle (`vehicle.html`)
- Team (`team.html`)
- News (`news.html`)
- Join (`join.html`)

## Run locally

This is a static site and does not require a build step. From the repository root, start any static web server, for example:

```powershell
py -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## GitHub Pages

The site uses repository-relative links and has no build step, framework runtime, or generated asset directory. The included `.nojekyll` file allows GitHub Pages to publish the repository contents directly.

To publish it, open the repository's **Settings → Pages**, choose **Deploy from a branch**, and select the `main` branch with the `/ (root)` folder. The default project-site address will be:

`https://bta5-csula.github.io/ECOCar-Website/`

## Contact

- Email: ecocarchargingeagles@gmail.com
- Instagram: [@csulaecocar](https://www.instagram.com/csulaecocar/)

## Project structure

- `replica.css` and `replica.js` provide the shared navigation, footer, responsive behavior, reveal effects, Vehicle tabs, and News filters.
- `home-custom.css` and `home-custom.js` provide the homepage layout, particle fields, video interaction, scroll effects, and looping project carousel.
- `assets/images/` contains team-owned or team-approved photography used by the live pages.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) records implementation boundaries and maintenance guidance.

## Content maintenance

The current site deliberately contains only Cal State LA EcoCAR content. Add new team information directly to the relevant HTML page rather than inserting replacement text at runtime. Keep shared navigation changes synchronized across all six pages.
