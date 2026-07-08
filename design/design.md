---
name: Cinematic Casting Authority
colors:
  surface: "#131313"
  surface-dim: "#131313"
  surface-bright: "#3a3939"
  surface-container-lowest: "#0e0e0e"
  surface-container-low: "#1c1b1b"
  surface-container: "#201f1f"
  surface-container-high: "#2a2a2a"
  surface-container-highest: "#353534"
  on-surface: "#e5e2e1"
  on-surface-variant: "#e9bcb6"
  inverse-surface: "#e5e2e1"
  inverse-on-surface: "#313030"
  outline: "#af8782"
  outline-variant: "#5e3f3b"
  surface-tint: "#ffb4aa"
  primary: "#ffb4aa"
  on-primary: "#690003"
  primary-container: "#e50914"
  on-primary-container: "#fff7f6"
  inverse-primary: "#c0000c"
  secondary: "#c8c6c5"
  on-secondary: "#313030"
  secondary-container: "#474746"
  on-secondary-container: "#b7b5b4"
  tertiary: "#c8c6c6"
  on-tertiary: "#303030"
  tertiary-container: "#737272"
  on-tertiary-container: "#fbf8f8"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#ffdad5"
  primary-fixed-dim: "#ffb4aa"
  on-primary-fixed: "#410001"
  on-primary-fixed-variant: "#930007"
  secondary-fixed: "#e5e2e1"
  secondary-fixed-dim: "#c8c6c5"
  on-secondary-fixed: "#1c1b1b"
  on-secondary-fixed-variant: "#474746"
  tertiary-fixed: "#e4e2e1"
  tertiary-fixed-dim: "#c8c6c6"
  on-tertiary-fixed: "#1b1c1c"
  on-tertiary-fixed-variant: "#474747"
  background: "#131313"
  on-background: "#e5e2e1"
  surface-variant: "#353534"
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: "800"
    lineHeight: "1.1"
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: "700"
    lineHeight: "1.2"
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: "600"
    lineHeight: "1.3"
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: "400"
    lineHeight: "1.6"
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.5"
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: "500"
    lineHeight: "1"
    letterSpacing: 0.05em
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
  xl: 48px
  container-max: 1440px
  gutter: 24px
---

## Brand & Style

This design system is engineered for the high-stakes world of professional film and television casting. The brand personality is **authoritative, prestigious, and cinematic**, mirroring the intensity of a darkened theater or a production studio. It serves a dual purpose: providing an ultra-efficient toolset for casting directors while presenting actors in a high-end, gallery-like environment.

The visual style is a fusion of **Minimalism** and **Modern Corporate**, utilizing a "Dark Mode First" philosophy. By stripping away non-essential UI clutter and using a monochromatic base with a single high-energy accent, the focus remains entirely on the talent's headshots and showreels. The aesthetic evokes the feeling of premium digital cinema equipment—precise, rugged, and uncompromisingly professional.

- **Atmosphere:** Immersive, focused, and elite.
- **Visual Strategy:** Deep blacks for depth, vibrant reds for action, and razor-sharp typography for clarity.

## Colors

The palette is anchored in **Deep Black (#0A0A0A)** to provide maximum contrast for actor photography and video content. The **Vibrant Red (#E50914)**—reminiscent of "Recording" lights and velvet theater curtains—is reserved strictly for primary actions, critical notifications, and active navigation states.

- **Primary (Vibrant Red):** Used for 'Hire', 'Cast', 'Search', and primary CTA buttons.
- **Surface Tiers:**
  - `Level 0`: Background (#0A0A0A)
  - `Level 1`: Sidebars and Navigation (#121212)
  - `Level 2`: Cards and Input fields (#1A1A1A)
  - `Level 3`: Hover states and popovers (#2F2F2F)
- **Neutral Accents:** Greyscale tones are used to establish hierarchy in metadata (age, height, agency) without competing with the red primary accent.

## Typography

Typography centers on **Hanken Grotesk**, a typeface that balances Swiss-style neutrality with a contemporary, sharp edge. It provides the legibility required for dense actor lists while maintaining a "tech-forward" appearance.

- **Display & Headlines:** Use heavy weights (700-800) with tight letter spacing to create a commanding presence on dashboard titles and actor names.
- **Labels & Metadata:** **JetBrains Mono** is introduced for technical data (e.g., timestamps, physical measurements, ID numbers). This monospaced font reinforces the "management tool" aspect of the platform, making data easy to scan in columns.
- **Mobile Scale:** On mobile devices, `display-lg` should scale down to `headline-lg` to prevent text wrapping issues.

## Layout & Spacing

The layout follows a **structured 12-column fluid grid** for desktop, optimized for media-heavy content.

- **Dashboard:** Uses a "kanban" style vertical column layout for casting stages (Audition, Callback, Booked). Each column has a fixed width of 320px with 16px gutters to ensure horizontal scrollability on smaller laptops.
- **Actor Profiles:** Features a 60/40 split on desktop. The left side (6 columns) is dedicated to the visual showreel and gallery, while the right side (4 columns) contains the scrollable data and notes.
- **Responsiveness:**
  - **Desktop (1440px+):** Full 12-column layout with 48px side margins.
  - **Tablet (768px - 1024px):** Reflows to a single column for profiles; lists become 2-column grids.
  - **Mobile (<768px):** Navigation moves to a bottom bar; actor cards occupy 100% width.

## Elevation & Depth

In a dark theme, depth is communicated through **Tonal Layering** rather than traditional shadows. Surfaces closer to the user are lighter in color.

- **Base Layer:** #0A0A0A (The void).
- **Secondary Layer (Sidebars/Cards):** #121212 with a subtle 1px border of #2F2F2F.
- **Elevated States (Modals/Hover):** #1A1A1A.
- **Interaction:** Buttons do not use shadows. Instead, they use "glow" effects—a soft red outer glow (5px blur, 20% opacity) appears when a primary red button is hovered or active, mimicking the light of a projector.
- **Overlays:** Modals use a 60% black backdrop blur (20px) to maintain context while focusing on the form.

## Shapes

The shape language is **Soft (0.25rem)**. This provides a professional, geometric look that feels precise rather than "bubbly."

- **Standard Elements:** Buttons, input fields, and tags use a 4px corner radius.
- **Actor Thumbnails:** Maintain a strict 4px radius. Avoid circles for headshots; the rectangular frame is more reminiscent of a film frame.
- **Chips/Status Tags:** Can utilize `rounded-xl` (12px) to differentiate them as interactive labels compared to the structural containers.

## Components

### Buttons

- **Primary:** Solid Red (#E50914) with white text. Bold weight.
- **Secondary:** Transparent with a 1px white border.
- **Tertiary:** Ghost style, grey text, turning white on hover.

### Actor Cards

- High-aspect ratio image (4:5).
- Bottom-aligned gradient overlay (Black to Transparent) to house the actor's name and age in white text for legibility over any photo.

### Input Fields

- Background #1A1A1A. Border #2F2F2F.
- Focus state: Border changes to #E50914 with no "glow" to keep the UI sharp.

### Filters & Chips

- Filter bars should be sticky at the top of lists.
- Active filters use a Red background; inactive filters use a dark grey stroke.

### Casting Status Badges

- **Applied:** Grey.
- **Auditioning:** Amber.
- **Shortlisted:** Vibrant Red.
- **Cast:** Success Green.
- Use the monospaced Label-sm font for these badges to imply a "dossier" or "file" status.
