import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

import { readStoredVisualBlockOutline, setVisualBlockOutline, toggleVisualBlockOutline } from '../shares/visualBlockOutline';

const SEARCH_PARAM = 'visualBlocks';
const DISABLED_VALUES = ['0', 'false', 'off'];

/**
 * Makes the `data-visual-block` outline (see `shares/visualBlockOutline`) switchable at runtime:
 * - `?visualBlocks` enables it for the current URL, `?visualBlocks=0` disables it – combinable with `?hideMenus`,
 * - `Ctrl+Alt+B` toggles it without a reload and remembers the choice for the next visit.
 *
 * Without the URL parameter the remembered choice applies; the parameter always wins.
 */
export const useVisualBlockOutline = () => {
	const [searchParams] = useSearchParams();
	const param = searchParams.get(SEARCH_PARAM);

	useEffect(() => {
		if (param === null) {
			setVisualBlockOutline(readStoredVisualBlockOutline(), false);
		} else {
			setVisualBlockOutline(!DISABLED_VALUES.includes(param.toLowerCase()), false);
		}
	}, [param]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.altKey && !event.shiftKey && event.key.toLowerCase() === 'b') {
				event.preventDefault();
				toggleVisualBlockOutline();
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, []);
};
