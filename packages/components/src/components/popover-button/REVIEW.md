# SYNTHESIZER RESULT -- Popover Review Consolidation

**Date:** 2026-03-22
**Sources:** Reviewer (Opus), Developer (Haiku), DX Engineer (Sonnet), Tester (Haiku), Architect (Sonnet), Documenter (Haiku)

---

## Deduplication Report

The 6 agents produced ~30 raw findings. After deduplication, **12 unique issues** remain:

| Merged Issue                                   | Original Sources                   | Resolution                                                                         |
| ---------------------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------- |
| C1: `_aria-controls` JSX bug                   | Reviewer, Developer, Tester        | Merged -- identical root cause                                                     |
| C2: `onClose` callback unreachable / dead code | DX Engineer, Architect, Developer  | Merged -- `setOnCallbacks()` is never called by any component                      |
| C3: `validatePopoverCallbacks` dead code       | Architect                          | Absorbed into C2 (same dead-code cluster)                                          |
| C4: Escape double-fire                         | Reviewer (HIGH), Tester (CRITICAL) | Merged -- severity resolved to HIGH (see below)                                    |
| C5: Dual toggle listener                       | Reviewer, Developer, Architect     | Merged -- all describe same dual-handler pattern                                   |
| C6: DOM traversal fragility                    | DX Engineer, Reviewer              | Merged -- `previousElementSibling` + `nextElementSibling` walk                     |
| C7: Align default inconsistency                | DX Engineer, Architect             | Merged -- controller `top` vs component `bottom`                                   |
| H1: Test coverage gaps                         | Tester, Developer, Reviewer        | Merged -- all list missing E2E scenarios                                           |
| H2: `kol:close` not in public API              | Developer                          | Merged -- event emitted but undocumented                                           |
| H3: Method naming conflicts                    | (existing REVIEW)                  | Kept -- `showPopover`/`hidePopover` vs native API                                  |
| L1: Silent fallback on invalid align           | DX Engineer                        | Kept                                                                               |
| ~~L2: Controller JSDoc missing~~               | ~~Documenter~~                     | Removed -- internal class, no Stencil decorators, not subject to JSDoc requirement |

---

## Cross-Layer Links

Three root causes explain most findings:

**Root Cause A: PopoverController is not integrated as a Skeleton Controller**

- Leads to: C2 (dead callback path), C5 (dual listeners), C7 (inconsistent defaults)
- The controller exposes `setOnCallbacks()` but no component ever calls it. The component manages its own toggle listener independently.

**Root Cause B: DOM traversal instead of ref-based wiring**

- Leads to: C6 (fragile sibling walk), C5 (component must find popover element itself to add listener)
- The `PopoverFC` already provides `popoverRef` to the controller, but the component also does a manual DOM walk in `componentDidRender` to attach its own toggle listener.

**Root Cause C: Missing public API contract for events**

- Leads to: H2 (kol:close undocumented), C2 (onClose callback path dead), documentation gaps

---

## Severity Conflicts Resolved

| Issue                    | Reviewer | Tester   | Developer    | Resolution   | Rationale                                                                                                                                                                                                                                                                                        |
| ------------------------ | -------- | -------- | ------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Escape double-fire       | HIGH     | CRITICAL | --           | **HIGH**     | The native Popover API dismisses on Escape; the custom `handleEscape` listener calls `hidePopover()` which is a no-op if already closed (try/catch in `syncPopoverVisibility`). Functional impact is low, but it is wasteful and could cause unexpected `lastCloseEvent` capture. Not a blocker. |
| Dual toggle listener     | HIGH     | --       | "functional" | **HIGH**     | Both listeners do fire and both are cleaned up. No memory leak, no state divergence in practice. Architectural concern, not a runtime bug.                                                                                                                                                       |
| `_aria-controls` JSX bug | CRITICAL | --       | CRITICAL     | **CRITICAL** | Verified: `_aria-controls` (kebab) is passed but kol-button-wc expects `_ariaControls` (camelCase). The `aria-controls` attribute is NOT rendered on the button. WCAG 4.1.2 violation.                                                                                                           |

---

## Coverage Alerts

1. **Security (DevSecOps not run):** The controller adds `keydown` and `click` listeners to `document.body` with `{ capture: true }`. While cleanup is present in `destroy()`, if `disconnectedCallback` is not called (e.g., element removed without Stencil lifecycle), global listeners leak. This is a minor security/performance concern, not a blocker.

2. **Browser compatibility:** The `popover="auto"` attribute and `:popover-open` pseudo-class require Chrome 114+, Firefox 125+, Safari 17+. No polyfill is provided. _(Not a documentation finding under current guidelines — no Stencil-Decorated element context.)_

3. **Click-outside with Shadow DOM:** `hidePopoverByClickOutside` uses `this.hostElement.contains(event.target)`. In Shadow DOM, `event.target` is retargeted. The current implementation uses `hostElement` (the popover div), not the shadow host. Clicks on the button (which is a sibling, not a child of the popover div) would trigger close. This needs verification -- but since the button click handler calls `setShow(!popoverOpen)`, it may self-correct. Flagged as "Needs Deeper Look".

