import type { CollapsibleCallbacksPropType } from '../../../schema';
import { dispatchDomEvent, KolEvent } from '../../../utils/events';

/**
 * Delay between flipping `_open` and announcing the new state.
 *
 * `_open` is declared `@Prop({ mutable: true, reflect: true })`, and Stencil writes the reflected
 * attribute asynchronously. Announcing synchronously would let a consumer callback read a stale
 * `_open` attribute off the host, so the announcement is deferred by one macrotask window.
 */
const ANNOUNCE_DELAY_MS = 25;

export type CollapsibleToggleContext = {
	/** The host element the DOM events are dispatched on. */
	getHost: () => HTMLElement | undefined;
	/** The normalized `_on` render prop. Read at announce time so late assignments are picked up. */
	getOn: () => CollapsibleCallbacksPropType<boolean>;
	/** Whether the collapsible currently refuses interaction. */
	isDisabled: () => boolean;
	/** The current normalized open state. */
	isOpen: () => boolean;
	/** Writes the component's mutable `_open` prop, which its watcher turns into rendered state. */
	setOpen: (open: boolean) => void;
};

/**
 * Builds the `<summary>` click handler shared by `kol-accordion` and `kol-details`.
 *
 * The user agent's own toggle is suppressed: it flips `open` synchronously, which skips the
 * collapse transition and races the component's controlled state. Everything else follows the
 * native element — `<summary>` is still the focusable control, and Enter/Space arrive here as
 * clicks, so keyboard operation needs no extra handling.
 *
 * The new state is captured synchronously, before the deferred announcement, so two quick toggles
 * report their own value rather than the same final one twice.
 */
export function createCollapsibleToggleHandler({ getHost, getOn, isDisabled, isOpen, setOpen }: CollapsibleToggleContext): (event: MouseEvent) => void {
	return (event: MouseEvent): void => {
		event.preventDefault();

		if (isDisabled()) {
			return;
		}

		const open = !isOpen();
		setOpen(open);

		setTimeout(() => {
			const host = getHost();
			if (host) {
				dispatchDomEvent(host, KolEvent.click, open);
				dispatchDomEvent(host, KolEvent.toggle, open);
			}

			const on = getOn();
			on.onClick?.(event, open);
			on.onToggle?.(event, open);
		}, ANNOUNCE_DELAY_MS);
	};
}
