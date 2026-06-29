# Design System & Tech Stack - arifian.dev

This document outlines the design principles, color palette, typography, animations, and the underlying technology stack of arifian.dev. Feel free to use this as a reference or inspiration for your own projects!

---

## 1. Design Philosophy: Minimalist Brutalism

The website layout is styled using **Minimalist Brutalism**, which merges clean spacing with harsh, utilitarian structures.

*   **No Rounded Corners (`rounded-none`):** To preserve a blocky, raw aesthetic, all buttons, badges, cards, inputs, and image borders use sharp `0px` border-radius.
*   **Bento Grid Layout:** Content is arranged in modular grids with varying card spans, creating a clean yet asymmetrical structure.
*   **Grayscale-to-Color Hover:** Visual assets (like the profile picture) start as fully desaturated grayscale and transition smoothly to full color upon hover.
*   **Hover Border Highlights:** Interactive components do not use heavy shadows. Instead, they highlight their boundaries using a subtle accent border upon hover.
*   **Typewriter Monospace details:** Small metadata, counts, and dates are formatted in a clean monospace font to complement the document-like layout.

---

## 2. Color Palette (Inspired by Claude.ai)

The color palette is heavily inspired by the warm, literary aesthetics of **Claude.ai** (Anthropic), prioritizing paper-like light tones and olive-tinted warm dark tones instead of typical cold digital grays.

### Core Variables

| Token Name | Hex Code | Role | Description |
| :--- | :--- | :--- | :--- |
| **Parchment** | `#f5f4ed` | `--background` (Light) | Lighter, warm cream background simulating premium paper. |
| **Ivory** | `#faf9f5` | `--card` (Light) | Slightly brighter warm tone for elevated cards on Parchment. |
| **Near Black** | `#141413` | `--foreground` (Light) / `--background` (Dark) | Primary text in light mode, primary page background in dark mode. Warm dark zaitun. |
| **Dark Surface** | `#30302e` | `--card` (Dark) | Warm charcoal tone for container surfaces in dark mode. |
| **Terracotta Brand** | `#c96442` | `--color-brand-500` | Accent color, brand moments, and primary CTA buttons. |
| **Terracotta Accent** | `#b55333` | `--color-brand-700` | Slightly darker terracotta for button default states/borders. |
| **Coral Accent** | `#d97757` | `--color-brand-400` | Accent highlights, text links, and thin underlines. |
| **Warm Sand** | `#e8e6dc` | `--secondary` (Light) | Muted interactive elements, secondary button backgrounds. |
| **Border Cream** | `#f0eee6` | `--border` (Light) | Standard light border. Subtle contrast against Ivory/Parchment. |
| **Focus Blue** | `#3898ec` | Focus rings | Purely for accessibility and focus state inputs. |

### Global Styling Settings
*   **Text Selection:** `rgba(201, 100, 66, 0.25)` (bursted terracotta highlight).
*   **Scrollbars:** Custom minimal `4px` scrollbar with a `rgba(201, 100, 66, 0.4)` terracotta thumb, transitioning to `rgba(190, 92, 50, 0.7)` on hover.

---

## 3. Typography

The system maintains a strict serif/sans typographic split to establish a book-like visual hierarchy.

*   **Headings & Titles:** `Lexend Deca` (`--font-heading`)
    *   *Usage:* Display text, hero headings, and section titles.
*   **Body Text & UI:** `Inclusive Sans` (`--font-sans`)
    *   *Usage:* Navigation, button text, body text, form fields, and metadata.

---

## 4. Animation System (Framer Motion)

Animations are used to make the interface feel alive and reactive, utilizing smooth, natural easing functions.

*   **Fade-in Duration:** `500ms - 600ms`
*   **Stagger Children Delay:** `100ms (0.1s)`
*   **Easing Function:** `easeOut` (`[0.25, 0.46, 0.45, 0.94]`)
*   **Vertical Translate Start (Y):** `20px` (or `32px` for deep entry)
*   **Hover Transitions:** `300ms`

---

## 5. Technology Stack

The portfolio runs on a modern, typed, and performant frontend stack. You can implement any new stack for this project, but make sure it is well-documented and maintainable.

### Frontend
*   **Framework:** Next.js 16 (React 19, App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS v4 (configured completely via `@theme` in `globals.css`)
*   **Animation:** Framer Motion
*   **Icons:** Lucide React & React Icons
*   **UI Components:** Custom Primitive components inspired by Radix UI and shadcn/ui