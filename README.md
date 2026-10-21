# Cal State LA EcoCAR Website

The public-facing website for the Cal State LA EcoCAR team, a participant in the EcoCAR Innovation Challenge.

## Pages

- Home (`index.html`)
- About (`about.html`)
- Vehicle (`vehicle.html`)
- Team (`team.html`)
- Outreach (`outreach.html`)
- News (`news.html`)
- Join (`join.html`)

## Run locally

This is a static site and does not require a build step. From the repository root, start any static web server, for example:

```powershell
py -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## GitHub Pages

The site uses repository-relative internal links and includes a `.nojekyll` file so GitHub Pages serves the `_astro` asset directory unchanged.

To publish it, open the repository's **Settings → Pages**, choose **Deploy from a branch**, and select the `main` branch with the `/ (root)` folder. The default project-site address will be:

`https://bta5-csula.github.io/ECOCar-Website/`

## Contact

- Email: ecocarchargingeagles@gmail.com
- Instagram: [@csulaecocar](https://www.instagram.com/csulaecocar/)

## Project structure

- `index.html`, `home-custom.css`, and `home-custom.js` contain the approved homepage and its EcoCAR-specific presentation and interactions.
- `_astro/` contains the locally stored runtime modules required by the approved homepage motion and layout.
- `.reference/sprite-icons.svg` supplies the homepage engineering icon artwork. The other files under `.reference/` are design references and are not part of the public site.
- `replica.css` and `replica.js` are the shared layer for the secondary pages.
- `assets/images/` contains team-owned or team-approved photography used by the public pages.

## Maintenance documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) explains the implementation boundaries and release checks.
- [`docs/CONTENT-ROADMAP.md`](docs/CONTENT-ROADMAP.md) records confirmed identity decisions and content that still needs approval.
- [`docs/TEAM-MEETING-NOTES-2026-10-13.md`](docs/TEAM-MEETING-NOTES-2026-10-13.md) records the October 2026 website feedback, approved sources, phased work, and open questions.
- [`docs/WILDFIRE-OUTREACH-BRIEF.md`](docs/WILDFIRE-OUTREACH-BRIEF.md) separates approved public outreach messaging from research questions, internal event notes, and wildfire claim guardrails.
