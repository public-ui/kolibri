# Known Issue: ARIA element references are not announced by VoiceOver

## Scope

Two KoliBri features cross the Shadow DOM boundary with ARIA element reflection (the `*Elements`
properties of the ARIAMixin, e.g. `ariaDetailsElements`) instead of plain IDREF attributes, because
IDREFs cannot cross the boundary:

- `_ariaLabelledby` of `kol-table-stateful`/`kol-table-stateless`
- `_ariaDetails` of the form fields (input-*, select, textarea, combobox, single-select)

## Known issue

**VoiceOver (macOS, reading through Safari/WebKit) does not announce the referenced content — and
per our control experiment the same applies to a pure native implementation, not only to KoliBri
components.** The DOM API itself is present in WebKit (element reflection shipped in Safari 16.4),
but the announcement of the relations does not reach the user.

Verified on 2026-10-27 with the native reference implementations of the sample: a vanilla web
component with a shadow root whose inner native `<input>` carries the external element references
via `ariaDetailsElements` is as silent as the KoliBri fields. The plain native input with an
`aria-details` IDREF in the same tree is the control case separating KoliBri gaps from platform
gaps.

**Fallback:** Keep using `_label` (visible label/caption) and `_hint` — those work with every
screen reader. Verify element-reference relations with NVDA or JAWS on Chromium, where the
references are followed.

## How to reproduce

Sample app route **`input-text/aria-details`** (mounted via `packages/samples/presentation`,
`pnpm dev`). It stacks the control group from native to KoliBri:

1. Plain native `<input aria-details="…">` — IDREF resolves in the same tree.
2. `demo-input-light` — native web component without a shadow root.
3. `demo-input-shadow` — native web component whose shadow input bridges external elements via
   `ariaDetailsElements` (same mechanism as KoliBri, implemented in
   `packages/samples/react/src/@shared/demo-input-wc.ts`).
4. The KoliBri form fields with `_ariaDetails`.

The table feature has an equivalent stack in route `table/aria-labelledby`.

If case 3 is silent in a screen reader while case 1 announces, the platform does not (yet) map
element references — no web component implementation can announce it there. If case 3 announces
while the KoliBri fields do not, the gap is in KoliBri and should be reported against this
repository.

## Vendor status and issues

- Chromium implements element reflection
  ([Chromium issue 41469336](https://issues.chromium.org/issues/41469336)); NVDA and JAWS on
  Chromium follow the references.
- WebKit ships the API since Safari 16.4, tracked via
  [WebKit bug 179723](https://bugs.webkit.org/show_bug.cgi?id=179723) and
  [WebKit bug 233594](https://bugs.webkit.org/show_bug.cgi?format=multiple&id=233594); VoiceOver's
  announcement of element references (in particular cross-root) does not work — no dedicated
  WebKit ticket for the announcement gap was found as of 2026-10-27.
- Firefox implemented the API in bug
  [1769586](https://bugzilla.mozilla.org/show_bug.cgi?id=1769586) (shipped in Firefox 136).
- Browser compatibility overview:
  [MDN — Element: ariaLabelledByElements](https://developer.mozilla.org/en-US/docs/Web/API/Element/ariaLabelledByElements).
- `aria-details` in general is "not always announced by all screen readers"; it is historically
  announced reliably only by JAWS (and newer NVDA versions).

The standards-track effort to solve cross-root ARIA associations beyond element reflection is the
[Reference Target proposal](https://github.com/WICG/webcomponents/issues/1111), grown out of the
[TPAC 2023 cross-shadow ARIA breakout](https://github.com/w3c/tpac2023-breakouts/issues/14) and the
[Igalia cross-shadow IDREF discussion](https://github.com/Igalia/webengineshackfest/issues/10).
