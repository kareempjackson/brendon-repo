# Brendon Test Design Language

> A complete design system for an entrepreneur networking platform — built for busy founders who value clarity, trust, and efficiency.

---

## Identity

**Personality:** Professional • Trustworthy • Efficient

**Philosophy:** Every pixel earns its place. We respect founders' time with interfaces that communicate clearly, load instantly, and never require a second glance to understand.

**Voice:** Direct and confident without being cold. We speak as a peer — knowledgeable but approachable. Headlines are punchy; body copy is scannable. No jargon, no fluff.

---

## Colors

### Brand Palette

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Primary | `#2563EB` | `--color-brand-primary` | CTAs, links, primary actions |
| Primary Hover | `#1D4ED8` | `--color-brand-primary-hover` | Hover state for primary elements |
| Primary Active | `#1E40AF` | `--color-brand-primary-active` | Active/pressed state |
| Secondary | `#0EA5E9` | `--color-brand-secondary` | Secondary actions, info states |
| Secondary Hover | `#0284C7` | `--color-brand-secondary-hover` | Hover for secondary elements |
| Accent | `#10B981` | `--color-brand-accent` | Success, completion, positive |
| Accent Hover | `#059669` | `--color-brand-accent-hover` | Hover for accent elements |
| Warning | `#F59E0B` | `--color-brand-warning` | Warnings, caution states |
| Error | `#EF4444` | `--color-brand-error` | Errors, destructive actions |
| Error Hover | `#DC2626` | `--color-brand-error-hover` | Hover for error elements |

### Neutral Scale

| Shade | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| 950 | `#0A0A0B` | `--color-neutral-950` | Base background (dark mode) |
| 900 | `#121214` | `--color-neutral-900` | Elevated surfaces |
| 800 | `#1E1E21` | `--color-neutral-800` | Cards, panels |
| 700 | `#2E2E33` | `--color-neutral-700` | Borders, dividers |
| 600 | `#3F3F46` | `--color-neutral-600` | Strong borders |
| 500 | `#52525B` | `--color-neutral-500` | Muted text |
| 400 | `#71717A` | `--color-neutral-400` | Tertiary text |
| 300 | `#A1A1AA` | `--color-neutral-300` | Secondary text |
| 200 | `#D4D4D8` | `--color-neutral-200` | Light borders |
| 100 | `#E4E4E7` | `--color-neutral-100` | Light backgrounds |
| 50 | `#FAFAFA` | `--color-neutral-50` | Primary text (dark mode) |

### Semantic Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `bg-base` | Neutral 50 | Neutral 950 | Page background |
| `bg-elevated` | White | Neutral 900 | Cards, modals |
| `bg-surface` | Neutral 100 | Neutral 800 | Input fields, wells |
| `bg-hover` | Neutral 200 | Neutral 700 | Interactive hover |
| `text-primary` | Neutral 950 | Neutral 50 | Headings, body |
| `text-secondary` | Neutral 600 | Neutral 300 | Supporting text |
| `text-tertiary` | Neutral 500 | Neutral 400 | Timestamps, metadata |
| `text-muted` | Neutral 400 | Neutral 500 | Placeholders |

---

## Typography

**Primary Font:** Inter — clean, professional, optimized for screens  
**Monospace Font:** JetBrains Mono — code blocks, data, technical content

### Type Scale

| Style | Size | Line Height | Letter Spacing | Weight | Usage |
|-------|------|-------------|----------------|--------|-------|
| Display XL | 3.5rem (56px) | 1.1 | -0.025em | 700 | Hero headlines |
| Display LG | 3rem (48px) | 1.15 | -0.02em | 700 | Page titles |
| Display MD | 2.25rem (36px) | 1.2 | -0.015em | 600 | Section headers |
| Heading LG | 1.875rem (30px) | 1.25 | -0.01em | 600 | Card titles (large) |
| Heading MD | 1.5rem (24px) | 1.3 | -0.01em | 600 | Card titles |
| Heading SM | 1.25rem (20px) | 1.4 | -0.005em | 600 | Subsections |
| Body LG | 1.125rem (18px) | 1.6 | 0 | 400 | Lead paragraphs |
| Body MD | 1rem (16px) | 1.6 | 0 | 400 | Default body text |
| Body SM | 0.875rem (14px) | 1.5 | 0 | 400 | Secondary text |
| Label | 0.875rem (14px) | 1.4 | 0.01em | 500 | Form labels, buttons |
| Caption | 0.75rem (12px) | 1.4 | 0.02em | 400 | Timestamps, hints |

