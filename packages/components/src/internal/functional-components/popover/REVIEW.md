# Popover Skeleton Architecture Review — Consolidated (Revised)

**Date:** 2026-03-22 (Revised per Documenter Re-evaluation)
**Scope:** PopoverFC (`component.tsx`) + PopoverController (`controller.ts`) + Schema (`popover-align.ts`, `popover-callbacks.ts`)
**Overall Status:** 5 Critical + 5 High + 1 Medium Issues — Requires Fixes Before Production

**Sources:** Reviewer (Opus), Developer (Haiku), Architect (Sonnet), Tester (Haiku), Documenter (Haiku - revised assessment)

---

## Deduplication Report

The 4 agents produced ~35 raw findings. After deduplication and Documenter role re-evaluation, **11 unique issues** remain:

| Merged Issue                                   | Original Sources           | Resolution                                                                     |
| ---------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------ |
| C1: `kol:close` event not in public API        | Developer, Reviewer        | Merged — event dispatched but missing @Event() decorator and schema            |
| C2: `onClose` callback unreachable / dead code | Developer, Architect       | Merged — `setOnCallbacks()` is never called by any component                   |
| C3: Align defaults misaligned                  | Architect, Tester          | Merged — controller='top', PopoverFC='top', PopoverButton='bottom' divergence  |
| C4: `_aria-controls` Prop Naming Bug           | (from PopoverButton scope) | Cross-reference: WCAG violation on consumer component                          |
| C5: Browser compatibility not documented       | Reviewer (implicit)        | Identified — native Popover API requires Chrome 114+, Firefox 125+, Safari 17+ |
| H1: NO Unit Tests for PopoverController        | Tester                     | Critical gap — zero .spec.ts file for controller logic                         |
| H2: E2E test coverage ~15%                     | Tester, Developer          | Merged — only 3 tests, missing click-outside, programmatic API, focus return   |
| H3: `PopoverCloseEvent` union type unsafe      | Reviewer, Architect        | Merged — no discriminator, consumers can't reliably narrow                     |
| H4: Escape key double-handling                 | Reviewer                   | Merged — redundant with native popover auto-dismiss                            |
| H5: `destroy()` doesn't clear references       | Reviewer                   | Kept — robustness gap, risk of memory state issues                             |
| M1: PopoverFC zero documentation               | Developer (downgraded)     | **MEDIUM** — internal component, minimal JSDoc needed (2-3 lines)              |

---

## Cross-Layer Links (Root Causes)

Three root causes explain most findings:

**Root Cause A: `kol:close` Event Missing Public API Contract**

- Leads to: C1, H3 (no way to discover or type the event)
- The controller emits via `dispatchDomEvent()` but lacks `@Event()` decorator and schema entry
- Consumers can't find it in autocomplete or type definitions

**Root Cause B: Dead Callback Path (Architectural Mismatch)**

- Leads to: C2, H4 (redundant listeners, callback infrastructure unused)
- The controller follows an unused callback pattern (`setOnCallbacks()`, `PopoverCallbacksPropType`)
- No component ever calls `setOnCallbacks()` — the event-driven approach via `kol:close` is the actual pattern

**Root Cause C: Test Coverage Gaps (Zero Unit Tests)**

- Leads to: H1, H2 (E2E-only testing, controller logic unverified)
- PopoverController has complex state management but no unit test suite
- E2E tests don't cover keyboard, ARIA updates, listener cleanup

---

## Severity Conflicts Resolved

| Issue                     | Reviewer | Developer | Architect | Resolution | Rationale                                                                                                                                                                         |
| ------------------------- | -------- | --------- | --------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PopoverFC JSDoc           | CRITICAL | "blocker" | —         | **MEDIUM** | Self-explanatory internal component. Revised Documenter scope: @Component-decorated elements need JSDoc (Stencil doc-gen), internal classes don't. 2-line description sufficient. |
| Escape double-fire        | HIGH     | —         | —         | **HIGH**   | Native Popover API dismisses on Escape; custom listener calls `hidePopover()` which is no-op if already closed (try/catch). Functional impact low but wasteful.                   |
| `PopoverCloseEvent` union | HIGH     | —         | CRITICAL  | **HIGH**   | Type safety issue, but only surfaces if callback pattern is used. Since C2 (dead code) is resolved, type refinement follows.                                                      |

