/**
 * Shared validators for prop definitions.
 * Centralized here so custom-class and variant props share one regex
 * (avoids the SAFE_CLASS_NAME_RE duplication flagged in PR #10110).
 */
const SAFE_CLASS_NAME_RE = /^[a-zA-Z][a-zA-Z0-9_-]{0,60}$/;

export const isSafeClassName = (value: unknown): value is string => typeof value === 'string' && SAFE_CLASS_NAME_RE.test(value);
