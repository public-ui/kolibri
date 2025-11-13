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

Toasts are rendered in a container that's appended as first element of `<body>` and elevated using a high `z-index`.

When using [modal dialogs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) these are rendered above toasts on the [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer). Hence, toast messages are always blocked by modal dialogs. We recommend completely avoiding toasts in modals and giving feedback within the modal directly.
