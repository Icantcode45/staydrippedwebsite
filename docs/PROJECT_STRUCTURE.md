# Stay Dripped Mobile IV - Project Structure

## Overview

This project has been reorganized for optimal development workflow, maintainability, and scalability.

## Directory Structure

```
stay-dripped-mobile-iv/
├── src/                           # Source files
│   ├── js/                        # JavaScript modules
│   │   ├── index.js               # Main JS entry point
│   │   ├── components/            # UI components
│   │   │   ├── mobile-menu.js
│   │   │   ├── smooth-scroll.js
│   │   │   └── back-to-top.js
│   │   ├── modules/               # Application modules
│   │   │   └── app.js
│   │   └── utils/                 # Utility functions
│   │       ├── theme-manager.js
│   │       ├── lazy-loading.js
│   │       └── analytics.js
│   ├── scss/                      # SCSS stylesheets
│   │   ├── main.scss              # Main SCSS entry point
│   │   ├── base/                  # Base styles
│   │   │   ├── _variables.scss
│   │   │   ├── _reset.scss
│   │   │   └── _typography.scss
│   │   ├── layouts/               # Layout components
│   │   │   ├── _container.scss
│   │   │   ├── _grid.scss
│   │   │   └── _flexbox.scss
│   │   ├── components/            # UI components
│   │   │   ├── _buttons.scss
│   │   │   ├── _cards.scss
│   │   │   ├── _header.scss
│   │   │   ├── _hero.scss
│   │   │   ├── _navigation.scss
│   │   │   ├── _forms.scss
│   │   │   └── _animations.scss
│   │   └── utilities/             # Utility classes
│   │       ├── _spacing.scss
│   │       ├── _display.scss
│   │       ├── _responsive.scss
│   │       └── _accessibility.scss
│   └── assets/                    # Static assets
│       ├── images/                # Image files
│       │   ├── logo.png
│       │   ├── placeholder.png
│       │   └── junior.png
│       └── fonts/                 # Font files (if any)
├── public/                        # Public HTML files
│   ├── index.html                 # Main homepage
│   └── pages/                     # Additional pages
│       ├── booking.html
│       ├── services.html
│       └── testimonials.html
├── components/                    # Reusable HTML components
│   ├── header.html
│   ├── footer.html
│   └── hero.html
├── dist/                          # Built files (generated)
├── docs/                          # Documentation
├── node_modules/                  # Dependencies
├── webpack.config.js              # Webpack configuration
├── package.json                   # Project dependencies
└── README.md                      # Project readme
```

## File Organization Principles

### 1. **Separation of Concerns**

- **src/js/**: All JavaScript is organized by function (components, modules, utils)
- **src/scss/**: SCSS files follow the 7-1 pattern (base, components, layouts, utilities)
- **src/assets/**: Static assets like images and fonts
- **public/**: HTML files served to users

### 2. **Modular Architecture**

- Each component is self-contained
- Utilities are reusable across components
- Clear import/export structure

### 3. **Scalable Structure**

- Easy to add new components
- Clear naming conventions
- Logical grouping of related files

## Build Process

### Entry Points

- **JavaScript**: `src/js/index.js`
- **Styles**: `src/scss/main.scss`
- **HTML**: `public/index.html`

### Output

- **Built files**: `dist/` directory
- **Assets**: Processed and optimized in `dist/assets/`

## Development Workflow

### 1. **Starting Development**

```bash
npm install
npm run dev
```

### 2. **Building for Production**

```bash
npm run build
```

### 3. **Adding New Components**

#### JavaScript Component:

1. Create file in `src/js/components/`
2. Import in `src/js/index.js`
3. Follow existing patterns

#### SCSS Component:

1. Create file in `src/scss/components/`
2. Import in `src/scss/main.scss`
3. Use BEM methodology

### 4. **File Naming Conventions**

#### JavaScript:

- kebab-case for files: `mobile-menu.js`
- PascalCase for classes: `MobileMenu`
- camelCase for variables: `mobileMenuToggle`

#### SCSS:

- Partials start with underscore: `_buttons.scss`
- BEM methodology: `.btn`, `.btn--primary`, `.btn__icon`
- CSS custom properties: `--color-primary`

## Asset Management

### Images

- Original images: `src/assets/images/`
- Optimized output: `dist/assets/images/`
- Formats: PNG, JPG, SVG, WebP

### Styles

- SCSS variables: `src/scss/base/_variables.scss`
- Component styles: `src/scss/components/`
- Utility classes: `src/scss/utilities/`

## Performance Optimization

### 1. **Code Splitting**

- Main bundle: Core application
- Component bundles: Individual features
- Vendor bundle: Third-party libraries

### 2. **Asset Optimization**

- Image compression and WebP conversion
- CSS purging and minification
- JavaScript compression

### 3. **Progressive Loading**

- Lazy loading for images
- Component-based loading
- Service worker for caching

## Maintenance Guidelines

### 1. **Adding New Features**

- Create component in appropriate directory
- Add corresponding styles
- Update imports in entry files
- Test across breakpoints

### 2. **Updating Styles**

- Modify variables for global changes
- Component-specific changes in component files
- Use existing utility classes when possible

### 3. **Code Quality**

- Follow ESLint configuration
- Use consistent naming conventions
- Write semantic HTML
- Ensure accessibility compliance

## Browser Support

- Modern browsers (ES6+)
- Progressive enhancement for older browsers
- Responsive design for all device types
- Accessibility compliance (WCAG 2.1)

## Deployment

The built application in `dist/` can be deployed to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
