const PREVIOUS_KEYS = new Set(['ArrowLeft', 'ArrowUp']);
const NEXT_KEYS = new Set(['ArrowDown', 'ArrowRight']);

const isInactive = (radio: HTMLInputElement): boolean => radio.getAttribute('aria-disabled') === 'true';

/**
 * Arrow key navigation for a radio group whose options may be marked with `aria-disabled`.
 *
 * The browser moves through a native radio group and checks every option it reaches, including
 * options that are only `aria-disabled`. This handler replaces that behaviour: it moves focus to
 * the previous or next option (disabled options included, so they stay reachable) and checks the
 * option through a click only when it is active, which fires the regular input and change events.
 *
 * @returns `true` when the key was an arrow key and has been handled.
 */
export function handleRadioGroupArrowKey(event: KeyboardEvent, radios: HTMLInputElement[]): boolean {
	const step = PREVIOUS_KEYS.has(event.key) ? -1 : NEXT_KEYS.has(event.key) ? 1 : 0;
	if (step === 0) {
		return false;
	}

	event.preventDefault();
	const current = radios.indexOf(event.target as HTMLInputElement);
	if (radios.length === 0 || current === -1) {
		return true;
	}

	const next = radios[(current + step + radios.length) % radios.length];
	next.focus();
	if (!isInactive(next)) {
		next.click();
	}
	return true;
}
