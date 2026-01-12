# ALL Terrain Golf Carts Website

## Overview
A premium static website for ALL Terrain Golf Carts (allterraingolfcarts.com) showcasing EVolution D-MAX XT4 and XT6 4X4 electric golf carts. The site is designed for SEO optimization to rank for 4X4 golf cart searches and features interactive color swatches, detailed specifications, and a contact form.

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
- `components/` - Reusable components
  - `Header.tsx` - Navigation header with dark mode toggle
  - `Footer.tsx` - Site footer with links
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

## Recent Changes
- Initial website creation with all pages and components
- Premium automotive color theme implemented
- SEO meta tags added to index.html
- Contact form with backend API
- Dark mode support
