/**
 * Lets the sample apps switch the KoliBri color scheme at runtime.
 *
 * `@public-ui/theme-default` reads `color-scheme: var(--kolibri-color-scheme, light dark)` on the
 * `:host` of every component. Left unset, the fallback hands the decision to the operating system;
 * setting the custom property takes it back, because custom properties inherit across the shadow
 * boundary. `auto` therefore means "remove the property again", not "some third value".
 *
 * The `data-kol-color-scheme` attribute is the one the theme documents, and
 * `@public-ui/theme-default/color-scheme.css` maps it onto the two properties set inline below. That
 * stylesheet is deliberately not loaded here: the visual-test host app must stay theme agnostic, and
 * the presentation app offers six themes of which only one owns that file. Setting the properties
 * directly keeps the switch working in both hosts and for every theme.
 *
 * See `hooks/useColorScheme` for the URL parameter and the persistence.
 */

const COLOR_SCHEME_PREFERENCES = ['auto', 'light', 'dark'] as const;
export type ColorSchemePreference = (typeof COLOR_SCHEME_PREFERENCES)[number];

const ROOT_ATTRIBUTE = 'data-kol-color-scheme';
const CUSTOM_PROPERTY = '--kolibri-color-scheme';
const STORAGE_KEY = 'public-ui.sample.color-scheme';

export function isColorSchemePreference(value: unknown): value is ColorSchemePreference {
	return typeof value === 'string' && (COLOR_SCHEME_PREFERENCES as readonly string[]).includes(value);
}

export function applyColorScheme(preference: ColorSchemePreference, persist = true): void {
	const { documentElement } = document;
	if (preference === 'auto') {
		documentElement.removeAttribute(ROOT_ATTRIBUTE);
		documentElement.style.removeProperty(CUSTOM_PROPERTY);
		documentElement.style.removeProperty('color-scheme');
	} else {
		documentElement.setAttribute(ROOT_ATTRIBUTE, preference);
		documentElement.style.setProperty(CUSTOM_PROPERTY, preference);
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
