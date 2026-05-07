# Brendon Test Design Language

> A design system for an entrepreneur networking platform — built for busy founders who value clarity, trust, and efficiency.

---

## Identity

**Personality:** Professional, Trustworthy, Efficient

**Philosophy:** Every pixel earns its place. We respect founders' time with interfaces that communicate clearly, load instantly, and never require a second glance to understand.

**Voice:** Direct and confident without being cold. We speak as a peer — knowledgeable but approachable. Headlines are punchy; body copy is scannable.

---

## Colors

### Brand Palette

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Primary | `#2563EB` | `--color-brand-primary` | CTAs, links, primary actions |
| Primary Hover | `#1D4ED8` | `--color-brand-primary-hover` | Hover states for primary |
| Primary Active | `#1E40AF` | `--color-brand-primary-active` | Active/pressed states |
| Primary Subtle | `#DBEAFE` | `--color-brand-primary-subtle` | Backgrounds, badges |
| Accent | `#F59E0B` | `--color-brand-accent` | Highlights, notifications |
| Accent Hover | `#D97706` | `--color-brand-accent-hover` | Hover states for accent |
| Accent Subtle | `#FEF3C7` | `--color-brand-accent-subtle` | Accent backgrounds |

### Semantic Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Success | `#10B981` | `--color-semantic-success` | Confirmations, positive |
| Success Subtle | `#D1FAE5` | `--color-semantic-success-subtle` | Success backgrounds |
| Warning | `#F59E0B` | `--color-semantic-warning` | Caution states |
| Warning Subtle | `#FEF3C7` | `--color-semantic-warning-subtle` | Warning backgrounds |
| Error | `#EF4444` | `--color-semantic-error` | Errors, destructive |
| Error Subtle | `#FEE2E2` | `--color-semantic-error-subtle` | Error backgrounds |
| Info | `#3B82F6` | `--color-semantic-info` | Informational |
| Info Subtle | `#DBEAFE` | `--color-semantic-info-subtle` | Info backgrounds |

### Neutrals (Dark-first)

| Shade | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| 950 | `#0A0A0B` | `--color-gray-950` | Primary background |
| 900 | `#111113` | `--color-gray-900` | Secondary background |
| 800 | `#1C1C1F` | `--color-gray-800` | Elevated surfaces, cards |
| 700 | `#2E2E32` | `--color-gray-700` | Strong borders |
| 600 | `#46464D` | `--color-gray-600` | Disabled text |
| 500 | `#64646D` | `--color-gray-500` | Tertiary text |
| 400 | `#8B8B96` | `--color-gray-400` | Secondary text |
| 300 | `#B4B4BD` | `--color-gray-300` | Muted text |
| 200 | `#D4D4DB` | `--color-gray-200` | Light borders |
| 100 | `#EBEBEF` | `--color-gray-100` | Subtle backgrounds |
| 50 | `#F7F7F8` | `--color-gray-50` | Primary text on dark |

---

## Typography

**Primary Font:** Inter — clean, professional, highly legible  
**Monospace Font:** JetBrains Mono — for code, data, metrics

| Style | Size | Line Height | Letter Spacing | Weight | Family |
|-------|------|-------------|----------------|--------|--------|
| Display XL | 3.5rem (56px) | 1.1 | -0.03em | 700 | Inter |
| Display LG | 3rem (48px) | 1.15 | -0.025em | 700 | Inter |
| Display MD | 2.25rem (36px) | 1.2 | -0.02em | 600 | Inter |
| Heading LG | 1.875rem (30px) | 1.25 | -0.015em | 600 | Inter |
| Heading MD | 1.5rem (24px) | 1.3 | -0.01em | 600 | Inter |
| Heading SM | 1.25rem (20px) | 1.35 | -0.01em | 600 | Inter |
| Body LG | 1.125rem (18px) | 1.6 | 0 | 400 | Inter |
| Body MD | 1rem (16px) | 1.6 | 0 | 400 | Inter |
| Body SM | 0.875rem (14px) | 1.5 | 0 | 400 | Inter |
| Label | 0.875rem (14px) | 1.4 | 0.01em | 500 | Inter |
| Caption | 0.75rem (12px) | 1.4 | 0.01em | 400 | Inter |

---

## Spacing

**Base Unit:** 4px — all spacing derives from this grid.

