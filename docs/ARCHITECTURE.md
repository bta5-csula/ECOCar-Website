# Website architecture

## Overview

The Cal State LA EcoCAR website is a static, multi-page site designed for direct deployment to GitHub Pages. It intentionally avoids a build system so team members can preview and update it with a basic local web server.

The visual language is consistent across the site: light surfaces, large editorial typography, rounded media shapes, restrained color, particle motion, and compact pill-shaped controls. All public copy and media in the live implementation are specific to Cal State LA EcoCAR.

## Shared layer

`replica.css` owns the typography, fixed header, primary and mobile navigation, footer, secondary-page layouts, responsive breakpoints, and shared interaction states.

`replica.js` owns:

- Mobile navigation state and accessible labels.
- Viewport-based reveal effects.
- Vehicle project-area tabs, keyboard navigation, and icon changes.
- News category filtering.

Every public page uses the same header structure. When changing navigation labels or destinations, update all HTML pages together and preserve each page's `aria-current` marker.

## Homepage layer

`index.html` contains the final EcoCAR content directly. It does not depend on a mirrored page or replace third-party copy after loading.

`home-custom.css` owns the homepage-only layout and animation presentation.

`home-custom.js` owns:

- Header state while scrolling.
- Hero and call-to-action particle fields.
- Hero and featured-video scroll motion.
- The pointer-following video control and accessible video dialog.
- The continuously looping project carousel.
- Per-slide typing animation, with the cursor kept inline after the final character.

All motion respects the user's reduced-motion preference.

## Assets and external media

Local photography lives in `assets/images/`. Use descriptive alternative text that identifies the event or activity without guessing identities not supplied by the team.

The featured video opens the approved YouTube video in a privacy-enhanced embed. The poster remains a local team image so the homepage still renders when an external embed is unavailable.

## Deployment

GitHub Pages can serve the repository root directly from `main`. Because all internal links and assets are repository-relative, the site works both at the project URL and from a local static server.

Before publishing a material change:

1. Run a local link and asset check.
2. Test the pages at desktop and mobile widths.
3. Exercise the mobile menu, Vehicle tabs, News filters, video dialog, and both carousel directions.
4. Confirm that the browser console contains no local asset or JavaScript errors.
5. Verify the staged diff and describe the user-visible and architectural changes in the commit body.
