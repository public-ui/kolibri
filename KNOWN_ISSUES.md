<!-- Note: Headings might be used for anchor-links. Please check for reference before adjusting them. -->

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
