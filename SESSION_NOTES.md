# Portfolio Project — Session History & Agent Context

**Purpose of this file:** a heavily detailed record of everything done to this
portfolio across a multi-day Claude Code session, including *why* each
decision was made, not just what changed. Written so any future agent (Claude
or otherwise) picking up this repo cold can understand the current state,
the reasoning behind it, and what's still unresolved — without having to
re-derive it from git log alone.

Last updated: 2026-08-26. If you (a future agent) make significant changes,
consider appending a new dated section rather than rewriting this file from
scratch — the history has value.

---

## 1. What this project is

- A personal portfolio site for **Navneet Kishan Srinivasan** — Software
  Engineer, MSc Data Science student at FAU Erlangen-Nürnberg, researcher
  working at the intersection of healthcare technology, ML, and secure
  software systems.
- **Repo:** `https://github.com/NavneetKishanS/portfolio` (GitHub user:
  `NavneetKishanS`). The git root is the `portfolio/` directory itself — the
  parent `new_portfolio/` folder on disk is *not* part of the repo.
- **Live site:** `https://navneetkishan.me` (custom domain, CNAME file at
  repo root, not in `public/`).
- **Deployment:** GitHub Pages, **legacy branch-based build** (confirmed via
  `gh api repos/NavneetKishanS/portfolio/pages` → `build_type: "legacy"`,
  `source.branch: "gh-pages"`). The `gh-pages` branch holds the built output
  and is what actually serves the domain.
- **Stack:** Create React App (`react-scripts` 5.0.1), React 19,
  `framer-motion` for animation, `react-icons` for icons, `react-router-dom`
  (added mid-session) for the project detail pages.

---

## 2. Critical repo/workflow conventions established this session

These were not just "things that happened" — they're rules the user
explicitly enforced repeatedly. Follow them by default.

1. **Never commit or push directly to `main`.** Every unit of work: branch
   off latest `main` (pull first), implement, sanity-check, commit, push,
   open a PR via `gh pr create` with a Summary + Test plan body. **The user
   always merges PRs themselves** — never merge on their behalf unless
   explicitly told to.
2. **Branch per logical task**, not one giant branch. Each branch in this
   session corresponded to one feature/fix area (see §4 for the full list).
   When starting new work, check out `main`, `git pull origin main`, *then*
   branch — don't branch off a stale or unrelated branch.
3. **Sanity checks = compile checks, not screenshots.** This is a
   **persisted memory preference** (also saved to this Claude installation's
   memory store at
   `~/.claude/projects/-Users-navneetkishansrinivasan-Desktop-new-portfolio/memory/feedback_no_screenshot_qa.md`):
   the user runs `npm start` locally and does visual QA themselves. Default
   to `CI=false npm run build` (and occasionally a quick `npm start` +
   `curl` liveness check) as the "sanity check" — do **not** proactively
   spawn headless-Chrome screenshots to visually verify UI changes. The one
   exception: if the user reports a *specific* visual bug that can't be
   confidently diagnosed from code alone, one targeted screenshot to
   diagnose *that specific bug* is fine (this happened twice — the apple-style
   hero legibility bug, and the "why did the gap not shrink" spacing check —
   and the user didn't object either time).
4. **When asked to implement several polish/aesthetic changes, implement
   first and leave uncommitted** until the user says "commit and make a
   PR" or similar — they review the running dev server before approving.
   This pattern repeated across the About-card polish, the Projects
   polish, and the GitHub-badge work.
5. **`CI=false` is required** for `npm run build` locally — otherwise CRA
   treats warnings as errors in some environments. The GitHub Actions
   workflow also sets `CI: false` for the same reason.
6. **Always run a build check before every commit in this session** — this
   was done dozens of times and caught real issues early (e.g., missing
   `react-icons` dependency, JSX structural bugs).
7. **Don't fabricate factual/biographical content.** Several times this
   session required data the agent didn't have (work locations, GitHub repo
   URLs, short project titles) — the correct pattern demonstrated
   repeatedly: fill in a best-effort guess *only when there's reasonable
   evidence*, flag it clearly (`// TODO: confirm` comments, or explicit
   callouts in chat), and never silently invent unverifiable specifics like
   fake repo links.
