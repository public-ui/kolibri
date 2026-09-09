/**
 * Lets the sample apps switch the color scheme at runtime.
 *
 * There is nothing KoliBri specific about it: `color-scheme` is an inherited CSS property and
 * inheritance follows the flat tree, so setting it on `documentElement` reaches the page and every
 * component's shadow root alike. The themes declare no `color-scheme` of their own precisely so
 * that the application stays the single source of truth.
 *
 * `auto` removes the inline property again and lets the host app's own `:root { color-scheme: light
 * dark }` apply, which is what hands the decision to the operating system. The
 * `data-kol-color-scheme` attribute is set alongside it: it makes the state visible in the DOM and
 * matches the selectors in `@public-ui/theme-default/color-scheme.css`. That stylesheet is not
 * loaded here — the visual-test host has to stay theme agnostic and the presentation app offers six
 * themes — so the inline property is what actually does the work.
 *
 * See `hooks/useColorScheme` for the URL parameter and the persistence.
 */

const COLOR_SCHEME_PREFERENCES = ['auto', 'light', 'dark'] as const;
export type ColorSchemePreference = (typeof COLOR_SCHEME_PREFERENCES)[number];

const ROOT_ATTRIBUTE = 'data-kol-color-scheme';
const STORAGE_KEY = 'public-ui.sample.color-scheme';

export function isColorSchemePreference(value: unknown): value is ColorSchemePreference {
	return typeof value === 'string' && (COLOR_SCHEME_PREFERENCES as readonly string[]).includes(value);
}

export function applyColorScheme(preference: ColorSchemePreference, persist = true): void {
	const { documentElement } = document;
	if (preference === 'auto') {
		documentElement.removeAttribute(ROOT_ATTRIBUTE);
		documentElement.style.removeProperty('color-scheme');
	} else {
		documentElement.setAttribute(ROOT_ATTRIBUTE, preference);
		documentElement.style.setProperty('color-scheme', preference);
	}
	if (persist) {
		try {
			localStorage.setItem(STORAGE_KEY, preference);
		} catch {
			// Storage can be unavailable (private mode, blocked cookies) – the choice just won't be remembered.
		}
	}
}

export function readStoredColorScheme(): ColorSchemePreference {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return isColorSchemePreference(stored) ? stored : 'auto';
	} catch {
		return 'auto';
	}
}
