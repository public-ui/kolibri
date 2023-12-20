<!-- Note: Headings might be used for anchor-links. Please check for reference before adjusting them. -->

# Known Issues

## input-color

The component InputColor is a wrapper for the native HTML element `<input type="color">` which has accessibility problems:

- With NVDA, the element is announced as "clickable" and not as an input element.
- It's not possible to select a color using a screen reader.

For full accessibility, consider using predefined colors lists, e.g. using KolSelect or KolCheckbox.

[🐞 GitHub issue #5549](https://github.com/public-ui/kolibri/issues/5549)
