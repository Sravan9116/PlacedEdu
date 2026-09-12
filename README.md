# PLACED — Career Readiness Operating System

> **"INFINITE POSSIBILITIES. DEFINITE OUTCOME."**

A complete, production-quality frontend website built from scratch using pure **HTML5**, **CSS3**, and **Vanilla JavaScript**. Designed with the editorial elegance, structured technology feel, and corporate sophistication of a modern **Career Readiness Operating System**.

---

## 1. Project Overview

PLACED bridges academic training and competitive enterprise recruitment. Unlike generic coaching platforms, PLACED operates through a systematic 7-phase architecture combining diagnostic skill benchmarking, high-stakes recruitment simulations (coding rounds, group discussions, stress interview boards), and practitioner mentorship.

### Key Architectural Highlights:
- **Zero Framework Overhead**: No React, Vue, Next.js, Angular, Tailwind, or Bootstrap. Pure web standards.
- **Zero Build Step**: Fully functional when served from any standard web server or static host.
- **Dynamic Theme Engine**: Seamless Light & Dark modes powered by CSS Custom Properties and persisted via `localStorage`.
- **Responsive Engineering**: Tested from 375px mobile screens up to 1920px 4K displays with zero horizontal scroll.
- **Accessible (WCAG 2.1 AA)**: Semantic elements, full keyboard navigation (Tab, Enter, Space, Escape), focus rings, and screen reader labels.
- **Motion Calibrated**: Subtle micro-interactions, IntersectionObserver reveal triggers, and full `@media (prefers-reduced-motion: reduce)` support.

---

## 2. Directory Structure

```
placed-frontend/
│
├── index.html                  # Homepage: Hero, OS Live Dashboard, Journey, 7-Phase Orbit, Ecosystem, Mentors, Stats, Quote, Final CTA
├── about.html                  # About Us: Mission, 5 Operating Principles, 4-Stage Operating Model visual diagram
├── programs.html               # Programs: Corporate Readiness, Public Exam Foundation, Academic Navigator deep-dives & scorecard visuals
├── mentors.html                # Mentors: Filterable mentor directory (Career, Comm, Aptitude) + Accessible Profile Modal
├── leadership.html             # Leadership: Executive profiles (Abhishek, Vishnu, Vigneswaran) + Strategic pillars
├── alumni.html                 # Alumni Success: Transformation stories + Vanilla JS accessible carousel/slider
├── contact.html                # Contact: Interactive enquiry form (demo feedback + Netlify ready) + FAQ accordion
├── 404.html                    # Custom 404 error page ("This page went off the roadmap")
│
├── robots.txt                  # Search crawler directives + sitemap pointer
├── sitemap.xml                 # Canonical XML sitemap for all routes
├── site.webmanifest            # PWA-compatible web manifest with brand colors
├── _headers                    # Security headers (nosniff, X-Frame-Options, caching policies)
├── .gitignore                  # Standard web gitignore
├── README.md                   # Complete documentation
├── package.json                # Lightweight preview scripts
│
├── css/
│   └── main.css                # Comprehensive design system: CSS variables, dark/light themes, typography, layout, animations, responsive breakpoints
│
├── js/
│   └── main.js                 # Modular Vanilla JS: theme, mobile nav, phase wheel, mentor filter, alumni slider, FAQ, counters, back-to-top, form validation
│
├── assets/
│   ├── images/                 # SVG logo mark, abstract radar/system diagrams, placeholder geometric avatars, OG banner
│   └── icons/                  # Crisp SVG UI icons (sun, moon, arrows, checkmarks, favicon)
│
├── docs/
│   └── DEPLOYMENT-CHECKLIST.md # Step-by-step production verification & deployment guide
│
└── .github/
    └── workflows/
        └── pages.yml           # GitHub Actions workflow for zero-config GitHub Pages deployment
```

---

## 3. Local Development

Because PLACED is built entirely on native web standards, you do not need to install heavy build tools or run `npm install`.

### Option A: Using `npx serve`
```bash
# Inside the placed-frontend directory:
npx serve .
```

### Option B: Using Python
```bash
# Python 3
python -m http.server 3000
```

### Option C: VS Code Live Server
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

Visit your local address (e.g. `http://localhost:3000`) in any modern browser.

---

## 4. Deployment Instructions

### 1. GitHub Pages (Automated via GitHub Actions)
1. Push this repository to GitHub.
2. In your repository settings, go to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The included workflow `.github/workflows/pages.yml` will automatically deploy the site on every push to the `main` branch.

### 2. Netlify
1. Connect your GitHub repository to [Netlify](https://www.netlify.com/).
2. Set **Build command** to empty (leave blank).
3. Set **Publish directory** to `.` (the project root).
4. Click **Deploy Site**. Netlify will automatically respect the `_headers` file for caching and security policies.

### 3. Vercel
1. Import your repository into [Vercel](https://vercel.com/).
2. Select **Other** as the Framework Preset.
3. Keep the Root Directory as `./`.
4. Click **Deploy**.

---

## 5. Replacing Placeholder Content

Before going live with official corporate announcements, make sure to replace placeholder items with company-approved assets:

1. **Production Domain**:
   Search for `YOUR-DOMAIN.com` and replace with your verified URL in `robots.txt`, `sitemap.xml`, and the canonical/meta tags in all HTML files.
2. **Student Testimonials**:
   Search for `TODO: Replace with approved company content` in `alumni.html`. Replace sample quotes with verified graduate feedback.
3. **Photography**:
   Place official high-resolution `.webp` or `.jpg` portraits into `assets/images/` using the established file names (`mentor-abhishek.webp`, `alumni-devi.webp`, etc.).
4. **Form Handling**:
   Wire `contact.html` to your preferred production endpoint (Netlify Forms, Formspree, EmailJS, or company backend API).

---

## 6. License & Credits

Designed and engineered for **PLACED**.
All rights reserved © 2026 PLACED Systems.
