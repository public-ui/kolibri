# Known Issues

## General

### Limited support for `aria-description` (WAI-ARIA 1.2)

- `aria-description` was introduced with [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/#aria-description), but many assistive technologies have not yet adopted it and continue to rely solely on `aria-describedby` when presenting supplementary text. Components that accept `_ariaDescription` therefore keep rendering hidden fallback markup and set both attributes so older screen readers still expose the description.

## select

### All text inputs

In Chrome on Windows, clicking outside an HTML input but inside a Web Component does not give focus to the input when it is empty. This issue sometimes does not occur if the input already contains a value. We suspect a focus propagation problem related to Web Component behavior.

[🐞 GitHub issue #7713](https://github.com/public-ui/kolibri/issues/7713)

### NVDA spells out certain words instead of reading them

It has been observed that on a system with German locale, NVDA spells out certain English words such as "selection", instead of reading them properly.

[🐞 GitHub issue #6898](https://github.com/public-ui/kolibri/issues/6898),
[Stack Overflow](https://stackoverflow.com/questions/69091167/nvda-spells-words-where-it-shouldnt)

### Text selection in Firefox

In Firefox, text selection when using Web Components does not work as expected. Highlighting and selecting text behaves inconsistently or fails.

[🐞 GitHub issue #7761](https://github.com/public-ui/kolibri/issues/7761),
[Mozilla Bug #1587724](https://bugzilla.mozilla.org/show_bug.cgi?id=1587724),
[Mozilla Bug #1233594](https://bugzilla.mozilla.org/show_bug.cgi?id=1233594),
[Mozilla Bug #1590379](https://bugzilla.mozilla.org/show_bug.cgi?id=1590379)

## Components

### kol-select

- Disabled options in KolSelect affect the total count in some screen readers. When an option is set to `disabled: true`, it may still be included in the overall option count announced by assistive technology. Using `aria-hidden="true"` on `<option>` is not conforming with WAI-ARIA and causes browser warnings, therefore it has been removed. As a result, screen readers might announce a higher number of available options than can actually be selected.

[🐞 GitHub issue #7453](https://github.com/public-ui/kolibri/pull/7453)
[🐞 GitHub issue #7920](https://github.com/public-ui/kolibri/pull/7920)

### kol-input-color

The component InputColor is a wrapper for the native HTML element `<input type="color">` which has accessibility problems:

- With NVDA, the element is announced as "clickable" and not as an input element.
- It's not possible to select a color using a screen reader.
- **9.1.3.1h Labeling of form elements programmatically detectable:**
  The label is not announced by the screen reader. Since it reads linearly, no label is perceivable when `hideLabel` is used.
- **9.1.3.2 Meaningful sequence:**
  When opening the color selection for "Color with error," there is no output. It is not accessible via the Tab key, only with the arrow keys, making it very confusing for screen reader users.
- **9.2.4.3 Logical keyboard navigation order:**
  The focus order for "Color with error" is very unusual. Users do not realize that they have to use arrow keys to enter. This is especially problematic since it is not visible on black.
- **9.2.4.7 Clearly visible focus position:**
  The focus is not visible on the black color icon in "Color with error."

For full accessibility, consider using predefined colors lists, e.g. using KolSelect or KolCheckbox.

[🐞 GitHub issue #5549](https://github.com/public-ui/kolibri/issues/5549),
[🐞 GitHub issue #7455](https://github.com/public-ui/kolibri/pull/7455)

### kol-table-stateful and kol-table-stateless

#### `aria-sort` changes sometimes not announced in NVDA

When a table column changes its sort order (i.e. when its `aria-sort` attribute changes), screen readers announce this change automatically. For unknown reasons, this sometimes does not happen in NVDA.

[🐞 GitHub issue (PR) #5780](https://github.com/public-ui/kolibri/pull/5780),
[🐞 NVDA issue #10890](https://github.com/nvaccess/nvda/issues/10890),
[🐞 NVDA issue #8132](https://github.com/nvaccess/nvda/issues/8132)

#### Sticky headers

Sticky headers in tables are not supported at the moment, because `position: sticky` doesn't work together with `overflow: auto` on the table container, without introducing other drawbacks.

[🐞 GitHub issue #7490](https://github.com/public-ui/kolibri/issues/7490),
[CSSWG Drafts issue](https://github.com/w3c/csswg-drafts/issues/865),
[Code sample (StackBlitz)](https://stackblitz.com/edit/stackblitz-starters-umfg2y7m)

### kol-input-number and kol-input-date

#### `readonly` not announced in NVDA

The components InputNumber and InputDate render their respective native HTML elements `<input type="number">` and `<input type="date">` which both support the attribute `readonly`. When focusing the element, it's expected that the `readonly` attribute is announced as part of the element description. This isn't the case for NVDA.

[🐞 GitHub issue #5554](https://github.com/public-ui/kolibri/issues/5554) (For number),
[🐞 GitHub issue #5749](https://github.com/public-ui/kolibri/issues/5749) (For date),
[🐞 NVDA issue #13672](https://github.com/nvaccess/nvda/issues/13672)

### kol-input-date

#### VoiceOver reads date inputs with percentage in Google Chrome

In Google Chrome, when using VoiceOver with empty `date` input fields (no initial value), an unexpected percentage value is read aloud alongside the usual prompt.

Notably, this issue does not occur with Windows Narrator, which handles empty date inputs correctly.

There is a bug report for this issue:

[VoiceOver reads negative percent values for month, day, and year steppers in `<input type="date">`](https://issuetracker.google.com/issues/361250561?pli=1)

### kol-input-text

The `search` of this component is highly browser-dependent. For example, the close button is either shown or hidden depending on the browser. Accessibility is therefore not achieved.

[🐞 GitHub issue #6307](https://github.com/public-ui/kolibri/issues/6307)

### kol-select

#### Screen reader only reads last selected option

KolSelect is using native HTML `<select>`.

When using KolSelect with the `multiple` property, the native HTML `<select>` may cause problems with screen readers. Often the entire selection is not read out, but only the last one. Therefore, the KolSelect has no full accessibility.

#### Limited styling capabilities for `<select>` and `<option>` elements

[Stackblitz example](https://stackblitz.com/edit/vitejs-vite-nthnce?file=src%2Fstyle.css)

The `<select>` element and its `<option>` tags offer limited styling options. Specifically, states such as "selected", "focus" or "active" cannot be reliably customized using CSS. This leads to challenges in meeting accessibility standards, especially in ensuring sufficient contrast ratios.

**Impact**:

- **Limited customization**: The visual state of dropdown options (e.g., on focus or selection) cannot be consistently customized across all browsers. This makes it difficult to create an accessible visual experience for all users.
- **Browser-dependent rendering**: The appearance of the `<select>` element varies across browsers and operating systems, resulting in inconsistent user experiences.
- **Contrast issues**: Since the contrast of the default dropdown rendering is controlled by the browser, it's not always possible to ensure WCAG-compliant contrast ratios, which may hinder readability for users with visual impairments.

### kol-icon

#### Firefox accessibility issue with `aria-label`

The use of `aria-label` or `aria-labelledby` on `<kol-icon>` or its nested elements does not work reliably in Firefox. Even applying these attributes directly to `<kol-icon>` has no effect, which points to a browser-specific issue with ARIA support in custom elements or shadow DOM contexts.

##### Key points

- The issue lies in Firefox's handling of ARIA attributes on custom web components or deeply nested elements.
- This is not related to dynamic announcements (`aria-live`) but specifically to the inability of Firefox to process `aria-label` or `aria-labelledby` correctly in these cases.
- The issue is browser-specific and does not consistently occur in Chrome, Edge, or Safari.

##### Conclusion

This is a limitation in Firefox’s ARIA implementation. Until it is resolved, alternative strategies like visually hidden text near the element or redundant error messages should be used to ensure accessibility.

[🐞 GitHub issue #7076](https://github.com/public-ui/kolibri/issues/7076),
[🐞 GitHub issue #7119](https://github.com/public-ui/kolibri/issues/7119)

### Toaster

> **Deprecated** — The `kol-toast-container` component and `ToasterService` are deprecated and will be removed in the next major version. See [#8372](https://github.com/public-ui/kolibri/issues/8372) and [#9110](https://github.com/public-ui/kolibri/issues/9110). Use [`kol-alert`](./packages/components/src/components/alert) for inline notifications and [`kol-dialog`](./packages/components/src/components/dialog) for interactive messages instead.

#### Why toast notifications are fundamentally inaccessible

The international accessibility community broadly agrees: the classic toast pattern — auto-dismissing, corner-positioned notifications — cannot be made fully WCAG-conformant without removing the traits that define it. The following issues are structural and cannot be resolved through ARIA attributes, focus management, or the Popover API alone.

#### SC 2.2.1 – Timing Adjustable (Level A) — critical

Auto-dismissing toasts set a time limit on content perception. WCAG requires users to be able to turn off, adjust, or extend time limits. A toast only avoids violating SC 2.2.1 if the same information is simultaneously available elsewhere (e.g. a new email visible in the inbox). When the toast is the sole information source and disappears automatically, it violates SC 2.2.1 at **Level A** — the lowest conformance threshold.

The W3C WCAG Working Group clarified this in [issue #1814](https://github.com/w3c/wcag/issues/1814).

#### SC 4.1.3 – Status Messages (Level AA)

Toasts must be announced via ARIA live regions without moving focus. In practice:

- The live region container must exist in the DOM **before** content is inserted. If container and content are injected simultaneously, most screen readers ignore the announcement.
- **JAWS** does not re-announce identical messages — inserting the same text twice results in silence for the second occurrence.
- **NVDA** may drop `polite` announcements under load.
- **VoiceOver (iOS)** historically only handled `assertive` live regions reliably.

#### SC 2.1.1 – Keyboard (Level A)

Interactive elements inside toasts (close button, "Undo" links) must be keyboard-accessible — in a race against the auto-dismiss timer. For users who type slowly or rely on switch access or voice control, this race cannot be won.

#### SC 2.4.3 – Focus Order (Level A)

Toast elements appended to the end of the DOM are barely reachable by keyboard users before they disappear automatically.

#### SC 1.3.2 – Meaningful Sequence (Level A)

Toast markup at the beginning or end of the DOM has no logical relationship to the element that triggered it. The document order does not match the visual or semantic order.

#### SC 1.4.4 / 1.4.10 – Resize Text / Reflow (Level AA)

Enlarged text can cause toasts to overflow or cover content. Toasts that appear outside the visible viewport at 400% zoom are effectively invisible to users relying on screen magnification.

#### SC 2.2.4 – Interruptions (Level AAA)

Toasts are unsolicited interruptions. `role="alert"` literally interrupts the running screen reader output regardless of what the user is currently reading.

#### The toast paradox

> "You can improve the accessibility of toasts by removing the traits that make them toasts."
> — Adam Silver, [Can you make toast messages accessible?](https://adamsilver.io/blog/can-you-make-toast-messages-accessible/)

Every measure that makes a toast genuinely accessible transforms it into a different component:

| Measure | Result |
|---|---|
| No auto-dismiss | → Persistent inline alert |
| Focus moved into the toast | → Non-modal dialog |
| Notification history | → Notification panel / landmark region |
| Plain text only, no interactive elements | → ARIA live region (no longer a visual toast) |

> "If a notification contains an interactive element, it should not be a live region. And it should also not be a toast."
> — Sara Soueidan, [Accessible Notifications with ARIA Live Regions](https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-2/)

#### Why the Popover API does not solve the structural problems

An exploratory implementation using the native Popover API (`popover="manual"`) was developed on branch `claude/toast-popover-dialog-6ahi8`. It improves the technical infrastructure:

- ✅ No more z-index conflicts — each toast is independently promoted to the browser Top Layer
- ✅ Focus is returned to the triggering element when a toast is closed by the user
- ✅ Auto-fired toasts (where the user never focused into the toast) do not disrupt existing focus

The structural accessibility problems remain unresolved:

- ❌ SC 2.2.1 — auto-dismiss timing
- ❌ SC 4.1.3 — ARIA live region inconsistencies across browser/screen reader combinations
- ❌ SC 2.1.1 — keyboard race condition against the timer
- ❌ Visibility under screen magnification

#### How leading design systems decide

| Design system | Decision |
|---|---|
| **GOV.UK Design System** | No toast — Notification Banner (persistent) instead |
| **U.S. Web Design System** | No toast — Alert + Site Alert instead |
| **GitHub Primer** | Toast officially banned after moderated usability tests with disabled users: "The tests showed significant problems that cannot be addressed with a sprinkling of ARIA." |
| **Adobe Spectrum** | Toast with strict constraints: min. 5 s timeout, pause on hover/focus, F6 landmark navigation |
| **Carbon (IBM) v11** | Split into non-interactive (`role="status"`) and interactive (`role="alertdialog"` with full focus management) |

#### References

- [Adrian Roselli — Defining Toast Messages](https://adrianroselli.com/2020/01/defining-toast-messages.html) — analysis of ~50 implementations, none passed a full WCAG audit
- [Scott O'Hara — A Toast to Accessibility](https://www.scottohara.me/blog/2019/07/08/a-toast-to-a11y-toasts.html)
- [Sara Soueidan — Accessible Notifications with ARIA Live Regions (Part 2)](https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-2/)
- [Adam Silver — Can you make toast messages accessible?](https://adamsilver.io/blog/can-you-make-toast-messages-accessible/)
- [GitHub Primer — Accessible Notifications and Messages](https://primer.style/accessibility/patterns/accessible-notifications-and-messages/)
- [TetraLogical — Why are my live regions not working?](https://tetralogical.com/blog/2024/05/01/why-are-my-live-regions-not-working/)
- [W3C WCAG Understanding 2.2.1 — Timing Adjustable](https://www.w3.org/WAI/WCAG21/Understanding/timing-adjustable.html)
- [W3C WCAG Working Group Issue #1814](https://github.com/w3c/wcag/issues/1814)
- [Carbon Design System — Notification Pattern](https://carbondesignsystem.com/patterns/notification-pattern/)
