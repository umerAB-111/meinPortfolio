# Expert Portfolio - Technical Specification

## 1. Concept & Vision

A futuristic, tech-forward expert portfolio that immerses visitors in an interactive 3D environment. The experience feels like stepping into a digital command center—sleek, sophisticated, and alive with subtle motion. Navigation through sections triggers smooth scroll-driven animations while a persistent 3D environment creates depth and visual intrigue. The portfolio positions the owner as a cutting-edge professional who commands both technical skill and creative vision.

## 2. Design Language

### Aesthetic Direction
Cyberpunk-meets-minimalism: Dark backgrounds with neon accent glows, geometric precision, and a sense of digital depth. References: Tron Legacy UI, Apple spatial computing aesthetics, high-end SaaS dashboards.

### Color Palette
```
--color-bg-primary: #0a0a0f        /* Deep space black */
--color-bg-secondary: #12121a      /* Elevated surfaces */
--color-bg-tertiary: #1a1a24       /* Cards, modals */
--color-text-primary: #ffffff      /* Primary text */
--color-text-secondary: #8888aa    /* Secondary text */
--color-accent-cyan: #00d4ff       /* Primary accent */
--color-accent-purple: #8b5cf6     /* Secondary accent */
--color-accent-pink: #ec4899       /* Tertiary accent */
--color-glow-cyan: rgba(0, 212, 255, 0.4)
--color-glow-purple: rgba(139, 92, 246, 0.3)
```

### Typography
- **Headings**: Space Grotesk (bold, geometric, futuristic)
- **Body**: Inter (clean, readable, modern)
- **Code/Technical**: JetBrains Mono (for any code snippets or technical elements)
- Scale: 12/14/16/20/24/32/48/64/80px

### Spatial System
- Base unit: 8px
- Container max-width: 1400px
- Section padding: 120px vertical, responsive
- Component gaps: 16/24/32/48px
- Border radius: 4px (sharp), 8px (default), 16px (cards), 9999px (pills)

### Motion Philosophy
- **Scroll-driven reveals**: Elements fade/slide into view with stagger (50ms between items)
- **3D parallax**: Background environment responds to scroll position
- **Hover states**: Subtle scale (1.02-1.05), glow intensification
- **Page transitions**: Fade with slight Y-translation (300ms ease-out)
- **Micro-interactions**: Button presses, navigation highlights
- Easing: cubic-bezier(0.16, 1, 0.3, 1) for most animations

### Visual Assets
- **3D Environment**: Three.js scene with floating geometric shapes, particle systems, wireframe elements
- **Icons**: Lucide React (consistent, clean line icons)
- **Decorative**: Gradient orbs, grid patterns, noise textures, scan lines

## 3. Layout & Structure

### Page Architecture
Single-page application with smooth scroll navigation:

1. **Hero Section** (100vh)
   - Full-screen 3D environment canvas
   - Animated name/title overlay
   - Scroll indicator

2. **About Section**
   - Brief bio with animated text reveal
   - Stats/numbers (years experience, projects, etc.)
   - 3D element floating alongside

3. **Skills Section**
   - Categorized skill cards with progress indicators
   - Tech stack icons in 3D arrangement
   - Interactive hover reveals

4. **Projects Section**
   - Grid of featured projects
   - Cards with 3D tilt on hover
   - Modal/detail overlays
   - Category filters

5. **Experience Section**
   - Timeline layout
   - Company logos (or styled placeholders)
   - Expandable details

6. **Contact Section**
   - Contact form with validation
   - Social links with hover animations
   - 3D decorative element

### Navigation
- Fixed header with glass morphism effect
- Smooth scroll to sections
- Active section indicator
- Mobile: hamburger menu with slide-in drawer

### Responsive Strategy
- Desktop: Full 3D experience, multi-column layouts
- Tablet: Simplified 3D, 2-column grids
- Mobile: Static fallback for 3D (or reduced), single column, touch-optimized

## 4. Features & Interactions

### Core Features
1. **Interactive 3D Environment**
   - Floating geometric shapes (cubes, spheres, torus)
   - Particle system with subtle movement
   - Mouse-responsive parallax (subtle rotation/position)
   - Scroll-linked depth movement
   - Wireframe rendering for some elements

