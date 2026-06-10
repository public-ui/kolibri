# Card Component - Accessibility Documentation

## Overview

The `kol-card` component uses semantic HTML5 `<article>` markup to provide proper accessibility for screen reader users and follow WCAG 2.2 Level AA standards.

## Semantic Markup

### Why `<article>` Instead of `<div>`?

The card uses `<article>` as its container element because:

1. **Semantic correctness** - `<article>` is the appropriate element for self-contained content that could be independently distributed or reused
2. **Proper labeling** - `aria-labelledby` works better with semantic elements than with `role="group"`
3. **Screen reader perception** - Users understand the card is a distinct, complete piece of content
4. **WCAG 2.2 compliance** - Meets accessibility guidelines for semantic structure

### Previous Approach (Deprecated)

Previously, the card used:

```html
<div role="group" aria-labelledby="..."></div>
```

This was problematic because:

- ❌ `role="group"` is not prominently announced by screen readers
- ❌ `aria-labelledby` is often ignored with `role="group"`
- ❌ Users don't understand the semantic relationship
- ❌ Does not meet WCAG best practices

## HTML Structure

### Single Card

```html
<kol-card-wc _label="Card Title"> Content goes here </kol-card-wc>
```

Renders as:

```html
<article aria-labelledby="card-heading-nonce">
	<h2 id="card-heading-nonce">Card Title</h2>
	<div class="kol-card__content">Content goes here</div>
</article>
```

### Multiple Cards (Recommended)

When displaying multiple cards, wrap them in a list to provide semantic grouping:

```html
<ul>
	<li><kol-card-wc _label="Card 1">Content 1</kol-card-wc></li>
	<li><kol-card-wc _label="Card 2">Content 2</kol-card-wc></li>
	<li><kol-card-wc _label="Card 3">Content 3</kol-card-wc></li>
</ul>
```

**Screen reader announcement:** "List with 3 items"

## Accessibility Features

| Feature                | Implementation                                    |
| ---------------------- | ------------------------------------------------- |
| **Semantic Container** | `<article>` element                               |
| **Labeling**           | `aria-labelledby` linking to heading              |
| **Heading**            | Proper heading level (`<h1>`–`<h6>`)              |
| **Close Button**       | Optional `_hasCloser` prop with accessible button |
| **Source Order**       | Content in logical reading order                  |

## Screen Reader Experience

### When navigating by landmarks:

- Single cards don't create extra landmarks (avoids clutter)
- Users understand each card as distinct content

### When navigating by headings:

- Card title is properly announced with heading level
- Users can jump between cards using heading navigation

### When navigating by regions:

- Each card is a region labeled by its title
- Users understand the boundaries of each card's content

## Best Practices

✅ **DO:**

- Use `<ul>` or `<ol>` to group multiple cards
- Use proper heading hierarchy (especially in card title)
- Keep card content logically structured
- Provide meaningful `_label` (card title)
- Use `_hasCloser` only when cards can be dismissed

❌ **DON'T:**

- Wrap entire cards in clickable elements (creates overly long link text)
- Use decorative images without proper alt text
- Nest interactive elements inside the card title
- Use multiple headings with the same level in a card

## Interactive Cards

When a card needs to be clickable as a whole:

- Don't wrap the entire card in a `<a>` or `<button>` (makes link text too long)
- Instead, make specific interactive elements (links/buttons) clickable
- Use CSS to expand the clickable area if needed

## Testing

The component is tested for:

- Proper semantic rendering
- Correct heading structure
- Accessible close button functionality
- Aria attribute correctness

## References

- [W3C Design System - Cards](https://design-system.w3.org/components/cards.html)
- [WCAG 2.2 - Semantics](https://www.w3.org/WAI/WCAG22/Understanding/semantics.html)
- [NZ Government Web Accessibility - Cards](https://govtnz.github.io/web-a11y-guidance/wct/cards/)
- [MDN - &lt;article&gt; Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article)
