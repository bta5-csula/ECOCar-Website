# Cal State LA EcoCAR Website

The public-facing website for the Cal State LA EcoCAR team, a participant in the EcoCAR Innovation Challenge.

**Live website:** [calstatela-ecocar.vercel.app](https://calstatela-ecocar.vercel.app/)

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

## Deployment

The production website is deployed from the repository root through Vercel. The site has no build step, so Vercel publishes the committed HTML, CSS, JavaScript, and assets directly.

Google Analytics 4 is the primary long-term reporting system, and Vercel Web Analytics provides a secondary aggregate cross-check. See [`docs/VERCEL-ANALYTICS-PLAN.md`](docs/VERCEL-ANALYTICS-PLAN.md) for ownership, verification, and reporting guidance.

The included `.nojekyll` file also keeps the `_astro` directory compatible with static hosts that would otherwise treat underscore-prefixed folders specially.

## Contact

- Email: ecocarchargingeagles@gmail.com
- Instagram: [@csulaecocar](https://www.instagram.com/csulaecocar/)

## Project structure

- The root HTML files are the public pages. Keeping them at the top level preserves the current page addresses.
- `home-custom.css` and `home-custom.js` contain the approved homepage presentation and interactions.
- `replica.css` and `replica.js` provide the shared foundation for secondary pages.
- `assets/` contains web-ready images, logos, video, fonts, and other files used by the public website.
- `_astro/` contains local runtime files required by the approved homepage motion and layout.
- `.reference/sprite-icons.svg` supplies the homepage engineering icons. Other local design references are not part of the public website.
- `docs/` contains project decisions, content records, release guidance, and maintenance notes.
- `source-materials/` is a local, Git-ignored library for original documents, photographs, uploads, and archives. It is intentionally absent from GitHub.

Original source files should remain in `source-materials/`. Place only reviewed, web-ready copies in `assets/`; do not move public assets back into the source library. See [`docs/REPOSITORY-GUIDE.md`](docs/REPOSITORY-GUIDE.md) for the file-handling workflow and suggested GitHub About settings.

## Maintenance documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) explains the implementation boundaries and release checks.
- [`docs/REPOSITORY-GUIDE.md`](docs/REPOSITORY-GUIDE.md) explains the public-versus-local file structure and source-material workflow.
- [`docs/CONTENT-ROADMAP.md`](docs/CONTENT-ROADMAP.md) records confirmed identity decisions and content that still needs approval.
- [`docs/TEAM-MEETING-NOTES-2026-10-13.md`](docs/TEAM-MEETING-NOTES-2026-10-13.md) records the October 2026 website feedback, approved sources, phased work, and open questions.
- [`docs/WILDFIRE-OUTREACH-BRIEF.md`](docs/WILDFIRE-OUTREACH-BRIEF.md) separates approved public outreach messaging from research questions, internal event notes, and wildfire claim guardrails.
