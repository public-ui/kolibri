import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';

import { applyColorScheme, isColorSchemePreference, persistColorScheme, readStoredColorScheme } from '../shares/colorScheme';

import type { ColorSchemePreference } from '../shares/colorScheme';

const SEARCH_PARAM = 'colorScheme';

/**
 * Makes the color scheme (see `shares/colorScheme`) switchable at runtime:
 * - `?colorScheme=dark` opens a route in dark mode right away – combinable with `?hideMenus`,
 * - the Sidebar's select changes it without a reload and remembers the choice for the next visit.
 *
 * Without the URL parameter the remembered choice applies; the parameter always wins.
 *
 * `supportsDark` says whether the active theme ships a dark palette. It does not: the scheme is
 * forced to light, because such a theme would otherwise render light components on a page that
 * follows the scheme. The remembered choice stays untouched and applies again as soon as a theme
 * with a dark palette is selected.
 *
 * Returns the scheme that is actually on the document, which is what the Sidebar's select shows.
 */
export const useColorScheme = (supportsDark: boolean): [ColorSchemePreference, (preference: ColorSchemePreference) => void] => {
	const [searchParams] = useSearchParams();
	const param = searchParams.get(SEARCH_PARAM);
	const [preference, setPreference] = useState<ColorSchemePreference>(() => (isColorSchemePreference(param) ? param : readStoredColorScheme()));

	useEffect(() => {
		/* The URL wins over the stored value but must not overwrite it – reading a link should not
		   change what the next visit without a parameter shows. */
		setPreference(isColorSchemePreference(param) ? param : readStoredColorScheme());
	}, [param]);

	const scheme: ColorSchemePreference = supportsDark ? preference : 'light';

	useEffect(() => {
		applyColorScheme(scheme);
	}, [scheme]);

	const schemeRef = useRef(scheme);
	schemeRef.current = scheme;

	const choose = useCallback((next: ColorSchemePreference) => {
		/* KolSelect emits onChange once while mounting, carrying the value it was given. Ignoring a
		   value that is already the active one keeps that echo from persisting a preference the user
		   never chose – which matters most while a theme without a dark palette forces light. */
		if (schemeRef.current === next) {
			return;
		}
		setPreference(next);
		persistColorScheme(next);
	}, []);

	return [scheme, choose];
};
