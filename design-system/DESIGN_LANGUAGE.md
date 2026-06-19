# Brendon Test Design Language

> A design system for busy founders building meaningful connections. Every pixel earns its place.

---

## Identity

**Personality:** Professional, Trustworthy, Efficient

**Philosophy:** We respect founders' time. Interfaces communicate clearly, load instantly, and never require a second glance to understand. Complexity is hidden; outcomes are visible.

**Voice:** Direct and confident without being cold. We speak as a peer — knowledgeable but approachable. Headlines are punchy; body copy is scannable. No jargon, no fluff.

---

## Design Principles

### 1. Clarity Over Cleverness
Every element serves a purpose. We favor explicit labels over icons alone, clear hierarchy over visual noise, and conventional patterns over novel experiments. When in doubt, remove.

### 2. Dark by Default
Dark interfaces reduce eye strain during long working sessions and signal professionalism. Our dark palette uses rich, warm grays that feel sophisticated — not cold or clinical.

### 3. Purposeful Motion
Animation exists to provide feedback and maintain spatial context, never for decoration. Micro-interactions are fast (150ms); transitions are smooth (250ms). Nothing bounces unless it's playful.

### 4. Density with Breathing Room
Founders scan quickly. We pack information efficiently while maintaining generous whitespace around interactive elements. Dense where it matters; spacious where it counts.

---

## Colors

### Brand Palette

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Primary | `#2563EB` | `--color-brand-primary` | CTAs, links, primary actions, focus states |
| Primary Hover | `#1D4ED8` | `--color-brand-primary-hover` | Hover state for primary elements |
| Primary Active | `#1E40AF` | `--color-brand-primary-active` | Pressed/active state |
| Primary Subtle | `#DBEAFE` | `--color-brand-primary-subtle` | Badges, tags, subtle highlights |
| Secondary | `#0F172A` | `--color-brand-secondary` | Dark accents, footer backgrounds |
| Accent | `#10B981` | `--color-brand-accent` | Success states, positive indicators |
| Warning | `#F59E0B` | `--color-brand-warning` | Warnings, attention needed |
| Error | `#EF4444` | `--color-brand-error` | Errors, destructive actions |

### Neutral Scale

| Shade | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| Gray 950 | `#0A0A0B` | `--color-gray-950` | Primary background (dark mode) |
| Gray 900 | `#131316` | `--color-gray-900` | Secondary background, cards |
| Gray 800 | `#1E1E24` | `--color-gray-800` | Elevated surfaces, inputs |
| Gray 700 | `#2A2A33` | `--color-gray-700` | Borders, dividers |
| Gray 600 | `#3F3F4A` | `--color-gray-600` | Disabled elements |
| Gray 500 | `#5C5C6B` | `--color-gray-500` | Placeholder text |
| Gray 400 | `#8B8B9A` | `--color-gray-400` | Secondary text |
| Gray 300 | `#B4B4C0` | `--color-gray-300` | Tertiary text |
| Gray 200 | `#D4D4DC` | `--color-gray-200` | Light borders (light mode) |
| Gray 100 | `#EBEBEF` | `--color-gray-100` | Subtle backgrounds (light mode) |
| Gray 50 | `#F8F8FA` | `--color-gray-50` | Primary text (dark mode), bg (light mode) |

---

## Typography

**Primary Font:** Inter — Optimized for screens, excellent legibility at all sizes  
**Monospace Font:** JetBrains Mono — Code snippets, technical data, timestamps

| Style | Size (rem) | Line Height | Letter Spacing | Weight | Usage |
|-------|------------|-------------|----------------|--------|-------|
| Display XL | 3.5rem (56px) | 1.1 | -0.025em | 700 | Hero headlines, landing pages |
| Display LG | 3rem (48px) | 1.15 | -0.02em | 700 | Page titles |
| Display MD | 2.25rem (36px) | 1.2 | -0.02em | 600 | Section headers |
| Heading LG | 1.5rem (24px) | 1.3 | -0.015em | 600 | Card titles, modal headers |
| Heading MD | 1.25rem (20px) | 1.4 | -0.01em | 600 | Subsection headers |
| Heading SM | 1rem (16px) | 1.5 | 0 | 600 | List headers, sidebar titles |
| Body LG | 1.125rem (18px) | 1.6 | 0 | 400 | Featured paragraphs |
| Body MD | 0.9375rem (15px) | 1.6 | 0 | 400 | Default body text |
| Body SM | 0.875rem (14px) | 1.5 | 0 | 400 | Secondary text, descriptions |
| Label | 0.875rem (14px) | 1.4 | 0.01em | 500 | Form labels, buttons |
| Caption | 0.75rem (12px) | 1.4 | 0.02em | 400 | Timestamps, meta info |

---

## Spacing

**Base Unit:** 4px  
**Approach:** All spacing values are multiples of 4px for pixel-perfect alignment.