---

## Spacing

**Base Unit:** 4px — all spacing derives from this grid.

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| xs | 0.25rem | 4px | Tight gaps, icon padding |
| sm | 0.5rem | 8px | Button padding, inline gaps |
| md | 1rem | 16px | Default component padding |
| lg | 1.5rem | 24px | Card padding, section gaps |
| xl | 2rem | 32px | Large section spacing |
| 2xl | 3rem | 48px | Page sections |
| 3xl | 4rem | 64px | Major page divisions |
| 4xl | 6rem | 96px | Hero spacing |
| 5xl | 8rem | 128px | Maximum breathing room |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| sm | 4px | Subtle rounding (badges, tags) |
| md | 8px | Default (buttons, inputs) |
| lg | 12px | Cards, panels |
| xl | 16px | Modals, large containers |
| full | 9999px | Pills, avatars, circular elements |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| sm | `0 1px 2px rgba(0,0,0,0.4)` | Subtle depth (buttons) |
| md | `0 4px 6px -1px rgba(0,0,0,0.4)` | Cards, dropdowns |
| lg | `0 10px 15px -3px rgba(0,0,0,0.4)` | Modals, popovers |
| xl | `0 20px 25px -5px rgba(0,0,0,0.4)` | Large dialogs |
| glow | `0 0 20px rgba(37,99,235,0.3)` | Focus states, highlights |

---

## Motion

### Duration

| Token | Value | Usage |
|-------|-------|-------|
| fast | 150ms | Micro-interactions (hover, focus) |
| normal | 250ms | Component transitions |
| slow | 400ms | Page transitions, modals |
| slower | 600ms | Complex animations |

### Easing

| Token | Curve | Usage |
|-------|-------|-------|
| ease-out | `cubic-bezier(0.16, 1, 0.3, 1)` | Elements entering |
| ease-in-out | `cubic-bezier(0.65, 0, 0.35, 1)` | Morphing, resizing |
| spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful bounces |

### Animations

- **fade-in** — Opacity 0→1, normal duration
- **fade-up** — Fade + 8px upward, normal duration
- **scale-in** — Scale 0.95→1 + fade, fast duration
- **slide-down** — Slide from -8px + fade, normal duration
- **shimmer** — Loading skeleton effect
- **pulse** — Gentle opacity pulse for loading states

---

## Breakpoints

| Name | Width | Typical Devices |
|------|-------|------------------|
| mobile | 375px | Phones |
| tablet | 768px | Tablets, small laptops |
| desktop | 1024px | Laptops, small monitors |
| wide | 1280px | Large monitors |

---

## Design Principles

### 1. Dark by Default
The interface defaults to dark mode — easier on the eyes during long working sessions and signals a premium, modern tool. Light mode is available but secondary.

### 2. Purposeful Motion
Every animation serves a function: guiding attention, confirming actions, or smoothing transitions. We never animate for decoration. 150ms for hovers, 250ms for components, 400ms for pages.

### 3. Trust Through Clarity
Busy founders scan — they don't read. Visual hierarchy is aggressive: one clear CTA per view, generous whitespace, and content organized in digestible chunks. No ambiguity.

### 4. Density When Needed
While we value whitespace, information-dense views (feeds, tables, settings) use compact spacing. The interface adapts to context — spacious for marketing, dense for productivity.

---

## Z-Index Scale

| Layer | Value | Usage |
|-------|-------|-------|
| dropdown | 100 | Dropdown menus |
| sticky | 200 | Sticky headers |
| modal | 300 | Modal overlays |
| popover | 400 | Tooltips, popovers |
| toast | 500 | Notifications |

---

## Usage Examples

### Button (Primary)
```css
.btn-primary {
  background: var(--color-brand-primary);
  color: var(--color-text-inverse);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-label);
  font-weight: var(--font-weight-label);
  transition: background var(--duration-fast) var(--ease-out);
}
.btn-primary:hover {
  background: var(--color-brand-primary-hover);
}
```

### Card Component
```css
.card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
}
```

### Input Field
```css
.input {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text-primary);
  transition: border-color var(--duration-fast) var(--ease-out);
}
.input:focus {
  border-color: var(--color-brand-primary);
  box-shadow: var(--shadow-glow);
}
```