---

## "Needs Deeper Look" Assignment

| Item                                                                          | Assigned To    | Reason                                                                                        |
| ----------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------- |
| Click-outside behavior with Shadow DOM retargeting                            | Tester         | Needs E2E verification -- does clicking the button while popover is open cause double-toggle? |
| Escape key behavior in nested popovers                                        | Tester         | Native popover API has light-dismiss stack behavior. Custom Escape handler may interfere.     |
| `PopoverCloseEvent` union type (`MouseEvent \| KeyboardEvent \| ToggleEvent`) | Architect      | Consumers cannot reliably narrow this union. Should be a single CustomEvent type.             |
| Browser compatibility documentation                                           | ~~Documenter~~ | Removed -- no Stencil-Decorated element context, not a code-level docs finding                |

---

## FINAL CONSOLIDATED REVIEW

### CRITICAL (Blockers)

#### C1: `_aria-controls` Prop Uses Kebab-Case -- WCAG 4.1.2 Violation

**Sources:** Reviewer (Opus), Developer (Haiku), Tester (Haiku)
**File:** `component.tsx` line 100
**Effort:** 5 minutes

The JSX passes `_aria-controls={this.popoverId}` but `kol-button-wc` expects the prop name `_ariaControls` (camelCase). Result: the rendered `<button>` element has NO `aria-controls` attribute. Screen readers cannot associate the button with its controlled popover.

**Fix:** Change `_aria-controls` to `_ariaControls` on line 100.
**Test:** Add E2E assertion that the button element has `aria-controls` attribute matching the popover ID.

---

#### C2: `onClose` Callback Path is Dead Code

**Sources:** DX Engineer (Sonnet), Architect (Sonnet), Developer (Haiku)
**Files:** `controller.ts` lines 26-32 (`setOnCallbacks`), `popover-callbacks.ts` lines 21-23 (`validatePopoverCallbacks`)
**Effort:** 1 hour (decision + cleanup)

`PopoverController.setOnCallbacks()` is a public method that is **never called** by any component in the codebase (verified via grep). Similarly, `validatePopoverCallbacks` is exported but never imported. The entire callback-based close notification path is unreachable.

The controller does emit a DOM event via `dispatchDomEvent(this.hostElement, KolEvent.close)` on line 106, which works. But the `onCallbacks?.onClose?.(closeEvent)` call on line 103 can never fire because `onCallbacks` is always `undefined`.

**Decision needed:**

- Option A: Remove `setOnCallbacks`, `onCallbacks`, `validatePopoverCallbacks`, and `PropPopoverCallbacks` type (dead code cleanup)
- Option B: Wire up `setOnCallbacks` in PopoverButton if callback pattern is desired alongside DOM events

---

#### C3: Inconsistent Align Defaults (Triple Divergence)

**Sources:** DX Engineer (Sonnet), Architect (Sonnet)
**Files:** `controller.ts` line 8, `component.tsx` (PopoverFC) line 16, `component.tsx` (PopoverButton) line 51/191/124
**Effort:** 30 minutes

Three different defaults exist:

- `PopoverController.align` initializes to `'top'` (controller.ts:8)
- `PopoverFC` destructures with `align = 'top'` (component.tsx:16)
- `PopoverButton._popoverAlign` defaults to `'bottom'` (component.tsx:191), and `state._popoverAlign` to `'bottom'` (line 51), and the render fallback to `'bottom'` (line 124)

PopoverButton always calls `setAlign()` in `componentWillLoad`, overriding the controller default. So at runtime the controller gets `'bottom'`. But if any code path skips `componentWillLoad`, the controller would use `'top'` while the component expects `'bottom'`.

**Fix:** Unify all defaults to `'bottom'` (the intended user-facing default).

---

### HIGH (Fix Before Merge)

#### H1: Dual Toggle Event Listeners -- Architectural Fragility

**Sources:** Reviewer (Opus), Developer (Haiku), Architect (Sonnet)
**Files:** `component.tsx` line 256 + `controller.ts` line 47
**Effort:** 3 hours

Two separate `addEventListener('toggle', ...)` calls register on the same popover element:

- Component's `handleToggle` (line 86-88): updates `popoverOpen` state for CSS classes
- Controller's `handleToggle` (controller.ts line 76-108): manages alignment, focus return, cleanup, DOM event dispatch

Both are cleaned up correctly. No runtime bug. But two independent state tracks for the same element creates maintenance risk.

**Recommended fix:** Remove the component's listener. Instead, have the controller accept an `onToggle` callback to notify the component of state changes, or use `:popover-open` pseudo-class query in render.

---

#### H2: Escape Key Double-Handling

**Sources:** Reviewer (Opus, HIGH), Tester (Haiku, CRITICAL)
**Files:** `controller.ts` lines 116-119, 135
**Effort:** 30 minutes

