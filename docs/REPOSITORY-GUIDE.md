# Repository and file guide

This guide keeps the GitHub repository professional while making the local project understandable to team members who do not work with code every day.

## GitHub About settings

Use the following public repository details:

- **Description:** Official website for Cal State LA EcoCAR, a multidisciplinary student team competing in the EcoCAR Innovation Challenge.
- **Website:** `https://calstatela-ecocar.vercel.app/`
- **Topics:** `cal-state-la`, `ecocar`, `ecocar-innovation-challenge`, `electric-vehicles`, `automotive-engineering`, `student-engineering`, `sustainable-mobility`, `community-outreach`, `accessibility`, `static-site`

Do not use **CSULA** or **Charging Eagles** as the primary repository identity. Do not add General Motors as a sponsor or topic.

## What appears on GitHub

- Root HTML files: public website pages and their stable addresses.
- Root CSS and JavaScript files: shared and page-specific website presentation and behavior.
- `assets/`: reviewed, web-ready media used by the public website.
- `_astro/`: required local runtime files for approved homepage motion and layout.
- `docs/`: decisions, meeting notes, content guidance, analytics planning, and maintenance instructions.

These public files should not be reorganized merely to make the root look shorter. Moving them would change paths, deployment behavior, or approved website features.

## What stays local

`source-materials/` is the team's local source library. Git ignores the entire folder so original documents, large photographs, working files, and unused references do not appear on GitHub or the public website.

Its intended organization is:

```text
source-materials/
├── inbox/          Newly received batches kept intact
├── team-identity/  Approved identity and program documents
├── photos/         Original team photography
├── easter-eggs/    Original optional creative material
└── archive/        Superseded local references and prototypes
```

The October 2026 upload batch is stored intact at `source-materials/inbox/2026-10-team-upload/`. Its nested folders and original filenames are preserved so the source and its provenance remain clear.

## Adding new material

1. Put a newly received batch in a dated folder under `source-materials/inbox/`.
2. Keep original files unchanged. Do not flatten a supplied folder structure or overwrite an earlier version.
3. Confirm names, permissions, facts, and intended use before publishing anything.
4. Create an optimized web copy in the appropriate `assets/` folder.
5. Reference the web copy from the page; keep the original in `source-materials/`.
6. Record important source or approval decisions in `docs/`.

## Naming guidance

- Use lowercase, descriptive, hyphenated names for new public web assets when practical.
- Preserve filenames inside received source batches unless there is a documented reason to change them.
- Use **Cal State LA EcoCAR** as the official public name. **Charging Eagles** is only the team nickname.