8. **Dead code/files get removed when found**, not left to rot: stale
   `App.css` (unused CRA boilerplate), a duplicate `Education copy.css`, a
   stale `data/projects/index.json` that referenced files that didn't exist,
   and an orphaned `shortTitle` field (added, then reverted) were all
   deleted outright rather than left as unused cruft.

---

## 3. Chronological history: branches, PRs, and *why*

All PRs below are against `NavneetKishanS/portfolio`. All are **merged**
into `main` except PR #2, which is explicitly **abandoned/parked** — see
§3.2.

### 3.1 PR #1 — `feature/visual-refresh` → `main` (MERGED)

Triggered by an initial request: "analyse the design in this project as a
senior UI/UX designer and SEO expert." This was a full audit that found:

- Dead/broken UI: the Hero "Resume/CV" button had no `href`/`onClick` at
  all (did nothing); the Contact email link had a typo
  (`mailto:ynavneetkishan54@...` — stray leading "y" not matching the
  displayed, correct address); Education's CSS classes (`.education-content
  h3/p/ul`) never matched the actual JSX classes (`.education-degree`,
  `.education-meta`, `.education-description`) so that typography styling
  was silently dead.
- **Missing dependency**: `Contact.jsx` imported from `react-icons/fa` but
  `react-icons` was not in `package.json` — a fresh `npm install` would not
  have supported the existing code. Added it.
- **Images**: ~65MB total, worst offender a single 42MB `grad.png`. Compressed
  everything (mostly PNG→JPEG conversions with `sips`) down to ~2.5MB total.
  Removed unreferenced dead images and dead source assets
  (`src/assets/dp.jpg`, `src/assets/tdk_presentation.jpeg`).
- **Dead CSS files**: `src/App.css` was unused CRA boilerplate (never
  imported) — deleted. `src/themes.css` (imported globally) actually
  contained *stale leftover Hero CSS* from an earlier version of the site,
  completely unrelated to theming, and referenced CSS variables
  (`--text-color`, `--background-color`) that were never defined anywhere —
  rewritten from scratch into a real design-token file (see §5).
  `src/components/Education copy.css` was a stray duplicate file — deleted.
- **SEO**: added a `Person` JSON-LD block, a real `og:image`/`twitter:image`
  preview card (see below), branded `manifest.json` (was still literally
  `"name": "Create React App Sample"`), canonical link, proper meta
  description.
- **OG preview image**: the site referenced `%PUBLIC_URL%/preview.png` which
  didn't exist. Built a proper 1200×630 branded social card by hand-writing
  an HTML file with the terminal/`whoami` aesthetic (name, role, small
  circular photo, dark background, subtle grid texture) and rendering it via
  headless Chrome (`google chrome --headless --screenshot=...`) since no
  design tool was available — this produced a much better result than a
  bare photo-on-background attempt that was tried first.
- **Animation/motion**: added scroll-spy nav with an animated underline,
  scroll-reveal (`whileInView`) entrance animations, a 3D tilt-on-hover
  effect for project cards (`useMotionValue`/`useSpring`/`useTransform` —
  this pattern is reused later for the Projects cards), and a soft edge-fade
  mask on the project marquee. All motion respects
  `prefers-reduced-motion` via a global CSS override in `themes.css` plus
  per-component `matchMedia` checks in JS for anything driven by
  `setTimeout`/`setInterval` (CSS `animation-duration` overrides don't stop
  JS timers).
- **Dark mode bug**: there was no `body` background rule anywhere at all —
  dark mode showed white gaps around the dark "cards" against the browser's
  default white canvas. Fixed by adding `html`/`body` background rules
  driven by the new `--color-bg` token.

### 3.2 PR #2 — `feature/apple-style` → `feature/visual-refresh` (OPEN, PARKED — not merged, not in main)

**This is important: none of this branch's content is in `main`.** It was
an explicit design experiment requested after the user asked "how could
this look more like an Apple product page." History of what happened on it,
in order:

1. **First pass**: replaced the "everything is a floating white card"
   pattern with full-bleed sections, a real editorial type scale
   (`--text-display`, `--text-h1`, `--text-h2`, `--tracking-tight` — **these
   tokens only exist on this branch**, not on `main`), a shared `.container`
   layout primitive, a `--section-pad-y` rhythm token, a new "Statement"
   section (one big line of text between Hero and About), a full-width
   sticky nav that shrinks/blurs on scroll, and converted Projects from the
   marquee to a scroll-snap gallery with prev/next arrows (no autoplay —
   this Projects redesign is **also only on this branch**; the version that
   eventually shipped in `main` via PR #6 is a different, independently-built
   implementation with autoplay).
2. **Bug**: Hero and Contact were made "fixed-dark bookend sections"
   (`--ink-*` tokens, a `.section-inverted` helper class) — i.e. always
   dark regardless of the site's light/dark toggle, deliberately mimicking
   Apple's own non-toggleable marketing pages. **This was wrong for a site
   that has a toggle**: the user reported the light-mode hero showing a
   dark grid background, correctly identifying it as broken/inconsistent
   rather than a deliberate style choice.
3. Agent's response at the time (over-corrected): replaced the flat grid
   background with a full-bleed *photo* banner (a real conference-presenting
   photo of the user) with a Ken Burns zoom and a theme-reactive scrim — but
   the scrim was tuned too weak, so the photo (a bright presentation slide)
   visibly bled through and fought with the hero text, reading as broken/ugly
   rather than premium. User feedback: "it's worse... revert back to first
   apple-ish coded version we made and give that with the color consistency."
4. **Final resolved state on this branch**: `git reset --hard` back to the
   first apple-style commit (grid background + circular avatar with a conic
   accent ring — the version the user actually liked), then applied *only*
   the light/dark fix on top: removed the `--ink-*` token system and
   `.section-inverted` entirely; Hero/Contact now use the same theme tokens
   as every other section; the grid line color is derived from
   `color-mix(in srgb, var(--color-text) 6%, transparent)` so it's
   automatically correct in both themes instead of hardcoding a
   dark-background assumption; added a `--icon-filter` token
   (`none` in light, `invert(1) brightness(1.5)` in dark) so social icons
   stay visible in both themes.
5. Conversation then moved on to other branches (Experience, About, Projects
   — all done against `main`, not this branch) and **this branch was never
   revisited to actually merge it**. **Open question for whoever picks this
   up next: does the user still want the Apple-style redesign pursued, or
   should PR #2 be closed?** Don't assume either way — ask.

### 3.3 PR #3 — `ci/deploy-gh-pages` → `main` (MERGED)

Triggered by: "I merged PR #1 but the deployed site still doesn't show the
changes." Root cause diagnosed and confirmed via `gh api`: merging to `main`
never triggered a deploy — the site is only ever updated by manually running
`npm run deploy` (the `gh-pages` npm package), and there was no CI. Added
`.github/workflows/deploy.yml`:

- Triggers on push to `main` or manual `workflow_dispatch`.
- `actions/checkout` → `actions/setup-node` (Node 18, matching local dev) →
  `npm ci` → `npm run build` (with `CI=false`) → `peaceiris/actions-gh-pages@v4`
  publishing `build/` to the `gh-pages` branch, with `cname:
  navneetkishan.me` so the custom domain survives every deploy.
- Deliberately targets the **existing legacy branch-based Pages setup**
  rather than switching to the newer GitHub-Actions-native Pages deployment
  model — confirmed compatible via the Pages API check above.
- **Verified working**: after PR #6 merged, `gh-pages` branch was confirmed
  to have auto-updated (`85109e8..a5a2118`) without any manual `npm run
  deploy` — the pipeline is live and functioning.

### 3.4 PR #4 — `feature/experience-bullets` → `main` (MERGED)

Triggered by: "format Experience card descriptions to bullet points... also
evaluate the design." Two rounds of iteration:

- Converted `description` in `experienceData.js` from a single long string
  to an array of bullet points (matches the pattern already used in
  Projects). Rendered as a real `<ul>` with an accent-colored bullet marker,
  monospace font (matching the "technical identity" established by
  Projects' description lists and the About terminal).
- **Fixed real bugs found during the "evaluate the design" pass**:
  - `.timeline-item.left` forced `text-align: right` on *all* its content
    (title, company, bullets) — right-aligned body copy is hard to read;
    now always left-aligned regardless of which side of the timeline an
    entry sits on.
  - `<h4>` (company name) never had its default browser top-margin reset —
    this was the actual cause of an oddly large, uncontrolled gap between
    the role and company name that the user spotted in a screenshot.
  - `.timeline-date` used `margin-bottom` on an inline `<span>` — a no-op,
    since inline elements ignore vertical margins. Changed to
    `display: block`.
  - Company name was rendering **bolder** (700) than the role (600) —
    inverted visual hierarchy. Fixed: role is now the strongest element
    (700, 1.25rem), company is clearly secondary but still much stronger
    than the original muted 500-weight.
  - Logo enlarged 50px → 64px with a hover scale; card hover gained a
    `scale(1.02)` alongside the existing lift + glow; added a 1px card
    border (cards were relying on shadow alone, which read as flat against
    a near-white page background).
  - Timeline widened (`.timeline-container` 900px→1040px max-width,
    `.timeline-item` 46%→48%, tighter logo margins) after the user reported
    the cards felt "congested" — usable text width went from ~244px to
    ~336px, meaningfully reducing text wrapping.
  - Added a `location` field with a map-pin icon (`react-icons/fa`
    `FaMapMarkerAlt`, matching the icon already used in Contact) to every
    experience entry. **Two of the four locations are inferred, not
    confirmed, and are marked `// TODO: confirm` in
    `src/data/experienceData.js`:**
    - Siemens Healthineers → `"Erlangen, Germany"` (inferred: Siemens
      Healthineers HQ is in Erlangen, matching where the user is doing
      their MSc).
    - Citibank → `"Budapest, Hungary"` (inferred: internship dates overlap
      with the user's BSc at ELTE in Budapest, and Citi has a major hub
      there).
    - **The user never explicitly confirmed or corrected these in this
      session.** Flag this to the user if working in this area again.
    - ELTE Instructor and GDG Technical Lead entries are `"Budapest,
      Hungary"` with high confidence (directly matches the education data).

