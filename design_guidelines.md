# ALL Terrain Golf Carts - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from premium automotive websites (Tesla, Rivian) and high-end e-commerce product configurators. This showcases the vehicles as premium products with sophisticated presentation and interactive product exploration.

## Core Design Principles
- **Product-First**: Vehicle imagery dominates the experience
- **Interactive Configuration**: Seamless color selection with instant visual feedback
- **Technical Credibility**: Specs and 4X4 capabilities presented authoritatively
- **Premium Positioning**: Elevated design matching the ~$15K-$17K price point

## Typography System
- **Headings**: Modern sans-serif, bold weights (700-800) for model names and section headers
- **Body**: Clean sans-serif, regular weight (400) for specifications and descriptions
- **Technical Specs**: Monospace or semi-condensed font for specification tables, medium weight (500)
- **Hierarchy**: Large hero text (4xl-6xl), section headers (2xl-3xl), body (base-lg), specs (sm-base)

## Layout System
**Tailwind Spacing Primitives**: Core units of 4, 8, 12, 16, 24 for consistent rhythm
- Section padding: py-16 to py-24 (desktop), py-12 (mobile)
- Component spacing: gap-8 for grids, space-y-4 for stacked content
- Container: max-w-7xl with px-4 to px-8

## Page Structure

### Homepage
1. **Hero Section** (full viewport): Large hero image of flagship model (XT6) with overlay headline "Conquer Any Terrain" + primary CTA. Blurred background for text/button overlay.
2. **Model Showcase**: Two-column grid (desktop) introducing both models with teaser images and key specs
3. **4X4 Capabilities**: Visual section with terrain imagery demonstrating off-road prowess, bullet points of capabilities
4. **Features Highlights**: 3-column grid showcasing premium features (touchscreen, sound system, street-legal capability)
5. **Social Proof**: Customer testimonials or use-case scenarios
6. **Final CTA**: Strong call-to-action for browsing models or contacting dealer

### Individual Model Pages (XT4 & XT6)
1. **Interactive Product Configurator** (above fold):
   - Large product image (occupies 60-70% of viewport width)
   - Color selector: 6 circle swatches positioned prominently (below or beside image)
   - Swatch design: 60-80px diameter circles, active state indicator (border/ring)
   - Image updates instantly on swatch click
   
2. **Model Overview**: Name, starting price, key differentiator (4-seat vs 6-seat)

3. **Detailed Specifications** (multi-section):
   - **Power & Performance**: Grid layout for battery, motors, speed, range
   - **Dimensions & Capacity**: Table format with measurements
   - **Features & Comfort**: Bullet list or card grid with icons
   - **4X4 System Details**: Dedicated section explaining drive system, terrain capability
   - **Street Legal/LSV Info**: Compliance details and optional upgrades

4. **Feature Deep-Dives**: Individual sections for standout features (24-speaker system, built-in refrigerator, Apple CarPlay) with supporting imagery

5. **Comparison Table**: Side-by-side XT4 vs XT6 specifications

6. **CTA Section**: Dealer inquiry form or contact information

## Component Library

### Navigation
- Fixed header with logo, model links, contact CTA
- Mobile: Hamburger menu with full-screen overlay

### Color Swatches
- Interactive circles with hover effects (scale/elevation)
- Active state: Prominent border or ring indicator
- Positioned in horizontal row or compact grid
- Labels appear on hover (desktop) or always visible (mobile)

### Specification Cards
- Clean cards with icon, label, value
- Grid layout: 2-3 columns (desktop), single column (mobile)
- Subtle borders, generous internal padding (p-6)

### Image Galleries
- Primary product images: High-resolution, clean backgrounds
- Secondary images: In-use scenarios, terrain shots, detail close-ups
- Aspect ratio: Maintain 4:3 or 16:9 for consistency

### Forms (Contact/Inquiry)
- Two-column layout (desktop): Form fields left, contact info/map right
- Clear labels, generous input padding (p-3), focus states
- Submit button: Prominent, full-width on mobile

### Feature Icons
- Use Heroicons (via CDN) for UI elements and feature highlights
- Consistent size: 24px or 32px standard

## SEO-Optimized Content Structure
- Prominent H1 tags with model names on individual pages
- Structured spec tables with semantic HTML
- Rich descriptive text emphasizing "4X4," "all-terrain," "off-road capability"
- Alt text for all vehicle images describing model and color

## Images Required

### Hero Images
- Homepage: Wide-angle shot of XT6 on rugged terrain (1920x1080+)
- Model pages: Clean studio shot of each model in RED (provided), plus 5 additional color variations per model

### Supporting Images
- 4X4 capability: Action shots on hills, mud, rough terrain
- Feature close-ups: Dashboard, sound system, refrigerator, seats
- Lifestyle images: Families using carts, community settings
- Comparison visuals: Side-by-side model shots

### Image Treatment
- Consistent lighting and angle across color variations
- Clean backgrounds for product configurator
- Natural/authentic settings for lifestyle shots

## Mobile Considerations
- Color swatches: Grid layout (3x2) on narrow screens
- Specifications: Accordion or stacked cards
- Product images: Full-width, swipe-enabled gallery
- Navigation: Sticky header with compact menu

## Animations
- Smooth color swatch transitions (fade/crossfade between images)
- Subtle scroll reveals for spec sections (fade-in)
- Minimal decorative animations - focus on functional interactions

This design creates a premium, conversion-focused experience that showcases these vehicles as sophisticated products while making technical specifications easily digestible and highlighting their unique 4X4 all-terrain capabilities.