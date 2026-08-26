# Portfolio — Navneet Kishan Srinivasan

Personal portfolio site for Navneet Kishan Srinivasan — Software Engineer,
MSc Data Science student at FAU Erlangen-Nürnberg, and researcher working
at the intersection of healthcare technology, machine learning, and secure
software systems.

**Live site:** [navneetkishan.me](https://navneetkishan.me)

---

## Features

- **Light/dark theme toggle**, persisted to `localStorage`, driven by a
  centralized CSS custom-property token system (`src/themes.css`).
- **Animated "terminal" About card** — a typewriter effect over a real bio,
  with a pause/play toggle that swaps to a fully static, readable view
  (accessibility requirement: auto-updating content must be pausable), a
  photo gallery with clickable pagination dots, and a subtle Ken Burns zoom.
- **Per-project detail pages** — every project card links to a dedicated
  page (`/#/project/<slug>`) built from a reusable, data-driven template:
  drop new fields into a project's data file and the page picks them up
  automatically (see [Adding a project](#adding-a-project) below).
- **Continuous auto-scrolling project gallery** with pause/play and
  prev/next controls — genuinely pausable on touch devices, not just on
  hover.
- **Scroll-reveal and hover micro-interactions** throughout via
  [Framer Motion](https://www.framer.com/motion/) — nav scroll-spy,
  3D tilt-on-hover project cards, staggered entrance animations.
- **Accessibility-conscious**: every animated/auto-updating element
  respects `prefers-reduced-motion` and — where content auto-cycles for
  more than a few seconds — offers an explicit pause control.
- **SEO**: `Person` JSON-LD structured data, a hand-built branded Open
  Graph preview image, proper meta tags, and a canonical URL.

## Tech stack

- [React 19](https://react.dev/) via [Create React App](https://create-react-app.dev/)
- [React Router](https://reactrouter.com/) (`HashRouter` — see
  [Deployment](#deployment) for why)
- [Framer Motion](https://www.framer.com/motion/) for animation
- [react-icons](https://react-icons.github.io/react-icons/)
- Plain CSS with a custom design-token system — no CSS framework

## Getting started

```bash
npm install
npm start
```

Opens the app at [http://localhost:3000](http://localhost:3000) with hot
reload.

### Available scripts

| Command | Description |
|---|---|
| `npm start` | Runs the app in development mode |
| `npm run build` | Production build to `build/` |
| `npm test` | Runs the test runner (interactive watch mode) |
| `npm run deploy` | Manually builds and publishes `build/` to the `gh-pages` branch |

## Project structure

```
public/                  Static assets, favicon, manifest, robots.txt
src/
  components/            One component + matching .css file per section
    Header.jsx / .css
    Hero.jsx / .css
    About.jsx / .css      "Terminal" bio card
    Experience.jsx / .css Work-experience timeline
    Education.jsx / .css
    Projects.jsx / .css   Auto-scrolling project gallery
    ProjectDetail.jsx / .css  Reusable per-project wiki-style page
    Contact.jsx / .css
    ThemeToggle.jsx / .css
  data/
    experienceData.js
    educationData.js
    aboutText.json / aboutImages.json
    projects/
      index.js            Loads all projectN.js files (single source of truth)
      project1.js … project6.js
  themes.css              Design tokens (colors, fonts, shadows, radii) — light + dark
  ThemeContext.js         React context backing the theme toggle
  App.js                  Routes: "/" (full site) and "/project/:slug"
```

### Adding a project

Create `src/data/projects/projectN.js` following the existing shape:

```js
const projectN = {
  id: "projectN",
  slug: "my-project",              // used in the URL: /#/project/my-project
  title: "Full, descriptive title",
  dates: "Jan 2026 – present",
  description: ["Bullet one", "Bullet two"],
  techStack: ["python", "react"],   // must match an icon in public/logos/
  thumbnail: process.env.PUBLIC_URL + "/images/projects/my-project.jpg",
  githubUrl: "https://github.com/you/my-project", // omit/"" to hide the button
  liveUrl: "",
  sections: [                       // optional — free-form wiki content
    { heading: "Architecture", body: ["Paragraph one."] },
    { heading: "Key Features", list: ["Feature one", "Feature two"] },
    { heading: "Diagram", image: "/images/projects/my-project-diagram.png" },
  ],
  gallery: [],                      // optional — extra screenshots
};

export default projectN;
```

It's picked up automatically by `src/data/projects/index.js` — no other
file needs to change. The detail page (`ProjectDetail.jsx`) renders
whichever fields are present and hides whatever isn't.

## Deployment

The site is hosted on **GitHub Pages** from the `gh-pages` branch (legacy
branch-based Pages build, custom domain via the `CNAME` file at the repo
root). Deployment is automated: a GitHub Actions workflow
(`.github/workflows/deploy.yml`) builds and publishes to `gh-pages` on
every push to `main`.

Routing uses **`HashRouter`** rather than `BrowserRouter` deliberately:
GitHub Pages is static hosting with no server-side rewrites, so a path like
`/project/my-project` would 404 on refresh or a direct link. Hash-based
URLs (`/#/project/my-project`) are resolved entirely client-side, so they
work reliably with zero extra configuration.

## Design system

Colors, fonts, shadows, radii, and transitions are centralized as CSS
custom properties in `src/themes.css`, redefined under `[data-theme="dark"]`
for the dark theme. Components should reference these tokens
(`var(--color-text)`, `var(--font-mono)`, etc.) rather than hardcoding
values.

## Contributing / history

This repo's development conventions (branch per task, PR-based workflow,
no direct commits to `main`) and a heavily detailed record of past design
decisions, bugs found and fixed, and outstanding open items are documented
in [`SESSION_NOTES.md`](./SESSION_NOTES.md).

## License

Personal project — all rights reserved.
