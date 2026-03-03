---
name: Web Design Guidelines
description: Rules for ensuring consistent, high-quality, and accessible web interfaces.
---

# Web Interface Guidelines

Guidelines for building premium, accessible, and high-performance web interfaces.

## 1. Visual Quality & Aesthetics
- **Typography**: Use high-quality fonts (Inter, Outfit, etc.). Maintain a clear hierarchy and readable line-heights.
- **Spacing**: Follow a consistent spacing scale (e.g., 4px or 8px grid). Avoid cramped layouts.
- **Contrast**: Ensure text exceeds WCAG AA standards. Use shadows and gradients subtly for depth.
- **Dark Mode**: Implement high-quality dark themes that don't just use pure black (#000). Use deep navies or charcoal grays.

## 2. Interactive States
- **Focus States**: Never remove focus outlines without providing a high-quality custom alternative.
- **Hover & Active**: All interactive elements must have clear hover and active (click) states.
- **Touch Targets**: Ensure buttons and links are easy to tap on mobile (minimum 44x44px).

## 3. Performance & Hydration
- **Images**: Always use optimized formats (WebP/AVIF). Provide width/height to avoid Layout Shift (CLS).
- **Hydration Safety**: Avoid using browser-only APIs (e.g., `window`, `localStorage`) directly in the first render.
- **LCP Optimization**: Prioritize "Above the Fold" content. Fetch critical images with `priority`.

## 4. Forms & Input
- **Labels**: Ensure every input has a linked `<label>`.
- **Validation**: Provide clear, immediate feedback for errors. Use appropriate `inputmode` for mobile keyboards.

## 5. Anti-Patterns (Flag these)
- Generic "AI-slop" aesthetics (overused glassmorphism, flat generic colors).
- Content-less heroes or pages with generic stock photography.
- Lack of responsive consideration on mobile devices.
