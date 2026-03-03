---
name: Playwriter
description: Integrate Playwright-based testing and browser interaction best practices.
---

# Playwriter Skill

A framework for automated browser interaction, testing, and research using Playwright.

## 1. Selector Strategy
- **Prioritize User-Facing Selectors**: Use `getByRole`, `getByText`, `getByLabel`, `getByPlaceholder` to ensure tests are resilient and accessible.
- **Avoid Implementation Details**: Avoid brittle CSS selectors or XPath unless strictly necessary.
- **Unique IDs**: Use `data-testid` only as a last resort when semantic selectors are ambiguous.

## 2. Interaction & Flow
- **Session Management**: Manage browser sessions carefully to avoid memory leaks.
- **Timeouts**: Configure sensible timeouts. Use `await page.waitForSelector()` or `await page.waitForLoadState('networkidle')` for SPA/content transitions.
- **Action Robustness**: Ensure elements are actionable (visible, stable, enabled) before interacting.

## 3. Testing Categories
- **End-to-End (E2E)**: Verify critical user journeys (e.g., navigating to "Comer", reading a news item).
- **Visual Regression**: Use screenshots to detect unintended UI changes, especially after layout refactors.
- **Performance**: Monitor page load times and hydration status.

## 4. Automation Best Practices
- **Single Quotes**: Always use single quotes for shell-based JS execution strings to avoid character escaping issues.
- **Cleanup**: Close browser contexts and pages when tasks are finished.
- **Error Handling**: Implement try/catch blocks for network-dependent actions.
