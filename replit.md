# ALL Seasons Golf Carts Website

## Overview
A premium static website for ALL Seasons Golf Carts (allseasonsgolfcarts.com) showcasing EVolution D-MAX XT4 and XT6 4X4 electric golf carts. The site is designed for SEO optimization to rank for 4X4 golf cart searches and emphasizes year-round all-season capability (Winter, Spring, Summer, Fall). Features interactive color swatches, detailed specifications, and a contact form.

## Technology Stack
- **Frontend**: React with TypeScript, Vite, TailwindCSS, Wouter (routing)
- **Backend**: Express.js with in-memory storage
- **UI Components**: Shadcn/UI component library
- **Styling**: Custom premium automotive color theme with dark mode support

## Project Structure

### Frontend (`client/src/`)
- `pages/` - Main page components
  - `Home.tsx` - Homepage with hero, model showcase, 4X4 capabilities
  - `ModelXT4.tsx` - XT4 model page with color swatches and specs
  - `ModelXT6.tsx` - XT6 model page with color swatches and specs
  - `Contact.tsx` - Contact form and business information
  - `Financing.tsx` - 6 financing options (Sheffield, BLI, DLL, Roadrunner, Univest, Dealer Direct)
  - `Blog.tsx` - Blog index page listing all SEO-optimized blog posts
  - `BlogPost.tsx` - Individual blog post page with dynamic routing and full SEO
- `data/` - Data files
  - `blogPosts.ts` - 8 complete SEO-optimized blog posts with metadata
  - `locations.ts` - Location data for dealer pages
- `components/` - Reusable components
  - `Header.tsx` - Navigation header with dark mode toggle
  - `Footer.tsx` - Site footer with links (including Blog link)
  - `ColorSwatches.tsx` - Interactive color selector (6 colors)
  - `SpecTable.tsx` - Specification display cards
  - `FeatureCard.tsx` - Feature highlight cards
  - `ui/` - Shadcn UI components

### Backend (`server/`)
- `routes.ts` - API endpoints for contact form
- `storage.ts` - In-memory storage for contact submissions

### Shared (`shared/`)
- `schema.ts` - TypeScript types and Zod validation schemas

## Models Featured
1. **EVolution D-MAX XT4** - 4-passenger 4X4 golf cart (~$15,595 MSRP)
2. **EVolution D-MAX XT6** - 6-passenger 4X4 golf cart (~$17,595 MSRP)

## Color Options (Both Models)
- White, Black, Blue, Gray, Red, Sky Blue

## Key Features
- Responsive design for desktop and mobile
- Dark/light mode toggle
- Interactive color swatches (ready for image uploads)
- SEO-optimized meta tags and content
- 4X4 capability emphasis throughout
- Contact form with validation
- Comparison tables between models

## API Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Retrieve contact submissions

## Running the Project
```bash
npm run dev
```
The development server runs on port 5000 with hot module reloading.

## Image Assets
The site uses placeholder images (red color) for both models. Once color-specific images are uploaded, update the `colorImages` object in `ModelXT4.tsx` and `ModelXT6.tsx` to map each color to its respective image.

## Blog System
The site includes a fully SEO-optimized blog system with 8 articles targeting "All Seasons Golf Carts":
1. Winter Driving with 4WD Performance
2. Beach Driving for Coastal Adventures
3. Off-Road Adventure Trail Riding
4. Water Crossing and Creek Fording
5. Festival and Large Event Transportation
6. County Fair Summer Adventures
7. Mountain Scenic Drives
8. Lake Resort Community Living

Each blog post includes:
- Unique SEO title, meta description, and URL slug
- Full heading hierarchy (H2-H6)
- Internal links to XT4/XT6 product pages
- Hero images used for OG/social sharing
- Schema.org BlogPosting structured data

## Recent Changes
- Added comprehensive blog system with 8 SEO-optimized posts
- Blog index page at /blog with article cards
- Individual blog pages at /blog/:slug
- Blog link added to footer navigation
- Financing page with 6 provider options
- Updated favicon and OG images with new branding
- Mobile-optimized product pages (no fixed elements)
- Premium automotive color theme implemented
- SEO meta tags added to index.html
- Contact form with backend API
- Dark mode support