2. **Scroll Animations**
   - Intersection Observer-based reveals
   - Staggered text/element animations
   - Progress indicators per section
   - Smooth scroll behavior

3. **Project Showcase**
   - Filterable grid by category
   - Card hover: 3D tilt effect, image zoom
   - Click: Expand to detail modal/page
   - Tech stack tags per project

4. **Skills Visualization**
   - Animated progress bars
   - Category organization
   - Interactive skill cards with icons

5. **Contact Form**
   - Field validation (email format, required)
   - Loading states
   - Success/error feedback
   - Integration-ready (formspree/emailjs)

6. **Theme Toggle**
   - Dark mode default (matches aesthetic)
   - Optional light mode toggle
   - Persisted preference in Redux

### Interaction Details
- **Button hover**: Scale 1.02, glow shadow
- **Card hover**: Y-translate -4px, shadow increase, 3D tilt
- **Link hover**: Underline animation, color shift
- **Form focus**: Border glow, label float animation
- **Scroll reveal**: Opacity 0→1, Y 40px→0, 600ms ease-out

### Edge Cases
- **Loading**: Skeleton screens for content
- **Error**: Toast notifications with retry option
- **Empty projects**: "No projects yet" state
- **Mobile 3D**: Graceful degradation with static background

## 5. Component Inventory

### Navigation
- `Navbar`: Fixed, glass bg, logo, nav links, mobile menu button
- `NavLink`: Active state indicator, hover animation
- `MobileMenu`: Slide-in drawer, close on link click

### Layout
- `Section`: Wrapper with id, padding, reveal animation
- `Container`: Max-width wrapper, responsive padding
- `PageTransition`: Wraps route content for animations

### Hero
- `HeroCanvas`: Three.js canvas, 3D environment
- `HeroContent`: Name, title, CTA buttons
- `ScrollIndicator`: Animated chevron pointing down

### Cards
- `ProjectCard`: Image, title, description, tags, hover effects
- `SkillCard`: Icon, title, progress bar
- `ExperienceCard`: Company, role, date, expandable content

### Forms
- `Input`: Label, input field, validation, error message
- `Textarea`: Multi-line input
- `Button`: Primary/secondary variants, loading state
- `ContactForm`: All inputs combined with submit handler

### Feedback
- `Toast`: Success/error notifications
- `LoadingSpinner`: Animated loading indicator
- `Skeleton`: Content loading placeholder

### Decorative
- `GradientOrb`: Blurred gradient circles
- `GridPattern`: SVG grid background
- `NoiseOverlay`: Grain texture overlay

## 6. Technical Approach

### Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 6
- **State**: Redux Toolkit
- **3D**: Three.js + React Three Fiber + React Three Drei
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build**: Vite

### Project Structure
```
src/
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── sections/
│   ├── cards/
│   ├── forms/
│   ├── ui/
│   └── three/
├── store/
│   ├── slices/
│   └── store.js
├── pages/
├── hooks/
├── utils/
├── styles/
├── assets/
└── App.jsx
```

### Redux Store Structure
```javascript
{
  ui: {
    theme: 'dark',
    mobileMenuOpen: false,
    activeSection: 'hero'
  },
  projects: {
    items: [],
    filter: 'all',
    selected: null
  },
  contact: {
    status: 'idle',
    error: null
  }
}
```

### Key Dependencies
```json
{
  "three": "^0.160.0",
  "@react-three/fiber": "^8.15.0",
  "@react-three/drei": "^9.92.0",
  "framer-motion": "^10.18.0",
  "@reduxjs/toolkit": "^2.0.0",
  "react-redux": "^9.0.0",
  "react-router-dom": "^6.21.0",
  "lucide-react": "^0.303.0",
  "tailwindcss": "^3.4.0",
  " autoprefixer": "^10.4.0",
  "postcss": "^8.4.0"
}
```

### Performance Considerations
- Lazy load Three.js canvas
- Use `React.memo` for heavy components
- Implement virtualization if project list grows large
- Optimize 3D with instancing and level-of-detail
- Image lazy loading with blur placeholders