| Token | Value | CSS Variable | Common Use |
|-------|-------|--------------|------------|
| xs | 4px | `--spacing-xs` | Tight gaps, icon padding |
| sm | 8px | `--spacing-sm` | Input padding, list gaps |
| md | 16px | `--spacing-md` | Card padding, section gaps |
| lg | 24px | `--spacing-lg` | Component separation |
| xl | 32px | `--spacing-xl` | Section padding |
| 2xl | 48px | `--spacing-2xl` | Large section gaps |
| 3xl | 64px | `--spacing-3xl` | Page sections |
| 4xl | 96px | `--spacing-4xl` | Hero sections |
| 5xl | 128px | `--spacing-5xl` | Maximum breathing room |

---

## Border Radius

| Token | Value | CSS Variable | Usage |
|-------|-------|--------------|-------|
| sm | 4px | `--radius-sm` | Tags, small badges |
| md | 8px | `--radius-md` | Buttons, inputs |
| lg | 12px | `--radius-lg` | Cards, dropdowns |
| xl | 16px | `--radius-xl` | Modals, large containers |
| 2xl | 24px | `--radius-2xl` | Feature cards |
| full | 9999px | `--radius-full` | Avatars, pills |

---

## Motion

### Durations

| Token | Value | CSS Variable | Use Case |
|-------|-------|--------------|----------|
| instant | 50ms | `--duration-instant` | Hover color changes |
| fast | 150ms | `--duration-fast` | Micro-interactions, toggles |
| normal | 250ms | `--duration-normal` | Most transitions |
| slow | 400ms | `--duration-slow` | Modal opens, page transitions |
| slower | 600ms | `--duration-slower` | Complex animations |

### Easing Functions

| Token | Value | CSS Variable | Character |
|-------|-------|--------------|----------|
| ease-out | `cubic-bezier(0.16, 1, 0.3, 1)` | `--ease-out` | Snappy, decisive |
| ease-in-out | `cubic-bezier(0.65, 0, 0.35, 1)` | `--ease-in-out` | Smooth, balanced |
| spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `--ease-spring` | Playful, bouncy |
| bounce | `cubic-bezier(0.68, -0.6, 0.32, 1.6)` | `--ease-bounce` | Attention-grabbing |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| sm | `0 1px 2px rgba(0,0,0,0.3)` | Subtle elevation |
| md | `0 4px 6px -1px rgba(0,0,0,0.4)` | Cards, dropdowns |
| lg | `0 10px 15px -3px rgba(0,0,0,0.5)` | Modals |
| xl | `0 20px 25px -5px rgba(0,0,0,0.5)` | Large floating elements |
| glow | `0 0 20px rgba(37,99,235,0.3)` | Focus states, highlights |

---

## Responsive Breakpoints

| Name | Width | Target |
|------|-------|--------|
| mobile | 375px | Mobile phones |
| tablet | 768px | Tablets, small laptops |
| desktop | 1024px | Laptops, desktops |
| wide | 1280px | Large monitors |

---

## Design Principles

### 1. Dark by Default
We embrace a dark-first interface that reduces eye strain during long work sessions, feels premium, and lets content shine. Light mode exists as an accessible option, not the primary experience.

### 2. Ruthless Clarity
Every element must justify its existence. If it doesn't help a founder understand or act, it goes. Dense information is presented through clear hierarchy, not visual noise.

### 3. Instant Feedback
Every interaction gets acknowledged within 100ms. Loading states appear immediately, transitions are snappy, and the UI never feels sluggish. Founders shouldn't wait.

### 4. Trust Through Consistency
Patterns repeat predictably. A button always looks like a button. A card always behaves like a card. Consistency builds the muscle memory that lets founders move fast.

---

## Component Guidelines

### Buttons
- **Primary:** Solid brand-primary background, white text, md radius
- **Secondary:** Transparent with border-strong, gray-50 text
- **Ghost:** Transparent, gray-400 text, hover reveals subtle background
- **Sizes:** sm (32px height), md (40px height), lg (48px height)

### Inputs
- Background: gray-900
- Border: gray-800, focus: brand-primary
- Height: 40px (md), 48px (lg)
- Padding: sm horizontal, xs vertical

### Cards
- Background: gray-800
- Border: gray-700 (1px)
- Radius: lg (12px)
- Padding: md (16px)
- Hover: subtle shadow-md elevation

### Navigation
- Fixed header: 64px height
- Background: gray-950 with 80% opacity + backdrop blur
- Border-bottom: gray-800

---

*Last updated: Design System v1.0*