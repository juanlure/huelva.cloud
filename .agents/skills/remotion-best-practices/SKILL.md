---
name: Remotion Best Practices
description: Video-as-code development guidelines for Remotion.
---

# Remotion Best Practices

Best practices for building high-performance, dynamic video compositions with Remotion.

## 1. Composition Structure
- **Break into Components**: Keep compositions manageable by breaking them into smaller, reusable React components.
- **Sequence Management**: Use `<Sequence>` effectively to control the timing of layers.
- **Dynamic Props**: Use `inputProps` to make compositions data-driven and reusable.

## 2. Asset Management
- **Preloading**: Preload images and heavy assets before the composition starts to avoid rendering glitches.
- **Static Assets**: Use the `staticFile()` helper for assets in the `public/` directory.

## 3. Video & Audio Operations
- **FFmpeg Usage**: Use FFmpeg for preprocessing tasks like trimming, silence detection, or audio extraction.
- **Audio Visualization**: Use Remotion's audio hooks to create spectrum bars or waveforms.
- **Subtitles**: Implement accessible captions by parsing SRT/VTT files and mapping them to the frame count.

## 4. Performance
- **Heavy Components**: Avoid overly complex SVGs or heavy filters that can slow down rendering.
- **Caching**: Cache expensive computations (like audio calculations) to speed up frame generation.
- **Concurrency**: Remotion leverages multi-core rendering; ensure components are thread-safe.

## 5. Styling & Animation
- **Spring Animations**: Use `spring()` for natural-feeling movements.
- **Interpolation**: Use `interpolate()` for precise control over property changes over time.
