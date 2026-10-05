/**
 * Shared validators for prop definitions.
 * Centralized here so custom-class and variant props share one regex
 * (avoids the SAFE_CLASS_NAME_RE duplication flagged in PR #10110).
 *
 * Why the minimum length is `{0,60}` (1–61 chars) and not the legacy variant-only `{3,60}`:
 * on develop the two props were validated differently — `_variant` used the strict regex,
 * `_customClass` had no regex at all (`watchString` accepted any string). Unifying them under
 * the strict regex would have silently REJECTED short custom-class values (e.g. `"abc"`) that
 * were valid on develop; the relaxed minimum is the lesser behavior change. The relaxation also
 * widens `_variant` (1–3 char variant names are now valid), which is accepted: no component
 * uses variant names that short through this definition. Note that multi-class values like
 * `"foo bar"` are rejected for `_customClass` (single safe class name only) — stricter than
 * develop's `watchString`, but consistent with `_variant` semantics. Pinned by tests in
 * `validators.spec.ts`.
 */
const SAFE_CLASS_NAME_RE = /^[a-zA-Z][a-zA-Z0-9_-]{0,60}$/;

export const isSafeClassName = (value: unknown): value is string => typeof value === 'string' && SAFE_CLASS_NAME_RE.test(value);