| Token | Value | CSS Variable | Common Use |
|-------|-------|--------------|------------|
| xs | 4px | `--spacing-xs` | Icon padding, tight gaps |
| sm | 8px | `--spacing-sm` | Inline element gaps, small padding |
| md | 16px | `--spacing-md` | Default padding, card internal spacing |
| lg | 24px | `--spacing-lg` | Section padding, card gaps |
| xl | 32px | `--spacing-xl` | Large gaps, form groups |
| 2xl | 48px | `--spacing-2xl` | Section margins |
| 3xl | 64px | `--spacing-3xl` | Page sections |
| 4xl | 96px | `--spacing-4xl` | Hero spacing |
| 5xl | 128px | `--spacing-5xl` | Maximum section gaps |

---

## Border Radius

| Token | Value | CSS Variable | Usage |
|-------|-------|--------------|-------|
| sm | 4px | `--radius-sm` | Tags, badges, small chips |
| md | 8px | `--radius-md` | Buttons, inputs, small cards |
| lg | 12px | `--radius-lg` | Cards, modals, dropdowns |
| xl | 16px | `--radius-xl` | Large cards, featured sections |
| 2xl | 24px | `--radius-2xl` | Hero cards, marketing elements |
| full | 9999px | `--radius-full` | Avatars, pills, circular buttons |

---

## Motion

### Duration

| Token | Value | CSS Variable | Usage |
|-------|-------|--------------|-------|
| instant | 50ms | `--duration-instant` | State changes (no perceptible delay) |
| fast | 150ms | `--duration-fast` | Micro-interactions, hover states, buttons |
| normal | 250ms | `--duration-normal` | Transitions, fade in/out, modals |
| slow | 400ms | `--duration-slow` | Complex animations, page transitions |
| slower | 600ms | `--duration-slower` | Staggered lists, elaborate sequences |

### Easing

| Token | Value | Usage |
|-------|-------|-------|
| ease-out | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering (fade in, slide in) |
| ease-in-out | `cubic-bezier(0.4, 0, 0.2, 1)` | Persistent animations, transitions |
| ease-in | `cubic-bezier(0.4, 0, 1, 1)` | Elements exiting (fade out) |
| spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful interactions, success states |
| bounce | `cubic-bezier(0.68, -0.6, 0.32, 1.6)` | Attention-grabbing (use sparingly) |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| xs | `0 1px 2px rgba(0,0,0,0.4)` | Subtle depth, pressed buttons |
| sm | `0 2px 4px rgba(0,0,0,0.4)` | Buttons, small elevated elements |
| md | `0 4px 8px -2px rgba(0,0,0,0.5)` | Cards, dropdowns |
| lg | `0 12px 24px -4px rgba(0,0,0,0.5)` | Modals, popovers |
| xl | `0 24px 48px -12px rgba(0,0,0,0.6)` | Full-page overlays |
| glow | `0 0 24px -4px rgba(37,99,235,0.4)` | Focus rings, emphasis |

---

## Breakpoints

| Name | Value | Usage |
|------|-------|-------|
| mobile | 375px | Base styles, single column |
| tablet | 768px | Two-column layouts, expanded nav |
| desktop | 1024px | Full layouts, sidebars visible |
| wide | 1280px | Maximum content width, extra features |

---

## Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| base | 0 | Default stacking |
| dropdown | 100 | Dropdown menus |
| sticky | 200 | Sticky headers |
| overlay | 300 | Background overlays |
| modal | 400 | Modal dialogs |
| popover | 500 | Popovers, tooltips |
| tooltip | 600 | Tooltips (above popovers) |
| toast | 700 | Toast notifications (always on top) |

---

## Component Patterns

### Buttons
- **Primary:** `bg-brand-primary`, white text, `radius-md`
- **Secondary:** `bg-gray-800`, `text-gray-50`, `border border-gray-700`
- **Ghost:** Transparent bg, `text-gray-400`, subtle hover bg
- **Destructive:** `bg-brand-error`, white text
- **Sizes:** sm (32px height), md (40px), lg (48px)

### Form Inputs
- Background: `bg-gray-800`
- Border: `border-gray-700`, focus: `border-brand-primary`
- Radius: `radius-md`
- Height: 40px (md), 48px (lg)
- Focus ring: `shadow-glow`

### Cards
- Background: `bg-gray-900`
- Border: `border-gray-800`
- Radius: `radius-lg`
- Padding: `spacing-lg`
- Hover: subtle `shadow-md`

---

## Usage Examples

```css
/* Primary Button */
.btn-primary {
  background: var(--color-brand-primary);
  color: var(--color-gray-50);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-label);
  transition: background var(--duration-fast) var(--ease-out);
}

.btn-primary:hover {
  background: var(--color-brand-primary-hover);
}

/* Card Component */
.card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  transition: box-shadow var(--duration-normal) var(--ease-out);
}

.card:hover {
  box-shadow: var(--shadow-md);
}
```

---

*Last updated: Sprint 1 — Design UI component system and layouts*