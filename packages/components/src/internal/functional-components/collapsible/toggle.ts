import type { CollapsibleCallbacksPropType } from '../../../schema';
import { dispatchDomEvent, KolEvent } from '../../../utils/events';

/**
 * Delay between flipping `_open` and announcing the new state.
 *
 * `_open` is declared `@Prop({ mutable: true, reflect: true })`, and Stencil writes the reflected
 * attribute asynchronously. Announcing synchronously would let a consumer callback read a stale
 * `_open` attribute off the host, so the announcement is deferred by one macrotask window.
 */
const TOGGLE_ANNOUNCE_DELAY = 25;

export type CollapsibleToggleContext = {
	/** The host element the DOM events are dispatched on. */
	getHost: () => HTMLElement | undefined;
	/** The normalized `_on` render prop. Read at announce time so late assignments are picked up. */
	getOn: () => CollapsibleCallbacksPropType<boolean>;
	/** Flips the component's `_open` prop and returns the new state. */
	toggleOpen: () => boolean;
};

/**
 * Builds the heading-button click handler shared by `kol-accordion` and `kol-details`.
 *
 * Both components expose the same toggle contract: flip `_open`, then announce the new state via
 * the `click`/`toggle` DOM events and the `onClick`/`onToggle` callbacks. Before the collapsible
 * consolidation the two implementations had drifted apart in delay, ordering, event set and
 * de-duplication; this is the unified behaviour.
 *
 * The new state is captured **synchronously**, before the deferred announcement. Reading `_open`
 * inside the timeout instead — as both predecessors did — made two quick toggles report the same
 * final value twice; capturing up front gives each interaction its own correct value.
 */
export function createCollapsibleToggleHandler({ getHost, getOn, toggleOpen }: CollapsibleToggleContext): (event: MouseEvent) => void {
	return (event: MouseEvent): void => {
		const open = toggleOpen();

		setTimeout(() => {
			const host = getHost();
			if (host) {
				dispatchDomEvent(host, KolEvent.click, open);
				dispatchDomEvent(host, KolEvent.toggle, open);
			}

			const on = getOn();
			on.onClick?.(event, open);
			on.onToggle?.(event, open);
		}, TOGGLE_ANNOUNCE_DELAY);
	};
}
