# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for Anandi Yoga, a wellness business in Zürich offering:
- Traditional Hatha Yoga courses
- Hair spa/wellness hair services  
- Ayurveda cooking classes

## Technology Stack

- **Frontend**: Pure HTML5, CSS3, and vanilla JavaScript (no frameworks)
- **Styling**: Single CSS file (`anandi.css`) using modern CSS features
- **Form Handling**: Formcarry external service for contact forms
- **Hosting**: Static file serving (presence of index.php suggests PHP-capable server)

## Architecture

The site uses a simple directory structure with service-specific subdirectories:

```
/
├── index.html     # Main landing page (active)
├── anandi.css     # Global stylesheet
├── ayurveda/      # Ayurveda cooking section
├── hairspa/       # Hair spa services section
└── img/           # Shared image assets
```

## CSS Architecture

The `anandi.css` file contains:
- CSS custom properties for colors and spacing
- Mobile-first responsive design using CSS Grid and Flexbox
- Scroll-driven animations with performance checks
- View Transitions API for smooth page transitions
- Intersection Observer animations

## Key Implementation Details

1. **Navigation**: Uses View Transitions API with fallback for unsupported browsers
2. **Forms**: All forms submit to Formcarry (https://formcarry.com/s/[form-id])
3. **Responsive Design**: Breakpoints at 768px and 1024px
4. **Performance**: Animations disabled on `prefers-reduced-motion`

## Important Notes

- No build process or dependencies - edit files directly
- Test responsive design across mobile/tablet/desktop
- Verify form submissions work with Formcarry integration
- Maintain consistent styling patterns from existing CSS