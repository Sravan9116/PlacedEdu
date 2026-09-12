# PLACED — Production Deployment Checklist

This document provides a comprehensive step-by-step verification checklist to take the **PLACED** frontend from local development to production on **GitHub Pages**, **Netlify**, or **Vercel**.

---

## 1. Pre-Deployment Content Verification

- [ ] **Domain Placeholder Replacement**:
  - Replace all occurrences of `https://YOUR-DOMAIN.com/` with your verified production domain (e.g., `https://placed.edu` or `https://placedcareers.com`).
  - Check files:
    - `robots.txt`
    - `sitemap.xml`
    - Canonical tags in all `*.html` files
    - OpenGraph image URLs in all `*.html` files
    - `package.json` / `site.webmanifest`
- [ ] **Leadership Bios & Testimonials**:
  - Search codebase for `TODO: Replace with approved company content`.
  - Replace placeholder testimonials in `alumni.html` with real, company-approved student quotes.
  - Verify that no fabricated metrics or credentials remain in production copy.
- [ ] **Asset Swaps**:
  - Replace SVG placeholder portraits in `assets/images/` (`mentor-abhishek.svg`, `alumni-devi.svg`, etc.) with approved photographs (recommended format: `.webp` or optimized `.jpg`).
  - Maintain the existing file naming convention for zero-code replacement.

---

## 2. Form Backend Integration

The contact form in `contact.html` is pre-configured with semantic fields and Netlify attributes (`data-netlify="true"`). For production submission handling, choose one of the following:

- [ ] **Option A: Netlify Forms**
  - Works automatically on Netlify deploys. Ensure the hidden field `<input type="hidden" name="form-name" value="placed-contact">` remains present.
- [ ] **Option B: Formspree**
  - Set `<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`.
- [ ] **Option C: EmailJS or Company API**
  - In `js/main.js` inside `ContactFormModule`, replace the local demo handler with an `async fetch()` call to your API endpoint.

---

## 3. SEO & Metadata Audit

- [ ] Every page has a unique `<title>` and `<meta name="description">`.
- [ ] OpenGraph image (`assets/images/og-image.svg`) is present and resolves correctly.
- [ ] Favicon (`assets/icons/favicon.svg`) displays properly across browsers and bookmark bars.
- [ ] `site.webmanifest` is referenced on every HTML page.
- [ ] Search engine robots file `robots.txt` allows crawling (`Allow: /`) and specifies the sitemap path.

---

## 4. Accessibility & Performance Verification

- [ ] **WCAG 2.1 AA Compliance**:
  - All interactive elements can be reached and activated via keyboard (`Tab`, `Enter`, `Space`, `Escape`).
  - Profile modal closes when pressing `Escape` or clicking outside.
  - Color contrast between `--teal-2` (#11D1C1) and dark navy (#031827) satisfies AAA ratio (>7:1).
  - All images contain descriptive `alt` text.
- [ ] **Responsive Viewport Testing**:
  - Tested at 375px, 480px, 768px, 1024px, 1440px, and 1920px.
  - No horizontal scrolling on mobile viewports.
  - Mobile hamburger drawer operates smoothly and locks background scrolling while active.
- [ ] **Reduced Motion Support**:
  - Tested with `@media (prefers-reduced-motion: reduce)` enabled in operating system settings.
  - Major parallax/scroll animations cease while retaining all content and functionality.

---

## 5. Hosting Platform Verification

### GitHub Pages
- [ ] Ensure `.github/workflows/pages.yml` is committed to the repository.
- [ ] In repository Settings → Pages, select Source: **GitHub Actions**.

### Netlify
- [ ] Push repository to GitHub/GitLab.
- [ ] Connect repository in Netlify dashboard.
- [ ] Build command: leave blank (pure static site).
- [ ] Publish directory: `.` (or root folder).
- [ ] Verify security headers from `_headers` are applied in response headers.

### Vercel
- [ ] Run `vercel` CLI or import Git repository on Vercel dashboard.
- [ ] Framework Preset: **Other**.
- [ ] Output directory: `.` (root).

---

## 6. Post-Launch Smoke Test

- [ ] Test theme toggle persistence across page refreshes (`localStorage` key: `placed-theme`).
- [ ] Test 7-phase orbital selector on the homepage across mobile and desktop.
- [ ] Test filter buttons and modal profile on `mentors.html`.
- [ ] Test testimonial carousel on `alumni.html` (prev, next, dots, autoplay pause on hover).
- [ ] Test FAQ accordion on `contact.html` (only one panel open at a time).
- [ ] Test custom 404 page by navigating to an invalid route (e.g. `/invalid-test-route`).