---

## Coverage Alerts

1. **Security (No DevSecOps review):** The controller adds `keydown` and `click` listeners to `document.body` with `{ capture: true }`. While cleanup is present in `destroy()`, if `disconnectedCallback` is not called (e.g., element removed without Stencil lifecycle), global listeners leak. Recommendation: Verify all consumers call `destroy()` in `disconnectedCallback`.

2. **Browser Compatibility (Not Documented):** The `popover="auto"` attribute and `:popover-open` pseudo-class require Chrome 114+, Firefox 125+, Safari 17+. No polyfill is provided. This should be documented in the component's JSDoc and readme.

3. **Unit Test Coverage (ZERO):** PopoverController has no unit tests. Complex behavior (alignment, listener setup/cleanup, event dispatch) relies entirely on E2E tests. E2E tests cover: show/hide on click, disabled state, tooltip hide, inline rendering. **Missing E2E scenarios:** Escape key, click-outside, ARIA updates, `kol:close` event emission, focus return, listener cleanup.

---

## "Needs Deeper Look" Assignment

| Item                                           | Assigned To | Reason                                                                                                         |
| ---------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| Click-outside with Shadow DOM retargeting      | Tester      | Needs E2E verification — does clicking the button while popover is open cause double-toggle?                   |
| Escape key behavior in nested popovers         | Tester      | Native popover API has light-dismiss stack behavior. Custom Escape handler may interfere.                      |
| Global listener leak if `destroy()` not called | Developer   | Verify all consumers (PopoverButton, SplitButton) call `destroy()` in `disconnectedCallback`                   |
| PopoverCloseEvent discriminator pattern        | Architect   | If callback path remains: wrap union in CustomEvent<{ reason: 'escape' \| 'click-outside' \| 'programmatic' }> |

---

## FINAL CONSOLIDATED REVIEW

### CRITICAL (Blockers)

#### C1: `kol:close` Event Not in Public API Contract

**Sources:** Developer (Haiku), Reviewer (Opus)
**File:** `controller.ts` line 106
**Effort:** 1 hour

The controller dispatches `kol:close` via `dispatchDomEvent()`, but:

- No `@Event()` Stencil decorator on PopoverFC
- Not in public API type definition
- No TypeScript type for consumers to reference

**Fix:**

1. Add `@Event('kol:close')` decorator to PopoverFC component
2. Export `PopoverCloseEvent` type from schema
3. Document in PopoverFC JSDoc as proper public event

**Test:** E2E test to verify `page.waitForEvent('kol:close')` fires on popover close

---

#### C2: `onClose` Callback Path is Dead Code

**Sources:** Developer (Haiku), Architect (Sonnet)
**Files:** `controller.ts` lines 26–32 (`setOnCallbacks`), `schema/props/popover-callbacks.ts`
**Effort:** 1 hour (decision + cleanup)

`PopoverController.setOnCallbacks()` is a public method that is **never called** by any component in the codebase (verified via grep). Similarly, `validatePopoverCallbacks` is exported but never imported. The entire callback-based close notification path is unreachable.

The controller does emit a DOM event via `dispatchDomEvent()` on line 106, which works. But the `onCallbacks?.onClose?.(closeEvent)` call on line 103 can never fire because `onCallbacks` is always `undefined`.

**Decision:**

- **Option A (Recommended):** Remove `setOnCallbacks()`, `onCallbacks`, `validatePopoverCallbacks`, and `PopoverCallbacksPropType` type (dead code cleanup)
- **Option B:** Wire up `setOnCallbacks()` in PopoverButton if callback pattern is desired alongside DOM events

Recommendation: Go with Option A. The event-based pattern (`kol:close`) is cleaner and the callback infrastructure is unused.

---

#### C3: Align Defaults Inconsistent (Triple Divergence)

**Sources:** Architect (Sonnet), Tester (Haiku)
**Files:** `controller.ts` line 8, `component.tsx` line 16, `schema/props/popover-align.ts`
**Effort:** 30 minutes

Three different defaults:

