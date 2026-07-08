---
name: Cinematic Gallery System
colors:
  surface: "#f9f9f9"
  surface-dim: "#dadada"
  surface-bright: "#f9f9f9"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f3f3f3"
  surface-container: "#eeeeee"
  surface-container-high: "#e8e8e8"
  surface-container-highest: "#e2e2e2"
  on-surface: "#1b1b1b"
  on-surface-variant: "#4c4546"
  inverse-surface: "#303030"
  inverse-on-surface: "#f1f1f1"
  outline: "#7e7576"
  outline-variant: "#cfc4c5"
  surface-tint: "#5e5e5e"
  primary: "#000000"
  on-primary: "#ffffff"
  primary-container: "#1b1b1b"
  on-primary-container: "#848484"
  inverse-primary: "#c6c6c6"
  secondary: "#5f5e5e"
  on-secondary: "#ffffff"
  secondary-container: "#e4e2e1"
  on-secondary-container: "#656464"
  tertiary: "#000000"
  on-tertiary: "#ffffff"
  tertiary-container: "#1b1b1b"
  on-tertiary-container: "#848484"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#e2e2e2"
  primary-fixed-dim: "#c6c6c6"
  on-primary-fixed: "#1b1b1b"
  on-primary-fixed-variant: "#474747"
  secondary-fixed: "#e4e2e1"
  secondary-fixed-dim: "#c8c6c6"
  on-secondary-fixed: "#1b1c1c"
  on-secondary-fixed-variant: "#474747"
  tertiary-fixed: "#e2e2e2"
  tertiary-fixed-dim: "#c6c6c6"
  on-tertiary-fixed: "#1b1b1b"
  on-tertiary-fixed-variant: "#474747"
  background: "#f9f9f9"
  on-background: "#1b1b1b"
  surface-variant: "#e2e2e2"
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: "700"
    lineHeight: "1.1"
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: "600"
    lineHeight: "1.2"
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: "600"
    lineHeight: "1.3"
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: "400"
    lineHeight: "1.6"
    letterSpacing: 0.01em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.6"
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: "600"
    lineHeight: "1"
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: "500"
    lineHeight: "1"
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: "600"
    lineHeight: "1.2"
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 80px
  container-max: 1440px
  gutter: 24px
---

## Brand & Style

The design system is engineered for a premium casting environment, prioritizing visual clarity and high-fidelity presentation. The aesthetic is rooted in **Minimalism** with a **Gallery-like** sensibility, ensuring that talent profiles and cinematic content remain the focal point.

The brand personality is professional, authoritative, and sophisticated. It avoids decorative trends in favor of architectural precision, utilizing thin lines, generous whitespace, and a high-contrast monochromatic foundation to evoke the feeling of a high-end fashion editorial or a modern film production office.

## Colors

The palette is strictly curated to eliminate visual noise.

- **Primary (Pure Black):** Reserved for primary actions, critical text, and structural headers. It represents the "Action" state of a film set.
- **Secondary (Charcoal):** Used for secondary interactions, icons, and supporting information to provide a subtle hierarchy.
- **Surface (Off-White):** A light grey/off-white used for container backgrounds and section dividers to distinguish between different content blocks without the weight of shadows.
- **Base (Pure White):** The canvas. Used for the primary page background to maximize the perceived brightness and "premium" feel.
- **Border:** A very thin, light grey used for the "High-fidelity" wireframe look.

## Typography

The typography utilizes **Hanken Grotesk** for its sharp, contemporary geometry.

- **Display & Headlines:** Use tight tracking on larger sizes but shift to generous letter spacing for subtitles and labels to create an "architectural" look.
- **Labels:** Always utilize increased letter-spacing and, where appropriate, uppercase styling to denote metadata (e.g., Eye Color, Height, Experience).
- **Hierarchy:** Contrast is achieved through weight and spacing rather than color variations.

## Layout & Spacing

The layout follows a **Fixed Grid** system for desktop to maintain the "Portfolio" feel, shifting to a fluid model for smaller devices.

- **Grid:** A 12-column grid with 24px gutters. Elements should align strictly to these grid lines to maintain the "precise" look.
- **Rhythm:** An 8px linear scale is used for internal component spacing, while 40px and 80px increments (XL/XXL) are used to separate major sections, ensuring a high-end "breatheable" experience.
- **Mobile:** Margins reduce to 16px, and multi-column grids collapse into a single-column stack, prioritizing full-width imagery.

## Elevation & Depth

In this design system, depth is communicated through **Low-contrast outlines** and **Tonal layering** rather than traditional shadows.

- **Borders:** Use 1px solid `#E5E5E5` for containers. Avoid any blur or drop-shadows to keep the interface feeling "flat" and "printed."
- **Layering:** Elements "lift" by moving from a White (#FFFFFF) background to an Off-White (#F9F9F9) container.
- **Interactive States:** On hover, a container might transition from a light grey border to a 1px Black border.

## Shapes

To maintain the professional and serious tone, the design system utilizes **Soft (0.25rem)** roundedness only where necessary for modern feel.

- **Buttons and Inputs:** Should remain nearly sharp or use the base 4px (0.25rem) radius.
- **Media/Photography:** Can be kept at 0px (sharp) to reinforce the gallery/cinematic aesthetic, allowing the photography to feel like a film frame.
- **Strictly avoid:** Pill shapes, circles (except for profile avatars), or heavy rounding.

## Components

- **Buttons:** Primary buttons are Solid Black with White text, using `label-lg` typography. Secondary buttons are Ghost-style with a 1px Black border. No rounded corners beyond 4px.
- **Cards (Talent Profiles):** Use a sharp edge or 4px radius. Content is separated by a 1px horizontal line. Use `label-lg` for categories.
- **Input Fields:** 1px `#E5E5E5` border that turns Black on focus. Labels sit above the field in `label-sm` uppercase.
- **Chips/Status:** Rectangular with a 1px border. Backgrounds are strictly transparent or Off-White.
- **Lists:** Clean rows separated by 1px light grey lines. High whitespace between text elements.
- **Additional Components:**
  - **The Strip:** A specialized navigation component for scrubbing through "Headshots" or "Showreels."
  - **The Metadata Block:** A layout pattern for talent stats (Height, Weight, Hair) using high-tracking labels and bold values.