The controller registers a `keydown` listener for Escape on `document.body`. But the native Popover API (`popover="auto"`) already dismisses on Escape. When the user presses Escape:

1. The custom `handleEscape` fires (capture phase), calls `hidePopover()`
2. The native API also dismisses the popover
3. `hidePopover()` uses try/catch to swallow the DOMException if already closed

Not a runtime bug, but it produces unnecessary work and captures `lastCloseEvent` incorrectly (the KeyboardEvent is stored even though the native API may have already closed the popover).

**Fix:** Remove the custom Escape listener. The native popover API handles Escape correctly. The `toggle` event will still fire and be caught by the controller's `handleToggle`.

---

#### H3: DOM Traversal Fragility (`nextElementSibling` Walk)

**Sources:** DX Engineer (Sonnet), Reviewer (Opus)
**Files:** `component.tsx` lines 248-259
**Effort:** 2 hours

`componentDidRender` walks siblings to find the popover element by class name. This breaks if:

- DOM order changes (e.g., tooltip element inserted between button and popover)
- Class name `kol-popover` changes

Additionally, `controller.ts` line 36 uses `element?.previousElementSibling` to find the trigger element, which has the same fragility.

**Fix:** Use the ref-based approach already available via `PopoverFC`'s `popoverRef` callback. The controller already receives the popover element ref via `setPopoverElementRef`. Remove the manual DOM walk and use the ref to also register the component's toggle listener.

---

#### H4: `kol:close` Event Not in Public API Contract

**Sources:** Developer (Haiku)
**Files:** `component.tsx` line 33 (JSDoc mention only)
**Effort:** 1 hour

The controller dispatches `kol:close` via `dispatchDomEvent`, and the component JSDoc mentions it, but:

- No `@Event()` Stencil decorator
- Not in `PopoverButtonProps` schema
- Not in auto-generated documentation
- No TypeScript type for consumers

**Fix:** Either add a proper Stencil `@Event()` decorator or document the DOM event pattern clearly in the component's public API.

---

#### H5: E2E Test Coverage (~30%)

**Sources:** Tester (Haiku), Developer (Haiku), Reviewer (Opus)
**Files:** `popover-button.e2e.ts`
**Effort:** 3 hours

Current tests cover: show/hide on click, disabled state, tooltip hide, inline rendering. Missing:

- Escape key closes popover
- Click outside closes popover
- `aria-controls` attribute present on button
- `aria-expanded` toggles correctly
- Focus returns to button after close
- `kol:close` event fires
- Keyboard navigation (Tab, Shift+Tab)
- Programmatic `showPopover()`/`hidePopover()` methods
- Multiple popovers on same page (light dismiss stack)
- Listener cleanup after disconnect

---

#### H6: Method Naming Conflicts with Native HTML Popover API

**Sources:** (Existing REVIEW)
**Files:** `component.tsx`, `shadow.tsx`
**Effort:** Breaking change -- defer to next major version

`showPopover()` and `hidePopover()` are identical names to native `HTMLElement.showPopover()` and `HTMLElement.hidePopover()`. This creates confusion for developers.

---

### LOW (Nice-to-Have)

#### L1: Silent Fallback on Invalid `_popoverAlign` Value

**Sources:** DX Engineer (Sonnet)
**Files:** `component.tsx` line 124, `popover-callbacks.ts`

If an invalid align value is passed, `validatePopoverAlign` silently falls back. No warning in dev mode.

---

#### L3: `PopoverCloseEvent` Union Type is Non-Deterministic

**Sources:** Architect (Sonnet), DX Engineer (Sonnet)
**Files:** `popover-callbacks.ts` line 7

`PopoverCloseEvent = MouseEvent | KeyboardEvent | ToggleEvent` -- consumers cannot reliably narrow this type. If the callback path is kept (see C2), this should be wrapped in a `CustomEvent<{ reason: 'escape' | 'click-outside' | 'programmatic' }>`.

---

## Ready-for-Merge Assessment

| Metric                    | Value                                                                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Critical Blockers         | 3 (C1, C2, C3)                                                                                                                                                     |
| High Priority             | 6 (H1-H6)                                                                                                                                                          |
| Low Priority              | 2 (L1, L3)                                                                                                                                                         |
| Minimum effort to unblock | ~2 hours (C1: 5min, C2: decision only, C3: 30min, H5 partial: 1h)                                                                                                  |
| Full effort estimate      | ~12 hours                                                                                                                                                          |
| **Recommendation**        | **NOT READY** -- C1 (WCAG violation) is a hard blocker. C3 (align defaults) risks incorrect positioning. H2+H3+H5 should be addressed before merge for robustness. |

### Minimum Merge Path (if time-constrained)

1. Fix `_ariaControls` camelCase (C1) -- 5 minutes
2. Unify align defaults to `'bottom'` (C3) -- 30 minutes
3. Add E2E test for `aria-controls` attribute (from H5) -- 30 minutes
4. Document C2 (dead callback code) as known tech debt -- 15 minutes

This would take ~1.5 hours and resolve the hard blockers while deferring architectural improvements.