- `PopoverController.align` initializes to `'top'` (controller.ts:8)
- `PopoverFC` destructures with `align = 'top'` (component.tsx:16)
- `PopoverButton._popoverAlign` defaults to `'bottom'` (component.tsx line 191)

PopoverButton always calls `setAlign('bottom')` in `componentWillLoad()`, overriding the controller default. But if any code path skips `componentWillLoad()`, the controller would use `'top'` while the component expects `'bottom'`.

**Fix:** Unify all defaults in `popover-align.ts` to `'bottom'` (the intended user-facing default). Update:

1. `PopoverController.align` → `'bottom'`
2. `PopoverFC` default param → `'bottom'`
3. Schema definition → `'bottom'` default

---

#### C4: Browser Compatibility Not Documented

**Sources:** Reviewer (Opus)
**Files:** `component.tsx` (PopoverFC), `schema/props/`
**Effort:** 20 minutes

The native Popover API (`popover="auto"`, `:popover-open` pseudo-class) requires:

- Chrome 114+ (August 2023)
- Firefox 125+ (January 2025)
- Safari 17+ (September 2023)

**Fix:** Add to PopoverFC JSDoc (same section as M1 below):

```
@description Functional component wrapping native HTML Popover API. Requires Chrome 114+, Firefox 125+, Safari 17+. No polyfill provided.
```

---

#### C5: `destroy()` Cleanup Incomplete

**Sources:** Reviewer (Opus)
**Files:** `controller.ts` lines 186–192
**Effort:** 10 minutes

After `destroy()`, the instance still holds references to DOM elements (`popoverElement`, `triggerElement`, `hostElement`, `onCallbacks`). A second `destroy()` call would try to remove listeners again (benign), but the instance is in an "in-between" state.

**Fix:** Clear all references at the end of `destroy()`:

```typescript
this.popoverElement = undefined;
this.triggerElement = undefined;
this.hostElement = undefined;
this.onCallbacks = undefined;
this.cleanupAutoUpdate = undefined;
```

---

### HIGH (Fix Before Merge)

#### H1: NO Unit Tests for PopoverController

**Sources:** Tester (Haiku)
**File:** `controller.ts` (missing `.spec.ts`)
**Effort:** 5–6 hours

The PopoverController class has **zero unit tests**. All testing is E2E-only, which masks bugs in:

- Listener registration/cleanup logic
- State transitions (`isOpen` tracking)
- Event dispatch timing
- Edge cases (rapid toggle, null refs, listener conflict scenarios)

**Missing test scenarios:**

- `setAlign()` triggers realignment when popover is open
- `setShow(true)` calls `showPopover()` correctly
- `setShow(false)` and escape key both call `hidePopover()`
- `destroy()` removes all listeners and clears refs
- `beforetoggle` event hides popover during open transition
- `toggle` event dispatches `kol:close` on close
- Focus returns to trigger element
- Cleanup after rapid toggle

**Fix:** Create `controller.spec.ts` with unit tests covering all public methods and state transitions.

---

#### H2: E2E Test Coverage Only ~15%

**Sources:** Tester (Haiku), Developer (Haiku), Reviewer (Opus)
**Files:** `popover.e2e.ts`
**Effort:** 3 hours

Current tests cover: show/hide on click, disabled state, tooltip hide, inline rendering. **Missing:**

- Escape key closes popover (E2E verify)
- Click outside popover closes it (Shadow DOM retargeting consideration)
- `aria-controls` attribute validation (WCAG 4.1.2)
- `aria-expanded` toggles correctly
- Focus returns to button after close
- `kol:close` event fires (once Event is exposed in C1)
- Keyboard navigation (Tab, Shift+Tab)
- Programmatic `showPopover()` / `hidePopover()` methods
- Multiple popovers on same page (light dismiss stack)
- Listener cleanup after disconnect (memory leak verification)

---

#### H3: `PopoverCloseEvent` Union Type Unsafe

**Sources:** Reviewer (Opus), Architect (Sonnet)
**Files:** `schema/props/popover-callbacks.ts` line 7
**Effort:** 1 hour (if callback pattern is kept)

`PopoverCloseEvent = MouseEvent | KeyboardEvent | ToggleEvent` — consumers cannot reliably narrow this union type. There is no discriminator to distinguish which event type is present.

