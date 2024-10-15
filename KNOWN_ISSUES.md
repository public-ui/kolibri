<!-- Note: Headings might be used for anchor-links. Please check for references before adjusting them. -->

# Known Issues

## input-color

The component InputColor is a wrapper for the native HTML element `<input type="color">` which has accessibility problems:

- With NVDA, the element is announced as "clickable" and not as an input element.
- It's not possible to select a color using a screen reader.

For full accessibility, consider using predefined colors lists, e.g. using KolSelect or KolCheckbox.

[🐞 GitHub issue #5549](https://github.com/public-ui/kolibri/issues/5549)

## `aria-sort` changes sometimes not announced in NVDA

When a table column changes its sort order (i.e. when its `aria-sort` attribut changes), screen readers announce this change automatically.  
For unknown reasons, this sometime does not happen in NVDA.

[🐞 GitHub issue (PR) #5780](https://github.com/public-ui/kolibri/pull/5780)
[🐞 NVDA issue #10890](https://github.com/nvaccess/nvda/issues/10890)
[🐞 NVDA issue #8132](https://github.com/nvaccess/nvda/issues/8132)

## input-number and input-date 'readonly' not announced in NVDA

The components InputNumber and InputDate render their respective native HTML elements `<input type="number">` and `<input type="date">` which both support the
attribute `readonly`.  
When focusing the element, it's expected that the `readonly` attribute is announced as part of the element description. This isn't the case for NVDA.

[🐞 GitHub issue #5554](https://github.com/public-ui/kolibri/issues/5554) (For number)
[🐞 GitHub issue #5749](https://github.com/public-ui/kolibri/issues/5749) (For date)
[🐞 NVDA issue #13672](https://github.com/nvaccess/nvda/issues/13672)

## Toaster

Toasts are rendered in a container that's appended as first element of `<body>` and elevated using a high `z-index`.

When using [modal Dialogs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) these are rendered above toasts on the
[top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer). Hence, toast messages are always blocked by Modal Dialogs. We recommend completely
avoiding Toasts in Modals and giving feedback within the modal directly.

## input text

The `search` of this component is highly browser-dependent. For example, the close button is either shown or hidden depending on the browser. Accessibility is therefore not achieved.
[🐞 GitHub issue #6307](https://github.com/public-ui/kolibri/issues/6307)

## Screen reader only reads last selected in Select

KolSelect is using native HTML `<select>`. 

When using KolSelect with the `multiple` property, the native HTML `<select>` may cause problems with screen readers. 
Often the entire selection is not read out, but only the last one. Therefore, the KolSelect has no full accessibility.

## Limited Styling Capabilities for `<select>` and `<option>` Elements
[Stackblitz Example](https://stackblitz.com/edit/vitejs-vite-nthnce?file=src%2Fstyle.css)

The `<select>` element and its `<option>` tags offer limited styling options. Specifically, states such as "selected", "focus" or "active" cannot be reliably customized using CSS. This leads to challenges in meeting accessibility standards, especially in ensuring sufficient contrast ratios.

**Impact**:
- **Limited Customization**: The visual state of dropdown options (e.g., on focus or selection) cannot be consistently customized across all browsers. This makes it difficult to create an accessible visual experience for all users.

- **Browser-Dependent Rendering**: The appearance of the `<select>` element varies across browsers and operating systems, resulting in inconsistent user experiences.

- **Contrast Issues**: Since the contrast of the default dropdown rendering is controlled by the browser, it's not always possible to ensure WCAG-compliant contrast ratios, which may hinder readability for users with visual impairments.

## VoiceOver Reads Date Inputs with Percentage in Google Chrome

In Google Chrome, when using VoiceOver with empty `date` input fields (no initial value), an unexpected percentage value is read aloud alongside the usual prompt.

Notably, this issue does not occur with Windows Narrator, which handles empty date inputs correctly.

There is a Bug Report for this Issue:

[VoiceOver reads negative percent values for month, day, and year steppers in `<input type="date">`](https://issuetracker.google.com/issues/361250561?pli=1)
