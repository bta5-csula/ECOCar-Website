# Website architecture

## Overview

The Cal State LA EcoCAR website is a static, multi-page site intended for direct deployment from the repository root to GitHub Pages. It has no package-install or build step. The included `.nojekyll` file is required so GitHub Pages serves the `_astro` directory unchanged.

The official public name is **Cal State LA EcoCAR**. **Charging Eagles** is the team nickname and should not replace the public name in navigation, metadata, or primary headings.

## Approved homepage baseline

The homepage is a preserved, Antigravity-inspired composition whose current layout and motion have been visually approved. Treat the following behavior as a regression-sensitive baseline:

- Morphing particle hero and its established flow.
- Hero typing sequence and inline blinking cursor.
- Scroll-responsive video presentation and pointer-following play control.
- Engineering icon ribbon.
- Feature stories and team photography.
- Seamless bidirectional project carousel and per-slide typing behavior.
- Animated involvement cards, shaped news media, and final particle call to action.
- Existing desktop and mobile spacing, footer scale, and responsive behavior.

Do not broadly rewrite, reformat, or replace the homepage structure merely for source neatness. Make homepage changes one component at a time and compare desktop and mobile rendering before and after each change.

## Homepage implementation

`index.html` contains the public EcoCAR copy, routes, metadata, content cards, and preserved component markup.

`home-custom.css` contains the EcoCAR-specific presentation layered over the preserved component styles.

`home-custom.js` handles targeted EcoCAR adaptation and interactions, including:

- Local engineering icon loading.
- Team branding and navigation behavior.
- Video preview and accessible YouTube dialog.
- Feature and carousel media assignment.
- Seamless carousel cloning and navigation.
- EcoCAR typing sequences and cursor placement.

The earlier broad runtime text-replacement map has been removed. Public copy that has already been finalized should remain directly in the page source.

`_astro/` contains the locally stored, hashed runtime modules and styles needed for the approved particles, smooth scrolling, typed headings, slider behavior, and supporting interactions. These are vendored runtime files: their generated formatting, filenames, and internal whitespace should not be cleaned mechanically.

`.reference/sprite-icons.svg` is a runtime dependency used by the homepage icon row. The other `.reference` HTML files are comparison material only and should not be published or linked from the public navigation.

## Secondary pages

The About, Vehicle, Team, News, and Join pages use a separate shared layer based on `replica.css` and `replica.js`, with page-specific files where required. Their designs and navigation are still being reviewed against the approved homepage. Do not treat current secondary-page experiments as final until they have been inspected and approved page by page.

Keep these principles consistent across the secondary pages:

- Use the same public team name and navigation destinations.
- Preserve the active-page indication and accessible mobile-menu state.
- Keep the favicon and team logo consistent with the homepage.
- Use supplied team facts and photographs without guessing identities, dates, or roles.

## External media

The featured homepage video opens the approved YouTube video in a privacy-enhanced embed. The exact self-hosted, control-free playback used by the inspiration site would require an authorized local copy of the original EcoCAR video.

Google Fonts and the YouTube preview/embed remain external dependencies. The particle runtime, engineering icon sprite, cursor artwork, textures, and supporting videos used by the preserved homepage are stored locally.

## Release checks

Before committing or publishing a material change:

1. Start a local static server and confirm the homepage returns HTTP 200.
2. Check every changed JavaScript file for syntax errors.
3. Confirm all referenced local images, videos, styles, scripts, and icon files exist.
4. Test the homepage at desktop and mobile widths.
5. Exercise the navigation, video dialog, both carousel directions, typed headings, involvement cards, and news slider.
6. Check the browser console for local asset or JavaScript errors.
7. Review the staged file list and exclude prototypes, reference pages, and unrelated work.
8. Use a concise commit subject and a body that records both user-visible behavior and architectural implications.

## Deployment

Publish from the `main` branch and repository root. Internal public links and assets are repository-relative so the same files work locally and at the GitHub Pages project URL.
