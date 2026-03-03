---
name: Vercel React Best Practices
description: Guidelines for high-performance React applications focused on Vercel's optimization standards.
---

# Vercel React Best Practices

Follow these guidelines to ensure the application is fast, scalable, and optimized for Vercel's edge and serverless infrastructure.

## 1. Eliminating Waterfalls (CRITICAL)
- **Parallelize independent fetches**: Use `Promise.all()` for independent operations.
- **Early Promise, Late Await**: Start promises as early as possible (e.g., at the top of an API route or RSC) and await them only when the data is strictly needed.
- **Branching Await**: Move `await` into specific logic branches where the data is actually used to avoid blocking other branches.
- **Streaming**: Use React Suspense boundaries to stream content and improve Initial Page Load (IPL).

## 2. Bundle Size Optimization (CRITICAL)
- **Avoid Barrel Files**: Import components and utilities directly from their source file to enable better tree-shaking.
- **Next.js Dynamic Imports**: Use `next/dynamic` for heavy components, modas, or below-the-fold content.
- **Conditional Loading**: Load modules only when a feature is activated.
- **Third-Party Deferral**: Load analytics, logging, and other non-critical scripts after hydration.

## 3. Rendering Performance
- **Re-render Optimization**: Use functional `setState` for stable callbacks. Derive state during render instead of using `useEffect`.
- **Memoization**: Extract expensive work into memoized components (`React.memo`).
- **Transitions**: Use `startTransition` for non-urgent updates (e.g., search results) to keep the UI responsive.
- **Content Visibility**: Use `content-visibility: auto` for long lists to reduce rendering work.

## 4. Server-Side Performance
- **React.cache**: Use for per-request data deduplication.
- **LRU Cache**: Implement for cross-request caching of expensive computations.
- **Minimize Serialization**: Minimize the amount of data passed from Server Components to Client Components.

## 5. Hydration Safety
- **Avoid Mismatches**: Ensure components render the same content on server and client.
- **Inline Scripts**: Use inline scripts for small pieces of client-only data to avoid hydration flickering.
