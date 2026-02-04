# Kriya Shah | Portfolio

A premium, editorial, dark-mode portfolio for a junior creative and strategy profile. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

If you see module resolution or cache errors, try:
```bash
rm -rf .next
npm install
npm run dev
```

## Project Structure

```
website_kriya/
├── src/
│   ├── content/
│   │   └── projects.ts       # Edit project content and site config here
│   ├── app/
│   │   ├── layout.tsx        # Root layout, metadata
│   │   ├── page.tsx          # Home
│   │   ├── work/
│   │   │   ├── page.tsx      # Work index
│   │   │   └── [slug]/page.tsx # Project detail
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── resume/route.ts   # Redirects to /resume.pdf
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── not-found.tsx
│   └── components/
│       ├── Layout/           # Header, Footer
│       ├── Hero.tsx
│       ├── Container.tsx
│       ├── ProjectCard.tsx
│       ├── ProjectMeta.tsx
│       ├── SectionHeading.tsx
│       ├── RichList.tsx
│       ├── Gallery.tsx
│       ├── NextPrevNav.tsx
│       ├── PlaceholderImage.tsx
│       └── Analytics.tsx     # Disabled by default
├── public/
│   ├── projects/             # Add project images here
│   ├── reference/            # LORE design reference HTML files
│   │   ├── lore-home.html
│   │   └── lore-fragrances.html
│   ├── resume.pdf            # Add your resume
│   ├── favicon.svg
│   └── placeholder.png
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

## How to Add or Edit Projects

1. Open `src/content/projects.ts`.
2. Edit the `projects` array. Each project has:
   - `slug` (URL path, e.g. `bond-sai`)
   - `title`, `descriptor`, `year`, `tags`
   - `role`, `context`, `insight`
   - `strategy[]`, `creativeDirection[]`, `deliverables[]`, `impact[]`
   - `gallery[]` with `{ src, alt, caption }`
3. Save. The site updates automatically.

To add a new project, copy an existing object and change the slug. Ensure the slug matches the folder name in `public/projects/[slug]/`. Replace `/placeholder.png` in the gallery with your actual image paths when you add them.

## How to Replace Placeholder Images

1. Add images to `public/projects/[slug]/` (e.g. `public/projects/bond-sai/hero.jpg`).
2. Update the `gallery` array in `src/content/projects.ts` to match your filenames.
3. Use clear filenames: `hero.jpg`, `identity.jpg`, `packaging.jpg`, etc.

If an image is missing, the site shows an "Image unavailable" placeholder gracefully. No broken images.

## How to Deploy to Vercel

1. Push your repo to GitHub.
2. Go to [vercel.com](https://vercel.com) and sign in.
3. Click "Add New Project" and import your repo.
4. Vercel auto-detects Next.js. Click "Deploy".
5. Set `NEXT_PUBLIC_SITE_URL` in Project Settings > Environment Variables to your production URL (e.g. `https://kriyashah.com`).
6. Add a custom domain in Project Settings > Domains.

## Where to Put resume.pdf

Place `resume.pdf` in the `public` folder:

```
public/resume.pdf
```

The `/resume` route redirects to `/resume.pdf`. Update your email and LinkedIn in `src/content/projects.ts` under `siteConfig`.

## Design Reference

LORE Fragrances HTML files are in `public/reference/`. View them at `/reference` or directly:
- `/reference/lore-home.html`
- `/reference/lore-fragrances.html`

These are used as design inspiration. A "Reference" link is in the footer.

## Typography System

The site uses system fonts by default. To switch to a serif + sans pairing:

1. Add your font (e.g. via `next/font`).
2. Update `tailwind.config.ts`:

```ts
fontFamily: {
  serif: ["YourSerifFont", "Georgia", "serif"],
  sans: ["YourSansFont", "system-ui", "sans-serif"],
},
```

3. Components already use `font-serif` and `font-sans` classes.

## Final Checklist

- [x] **Accessibility**: Semantic HTML, skip link, keyboard nav, focus states, aria labels, reduced-motion support
- [x] **Responsiveness**: Mobile-first, overlay nav on small screens, responsive typography
- [x] **SEO**: Metadata, OpenGraph, favicon, sitemap, robots.txt, clean URLs
- [x] **Performance**: Next/Image, lazy loading, responsive images, minimal dependencies
- [ ] **Content**: Replace placeholder images, add resume.pdf, update email/LinkedIn in `content/projects.ts`
- [ ] **Analytics**: Set `ENABLE_ANALYTICS = true` in `src/components/Analytics.tsx` and add your provider
