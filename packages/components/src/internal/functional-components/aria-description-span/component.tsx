import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

type AriaDescriptionSpanFCProps = {
	/**
	 * The (already trimmed) description text. Falsy renders nothing — the description is
	 * optional, and an empty `aria-describedby` target would be pointless.
	 */
	description: string | undefined;
	/**
	 * The id referenced by the interactive element's `aria-describedby`.
	 */
	descriptionId: string;
};

/**
 * Visually-hidden `aria-describedby` target, shared by `ButtonFC` and `LinkFC`.
 *
 * Must be a sibling of the interactive element, not a child of it — the description is
 * referenced from outside via `aria-describedby`, not folded into the accessible name.
 */
export const AriaDescriptionSpanFC: FC<AriaDescriptionSpanFCProps> = ({ description, descriptionId }) =>
	description ? (
		<span class="visually-hidden" id={descriptionId}>
			{description}
		</span>
	) : null;