### 3.5 PR #5 — `fix/about-cursor` → `main` (MERGED)

Triggered by: "the cursor is always down blinking and not following the
text." Turned into a much larger About-card overhaul across several rounds:

- **Root cause of the reported bug**: the blinking cursor `<span>` was a
  *sibling* of the `<p>` containing the typed text, not nested inside it.
  Since `<p>` is block-level, the cursor rendered on its own line below the
  paragraph instead of following the last character. Fix: moved the cursor
  span inside the `<p>`, immediately after `{displayText}`.
- **Accessibility finding, not just a style nitpick**: the typewriter effect
  cycled through paragraphs forever with **no way to stop it** — this fails
  **WCAG 2.2.2** ("Pause, Stop, Hide": content that auto-updates for more
  than 5 seconds must be pausable). Added a pause/play toggle button in the
  terminal's tools bar; toggling shows the entire bio as static, readable
  paragraphs instead of the single cycling paragraph. Defaults to the
  static view when `prefers-reduced-motion` is set.
- **Typing speed iteration** (the user went back and forth on this — it's
  worth knowing the final numbers and why): original code typed at
  25ms/char with a flat 2.5s hold. First pass sped this up to 12ms/char
  (too fast per user feedback) → 22ms/char (still described as too fast) →
  **38ms/char final** (explicit ask: "make it even more slower so it's
  comfortable to read"). The *hold* duration was also changed from a flat
  timer to `Math.max(2200ms, paragraph.length * 25ms)` so longer paragraphs
  (some run 400+ characters) actually get proportionally more time to be
  read before erasing starts.
- **Toggle label UX iteration**: first added a persistent text label next
  to the pause/play icon (for touch-device discoverability, since hover
  tooltips never fire on touch) → then, per explicit follow-up request,
  changed to hover/focus-only reveal to declutter the tools bar, with the
  explicit tradeoff acknowledged and accepted: touch users now only see the
  icon, not the label (the `aria-label` still always describes it for
  screen readers).
- **Font**: switched the About card's *body paragraph text* from monospace
  (Fira Code) to **Sora** (Google Font) — this was a deliberate,
  user-confirmed choice made via an explicit multiple-choice question (font
  candidates offered: General Sans, Space Grotesk, Sora, Manrope; user chose
  **Sora**) and an explicit scope question (site-wide vs. this-card-only;
  user chose **About card only**). Monospace remains everywhere else on the
  site (nav, Projects/Experience bullet lists, the toggle label, the new
  `>` terminal prompt). Sora is loaded via the same Google Fonts `<link>` in
  `public/index.html`, weights 400/500 only.
- **Aesthetic polish** (implemented as a batch, shown before commit, then
  approved): a centered fake `about.md` title in the terminal's tools bar;
  an accent-colored `>` prompt before the terminal text in both animated and
  static views (echoes the Hero's `> whoami` motif); a 1px card border
  matching the Experience card convention; clickable pagination dots on the
  About photo gallery (previously auto-rotate only, no manual control) plus
  a subtle Ken Burns zoom on the active photo; a custom slim scrollbar for
  the static/paused view (since showing all paragraphs at once can overflow
  the card's fixed height, requiring `overflow-y: auto`).

### 3.6 PR #6 — `feature/project-detail-pages` → `main` (MERGED)

The largest single feature of the session. Triggered by: "add a toggle in
the projects section too... when you click a project I want it to open a
dedicated page... make a reusable wiki-like template." Full breakdown:

**Routing infrastructure:**
- Added `react-router-dom`. **Deliberately used `HashRouter`, not
  `BrowserRouter`.** Reasoning that must be preserved: GitHub Pages is
  static hosting with no server-side rewrites, so a clean path like
  `/project/medledger` would 404 on page refresh or a direct link (the
  server has no route for it). `HashRouter` produces URLs like
  `/#/project/medledger`, which the *client* resolves entirely — the server
  only ever sees a request for `index.html`. This is the standard, low-risk
  choice for a CRA app on GH Pages without adding a 404-redirect hack.
- `src/App.js` restructured: a `Home` component holds the original
  single-page layout (`Header` + `Hero`/`About`/`Experience`/`Education`/
  `Projects`/`Contact` inside `<main>`); `Routes` now has `/` → `Home` and
  `/project/:slug` → `ProjectDetail`. `ThemeProvider` wraps the whole
  `HashRouter` so theme persists across routes.

**The reusable template — `src/components/ProjectDetail.jsx` /
`ProjectDetail.css`:**
- Fully data-driven from each project's object in `src/data/projects/`.
  Renders (only when present, hides gracefully when absent): thumbnail,
  full title, dates, tech-stack logos, a "View on GitHub" button
  (`githubUrl`), a "Live Demo" button (`liveUrl`), an "Overview" section
  reusing the existing `description` bullet array, and two **currently
  empty but fully wired** extension points for future content:
  - `sections: [{ heading, body: [...], list: [...], image }]` — free-form
    blocks, each field optional and independently rendered.
  - `gallery: [imagePath, ...]` — renders as a simple image grid.
  - **To add real wiki content for a project, extend its data object — do
    not edit the template.** This was explicit in the design intent.
- Sets `document.title` dynamically per project; has a "Project not found"
  fallback state for bad/stale slugs; scrolls to top on navigation.
- Has its own minimal header (a "← Back to portfolio" link + the existing
  `ThemeToggle` component) rather than reusing the main site `Header` —
  the main nav's anchor links (`#about`, `#experience`, etc.) don't make
  sense on a page that isn't the single-page layout.

**Data model changes** (`src/data/projects/project1.js` through
`project6.js`), each project object now has: `id`, `slug`, `title`,
`dates`, `description[]`, `techStack[]`, `thumbnail`, `githubUrl`,
`liveUrl`, `sections: []`, `gallery: []`.

**GitHub links — real research done, not guessed:**
Used `gh repo list NavneetKishanS --limit 100 --json name,url,description,...`
(this lists **private repos too**, since `gh` is authenticated as the
account owner) and matched 5 of 6 projects to real, existing repos:

| Project (slug) | Matched repo |
|---|---|
| `medledger` | `https://github.com/NavneetKishanS/medledger` |
| `safari-simulation` | `https://github.com/NavneetKishanS/safari-game` |
| `labyrinth` | `https://github.com/NavneetKishanS/labyrinth-java-swing-game` |
| `radiology-rag` | `https://github.com/NavneetKishanS/radiology-dx-agent` |
| `rabin-cryptosystem` | `https://github.com/NavneetKishanS/rabin-cryptosystem` |
| `gnn-path-planning` | **NOT FOUND** — no repo in the account (public or private) matched. `githubUrl` left as `""` with a `// TODO: add repo URL` comment. **The user has not yet supplied the real repo name — outstanding item, ask before inventing one.** |

**Data-loading refactor:** centralized project loading into a new
`src/data/projects/index.js` (a `require.context`-based loader) so both the
card list (`Projects.jsx`) and the detail page (`ProjectDetail.jsx`) share
one source of truth instead of each doing their own `require.context` call.
Deleted `src/data/projects/index.json`, a stale file that referenced
`project1.json`/`project2.json` — files that never existed; pure dead
weight from an earlier iteration of the project.

**Projects section — full overhaul, several iteration rounds:**

1. Cards now navigate to `/#/project/<slug>` on click (tilt-hover physics
   preserved from the original implementation).
2. **Autoplay marquee replaced — and this had a real bug worth recording
   in detail.** The original marquee was a CSS `@keyframes` animation
   (`translateX` looping via a duplicated card list) pausable only via
   `:hover` — which never fires on touch devices, so touch/mobile users had
   **no way to stop a continuously auto-scrolling element** (same class of
   WCAG 2.2.2 gap as the About typewriter). First replacement attempt used
   a discrete `setInterval` that jumped the scroll position by one full
   card every 3.8 seconds. **The user reported this as "it has completely
   stopped"** — the actual root cause: a discrete periodic jump sits
   *completely motionless* between jumps, which reads as broken/stopped to
   a casual glance, even though it was technically "working." **Lesson for
   future auto-scroll/carousel features on this site: users expect
   continuous, perceptible motion for anything called "auto-scroll" — a
   discrete stepper reads as broken even if functionally similar.** Fixed
   by rebuilding autoplay as a `requestAnimationFrame` loop directly
   incrementing `scrollLeft` (~60px/s, matching the original marquee's
   pace), restoring the doubled-card-list technique so the loop wraps
   invisibly at the halfway point of `scrollWidth`. Final result: genuinely
   continuous auto-scroll, pausable via hover **and** an explicit
   pause/play button, plus prev/next arrow buttons for manual browsing —
   strictly better than the original on accessibility while preserving the
   original's visual feel.
3. Description bullets removed from cards (now live on the detail page);
   replaced with a "View project details →" element.
4. **Title-length iteration, fully reverted — important not to redo this.**
   Card titles are long, academic-style descriptions (e.g. "MedLedger: A
   Secure, Modular EHR System Integrating FHIR Standards and Blockchain
   Auditability", ~97 characters; Safari's title runs ~114 characters).
   These caused wildly uneven card heights, which was the actual root cause
   of an uneven "View project details" position the user flagged. First fix
   attempt added a `shortTitle` field per project and used it on cards
   (keeping the full title only on the detail page's `<h1>`) — this
   *worked* for the layout problem, but the user explicitly rejected it:
   **"revert the titles to actual full titles because I want the website to
   give off 'researcher'... the descriptive titles help."** `shortTitle`
   was fully removed from all 6 data files (not just unused — deleted).
   **Do not reintroduce shortened card titles without asking again** — this
   was a deliberate identity/positioning choice, not an oversight.
   The actual fix that stuck: `.project-card` uses `display:flex;
   flex-direction:column`, `min-height: 540px` (generous enough for even
   the longest full title), and the "View project details" element uses
   `margin-top: auto` so it's pinned to each card's own bottom edge
   regardless of how many lines the title wraps to.
5. Added a "Click a project to view full details" subtitle under the
   section heading — **then removed it** a couple of turns later, per the
   user's own observation that it was redundant once every card had an
   explicit visible button ("we can anyway see 'click to view details' for
   each card right?"). Agent agreed and removed it along with the CSS.
6. **Fixed a real CSS specificity bug** while addressing the subtitle/
   heading request: the "Projects" `<h2>` was rendering at `2rem` via a
   low-specificity shared `.section-title` class, while Experience and
   Education both render their `<h2>` at `2.25rem / weight 700 / 60px
   margin-bottom` through their own scoped selectors
   (`.experience-section h2`, `.education-section h2` — higher specificity,
   so those actually win even though a `.section-title` class exists on
   their elements too). Projects.css's `.section-title` now matches that
   exact convention. **If you see a heading on this site that looks
   slightly off-size compared to its siblings, check for this exact
   pattern** — a generic shared class losing to component-scoped selectors
   is an easy trap in this codebase since CSS isn't modularized/scoped.
7. Added a thumbnail hover overlay (darken + "View project" text/arrow
   reveal + subtle image zoom), and `title` attributes on tech-stack logos
   as tooltips (needed once the description bullets were removed and tech
   logos became one of the few remaining informational elements on a card).
8. **Corner GitHub badge — implementation detail worth preserving
   carefully.** Once real `githubUrl` values existed, added a small
   circular GitHub icon in the top-right corner of each card linking
   directly to the repo. The entire card was, at that point, a single
   `<Link>` (renders as `<a>`). **Nesting a raw `<a>` badge inside that
   `<a>` would have been invalid HTML that browsers actually mis-parse** —
   per the HTML5 parsing spec's handling of the `<a>` tag (the "adoption
   agency algorithm"), encountering a nested `<a>` causes the browser to
   silently close the *outer* anchor early, which would have broken
   card-navigation for any content appearing after the badge in DOM order.
   Fixed by restructuring: the outer element (`.project-card`) is now a
   **plain `motion.div`** (not a link) carrying the tilt/hover physics,
   sizing, and border; it contains **two sibling links**:
   `.project-card-link` (a real `Link` wrapping the thumbnail + content,
   `height: 100%`, handles navigation to the detail page) and
   `.project-github-badge` (a real `<a>`, `position: absolute; top/right;
   z-index: 2`) layered on top. Because they're siblings, not
   ancestor/descendant, clicks correctly route to whichever element is
   topmost at that exact pixel — no `stopPropagation()` needed. **If you
   ever need to add another "escape hatch" link inside a card-that's-a-link
   anywhere on this site, replicate this sibling-links pattern, not nested
   anchors.**

### 3.7 Housekeeping (no PR — local machine only)

At the end of the session, killed **11 leftover `react-scripts start`**
Node processes that had accumulated across the session from repeatedly
starting dev servers on different ports (3100, 3200, 3300, etc.) without
always cleaning up the previous one. VS Code's own Node-based helper
processes (TypeScript server, GitHub Copilot, language servers) were
deliberately left untouched — those aren't "servers" in the sense the user
meant, and killing them would have disrupted the editor session.
**Reminder for future agents**: when starting a dev server for the user to
review, check `lsof -i :<port>` before reusing a port, and make an effort to
`pkill` your own server when you're done with it in the same turn/session —
don't rely on the user to notice accumulation.

---

## 4. Current architecture reference (as of `main`, post-PR #6)

### Routing
- `HashRouter` in `src/App.js`. `/` → full single-page site. `/project/:slug`
  → `ProjectDetail`.

### Design tokens (`src/themes.css`)
Only these exist on `main` — do not assume the apple-style branch's extra
tokens (`--text-display`, `.container`, `--section-pad-y`, etc.) are
available unless you've specifically merged that branch's work:
- Colors: `--color-bg`, `--color-surface`, `--color-surface-alt`,
  `--color-text`, `--color-text-muted`, `--color-border`, `--color-accent`,
  `--color-accent-soft`, `--color-accent-contrast` — all redefined under
  `[data-theme="dark"]`.
- Fonts: `--font-primary` (Inter), `--font-mono` (Fira Code).
- Elevation/motion: `--shadow-sm/md/glow`, `--radius-lg/md`,
  `--transition-fast/base`.
- `--icon-filter`: `none` in light, `invert(1) brightness(1.5)` in dark —
  used for simple-icons-style monochrome SVGs that assume a dark
  background by default.
- Global `@media (prefers-reduced-motion: reduce)` block forces all CSS
  `animation`/`transition` durations near-zero. **This does not stop
  JS-driven timers** (`setTimeout`/`setInterval`/`requestAnimationFrame`) —
  every component with JS-driven animation (Hero typing, About typing,
  Projects autoplay) independently checks
  `window.matchMedia("(prefers-reduced-motion: reduce)").matches` at module
  scope and gates its own effect.

### Fonts loaded (`public/index.html`)
Single Google Fonts `<link>`: Inter (400/500/600/700), Fira Code
(400/500/600), Sora (400/500 — used only by the About card body text).

### Key components and their quirks
- **`Header.jsx`**: sticky nav, scroll-spy active-link highlighting via
  `IntersectionObserver`, animated underline (`framer-motion` `layoutId`).
- **`Hero.jsx`**: typewriter role-text cycling (`prefers-reduced-motion`
  aware), vertical social icon rail, entrance stagger via `framer-motion`
  variants.
- **`About.jsx`/`About.css`**: the "terminal window" card. Has an
  animated-typing mode and a static/paused mode (toggle button in the tools
  bar, `FaTerminal`/`FaAlignLeft` icons, hover/focus-reveal label). Photo
  gallery on the right auto-rotates every 6s with clickable pagination dots
  and a Ken Burns zoom on the active photo. Body text font is **Sora**
  (only place on the site that isn't Inter or Fira Code).
- **`Experience.jsx`/`Experience.css`**: alternating left/right timeline,
  bullet-point descriptions, `location` field with a map-pin icon. See
  §3.4 for the two unconfirmed inferred locations.
- **`Projects.jsx`/`Projects.css`**: `requestAnimationFrame`-driven
  continuous auto-scroll (doubled card list, wraps at `scrollWidth / 2`),
  pause/play + prev/next controls, cards are `motion.div` containing two
  sibling links (main card link + GitHub badge — see §3.6 point 8). Full
  descriptive titles, `min-height: 540px` cards, button pinned via
  `margin-top: auto`.
- **`ProjectDetail.jsx`/`ProjectDetail.css`**: see §3.6. Fully data-driven,
  currently rendering only thumbnail/title/dates/tech/description/links for
  all 6 projects since `sections`/`gallery` are still empty arrays
  everywhere.
- **`Contact.jsx`**: uses the same `FaMapMarkerAlt` icon convention as
  Experience.

### Data files (`src/data/`)
- `experienceData.js`, `educationData.js`, `aboutText.json`,
  `aboutImages.json` — straightforward.
- `projects/project1.js` … `project6.js` — see schema in §3.6. Loaded via
  `projects/index.js` (webpack `require.context`, matches
  `project\d+\.js$`).

---

## 5. Outstanding / unresolved items — check these before assuming "done"

1. **`gnn-path-planning` project has no GitHub link.** User needs to supply
   the real repo name (or confirm it doesn't exist yet / is private under a
   different name not visible to the authenticated `gh` account — unlikely
   since private repos were included in the search, but possible if it's
   under a different GitHub account).
2. **Two Experience locations are inferred, not confirmed**: Siemens
   Healthineers → "Erlangen, Germany" and Citibank → "Budapest, Hungary",
   both marked `// TODO: confirm` in `src/data/experienceData.js`. Never
   explicitly addressed by the user after being flagged.
3. **PR #2 (`feature/apple-style`) is still open, unmerged, and based on
   `feature/visual-refresh` rather than current `main`.** Significant
   design work lives there (full-bleed sections, type scale, Statement
   section, sticky-nav-with-shrink, a completely different Projects
   scroll-snap-gallery implementation) that was never reconciled with the
   Experience/About/Projects work done later directly on `main`. Ask the
   user whether they want to: (a) abandon/close it, (b) rebase and
   selectively merge parts of it, or (c) treat it as dead reference
   material. Don't silently merge or silently close it.
4. **`ProjectDetail.jsx`'s `sections` and `gallery` arrays are empty for
   all 6 projects.** The template fully supports rich per-project content
   (architecture write-ups, extra screenshots, feature lists) but none has
   been authored. This is presumably intentional — the user asked for the
   *template* first — but it means the detail pages are currently fairly
   thin (thumbnail + description bullets only, same info as the card).
5. **No automated tests were added or exist** for any of this work — all
   verification was `npm run build` + manual browser review by the user.
