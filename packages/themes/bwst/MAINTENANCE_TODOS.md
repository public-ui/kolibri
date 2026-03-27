# BWSt Theme — Maintenance TODOs

## Completed Fixes (v1.0)

All fixes verified and merged into the theme.

- [x] alert.scss:31 — rgb() → rgba() for drop-shadow
- [x] alert.scss:104 — CSS-Calc-Syntax fix (--var-spacing → var(--spacing))
- [x] kol-table-stateless-wc.scss:155 — rgb() → rgba()
- [x] kol-table-stateless-wc.scss:212 — rgb() → rgba()
- [x] button.scss:95 — rgb() → rgba()
- [x] pagination-mixin.scss:26 — rgb() → rgba()
- [x] input-radio.scss:58 — rgb() → rgba()
- [x] nav.scss:105 — rgb() → rgba()
- [x] input-checkbox.scss:72 — rgb() → rgba()
- [x] input-checkbox.scss:222 — rgb() → rgba()
- [x] button-link.scss:25 — var(--visited) → var(--color-visited)
- [x] split-button.scss:50 — #fff → var(--color-light)

## Open Tasks

### Critical

- [ ] serve.sh:5 — Fix shell script syntax: `'pwd'` → `` `pwd` `` or `$(pwd)`

### High

- [ ] Theme Variables Audit — Create comprehensive list of all available design tokens
- [ ] A11y Audit — Verify color contrast, keyboard navigation, ARIA attributes

### Medium

- [ ] focus-visible Fallbacks — Ensure all components have `:focus` state defined
- [ ] Responsive Design Review — Audit REM/EM vs. PX unit usage for consistency

### Low

- [ ] Documentation — Update component style guide with BWSt-specific token mappings
