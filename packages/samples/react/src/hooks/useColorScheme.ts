import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { applyColorScheme, isColorSchemePreference, readStoredColorScheme } from '../shares/colorScheme';

import type { ColorSchemePreference } from '../shares/colorScheme';

const SEARCH_PARAM = 'colorScheme';

/**
 * Makes the KoliBri color scheme (see `shares/colorScheme`) switchable at runtime:
 * - `?colorScheme=dark` opens a route in dark mode right away – combinable with `?hideMenus`,
 * - the Sidebar's select changes it without a reload and remembers the choice for the next visit.
 *
 * Without the URL parameter the remembered choice applies; the parameter always wins.
 */
export const useColorScheme = (): [ColorSchemePreference, (preference: ColorSchemePreference) => void] => {
	const [searchParams] = useSearchParams();
	const param = searchParams.get(SEARCH_PARAM);
	const [preference, setPreferenceState] = useState<ColorSchemePreference>(() => (isColorSchemePreference(param) ? param : readStoredColorScheme()));

	useEffect(() => {
		const next = isColorSchemePreference(param) ? param : readStoredColorScheme();
		setPreferenceState(next);
		/* The URL wins over the stored value but must not overwrite it – reading a link should not
		   change what the next visit without a parameter shows. */
		applyColorScheme(next, false);
	}, [param]);

	const setPreference = useCallback((next: ColorSchemePreference) => {
		setPreferenceState((current) => {
			/* KolSelect emits onChange once while mounting. Applying the value that is already active
			   has to stay a no-op, otherwise that initial event would persist a preference the user
			   never chose. */
			if (current === next) {
				return current;
			}
			applyColorScheme(next);
			return next;
		});
	}, []);

	return [preference, setPreference];
};
