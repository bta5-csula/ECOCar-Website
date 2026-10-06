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

The site uses repository-relative internal links and includes a `.nojekyll` file so GitHub Pages serves the `_astro` asset directory unchanged.

To publish it, open the repository's **Settings → Pages**, choose **Deploy from a branch**, and select the `main` branch with the `/ (root)` folder. The default project-site address will be:

`https://bta5-csula.github.io/ECOCar-Website/`

## Contact

- Email: ecocarchargingeagles@gmail.com
- Instagram: [@csulaecocar](https://www.instagram.com/csulaecocar/)