**Status:** Deferred pending C2 decision. If `setOnCallbacks()` is removed (Option A), this becomes moot. If kept (Option B), wrap in `CustomEvent<{ reason: 'escape' | 'click-outside' | 'programmatic' }>` for type safety.

---

#### H4: Escape Key Double-Handling

**Sources:** Reviewer (Opus)
**Files:** `controller.ts` lines 116–119, 135
**Effort:** 30 minutes

The controller registers a `keydown` listener for Escape on `document.body`. But the native Popover API (`popover="auto"`) already dismisses on Escape. When the user presses Escape:

1. Custom `handleEscape` fires (capture phase) → calls `hidePopover()`
2. Native API also dismisses the popover
3. `hidePopover()` tries/catches to swallow DOMException if already closed

Not a runtime bug, but wasteful and captures `lastCloseEvent` incorrectly.

**Fix:** Remove the custom Escape listener (lines 135 and 116–119). The native API handles Escape correctly. The `toggle` event will still fire.

---

#### H5: Fragile DOM Traversal in setHostElement()

**Sources:** Reviewer (Opus), Developer (Haiku)
**Files:** `controller.ts` line 36
**Effort:** 1 hour

`setHostElement()` assumes the trigger element is always `previousElementSibling`:

```typescript
this.triggerElement = element?.previousElementSibling as HTMLElement | null;
```

This breaks if:

- DOM order changes
- Wrapper divs are inserted
- Multiple popover instances (first match fails)

**Fix:** The controller already receives the popover element ref via `setPopoverElementRef()`. Use ref-based wiring instead of DOM traversal. Update PopoverButton to pass trigger element explicitly via a new setter, or query via the popover's anchor attribute.

---

### MEDIUM (Nice-to-Have)

#### M1: PopoverFC Minimal Documentation

**Sources:** Developer (Haiku, revised by Documenter)
**File:** `component.tsx` (PopoverFC, lines 1–25)
**Effort:** 5 minutes

PopoverFC is an internal functional component. Minimal JSDoc needed:

```typescript
/**
 * @description Functional component wrapping native HTML Popover API.
 * Renders popover container with optional arrow. Requires Chrome 114+, Firefox 125+, Safari 17+.
 * No polyfill provided.
 */
export const PopoverFC: FC<PopoverFCProps> = (props) => {
```

Rationale (per revised Documenter scope): Internal classes don't need JSDoc. Only @Component-decorated elements (Stencil doc-generation) require JSDoc. PopoverFC is not Stencil-decorated, so full JSDoc is unnecessary. A 2-line description sufficient for maintainability.

---

## Ready-for-Merge Assessment

| Metric                        | Value                                                                                                                                                     |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Critical Blockers             | 5 (C1–C5)                                                                                                                                                 |
| High Priority                 | 5 (H1–H5)                                                                                                                                                 |
| Medium Priority               | 1 (M1)                                                                                                                                                    |
| **Minimum effort to unblock** | ~3.5–4 hours                                                                                                                                              |
| **Full effort estimate**      | ~10.5–11 hours                                                                                                                                            |
| **Recommendation**            | **NOT READY** — C1 (event not in API), C2 (dead code), C3 (align defaults), C5 (destroy cleanup) are hard blockers. H1 (zero unit tests) is critical gap. |

### Minimum Merge Path (if time-constrained)

1. Fix `destroy()` cleanup (C5) — 10 minutes
2. Unify align defaults to 'bottom' (C3) — 30 minutes
3. Remove dead `setOnCallbacks()` path (C2) — 1 hour
4. Add `kol:close` to public API with @Event() (C1) — 1 hour
5. Add PopoverFC JSDoc 2-liner (M1) — 5 minutes
6. Add E2E test for `kol:close` event (from H2) — 30 minutes

**This would take ~3.5 hours** and resolve critical blockers while deferring:

- Unit test suite (H1) → Sprint 2 (5–6 hours)
- Full E2E coverage (H2) → Sprint 2 (3 hours)
- Escape key refactor (H4) → Sprint 2
- DOM traversal refactor (H5) → Sprint 2

---
