import type { CollapsibleCallbacksPropType } from '../../../schema';
import { dispatchDomEvent, KolEvent } from '../../../utils/events';

/**
 * Duration of the collapse transition.
 *
 * Coupled to `grid-template-rows 0.3s` in `components/@shared/_collapsible.mixin.scss`: the `open`
 * attribute must stay on `<details>` until the transition has finished, otherwise the user agent
 * hides the content mid-collapse and the animation is cut short. Keep both in sync.
 */
const COLLAPSE_TRANSITION_MS = 300;

/**
 * Delay between flipping `_open` and announcing the new state.
 *
 * `_open` is declared `@Prop({ mutable: true, reflect: true })`, and Stencil writes the reflected
 * attribute asynchronously. Announcing synchronously would let a consumer callback read a stale
 * `_open` attribute off the host, so the announcement is deferred by one macrotask window.
 */
const ANNOUNCE_DELAY_MS = 25;

/** Runs `callback` on the next frame, falling back to a macrotask where rAF is unavailable (SSR). */
function onNextFrame(callback: () => void): () => void {
	if (typeof requestAnimationFrame === 'function') {
		const handle = requestAnimationFrame(callback);
		return () => cancelAnimationFrame(handle);
	}
	const handle = setTimeout(callback, 0);
	return () => clearTimeout(handle);
}

export type CollapsibleDisclosureContext = {
	/** Sets the `open` attribute on `<details>`. */
	setDetailsOpen: (value: boolean) => void;
	/** Sets the `collapsible--open` class, which drives the transition. */
	setExpanded: (value: boolean) => void;
};

export type CollapsibleDisclosure = {
	/**
	 * Applies an open state to the two rendered flags.
	 *
	 * With `animate`, opening sets the `open` attribute first and the class one frame later — the
	 * content is `display:none` while `<details>` is closed, so without that gap the transition has
	 * no from-state and the panel snaps open. Collapsing does the reverse: the class goes first and
	 * the attribute is removed once the transition has run.
	 */
	syncOpen: (open: boolean, animate: boolean) => void;
	/** Cancels pending frames and timers. Call from `disconnectedCallback`. */
	dispose: () => void;
};

export function createCollapsibleDisclosure({ setDetailsOpen, setExpanded }: CollapsibleDisclosureContext): CollapsibleDisclosure {
	let cancelPendingFrame: (() => void) | undefined;
	let collapseTimeout: ReturnType<typeof setTimeout> | undefined;

	const clearPending = (): void => {
		cancelPendingFrame?.();
		cancelPendingFrame = undefined;
		clearTimeout(collapseTimeout);
		collapseTimeout = undefined;
	};

	return {
		syncOpen(open, animate) {
			clearPending();

			if (open) {
				setDetailsOpen(true);
				if (animate) {
					cancelPendingFrame = onNextFrame(() => setExpanded(true));
				} else {
					setExpanded(true);
				}
				return;
			}

			setExpanded(false);
			if (animate) {
				collapseTimeout = setTimeout(() => setDetailsOpen(false), COLLAPSE_TRANSITION_MS);
			} else {
				setDetailsOpen(false);
			}
		},
		dispose: clearPending,
	};
}

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
