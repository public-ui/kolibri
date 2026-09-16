import { labelWithExpertSlotProp, skipNavLinksProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';
import type { SkipNavLinkItem } from './link-item';

/**
 * Props configuration for the skip-nav component.
 *
 * Both props are required. Notes on prop choices:
 * - `labelWithExpertSlotProp` (not `labelProp`): the predecessor's `validateLabel` accepted any
 *   string; `labelProp` would reject one-character labels, a validation regression.
 * - `skipNavLinksProp`: `Stringified<LinkProps[]>` in, parsed array out, with the legacy
 *   `watchNavLinks` item validation and the Millersche Zahl hint (>7 entries).
 */
export const skipNavPropsConfig = {
	required: [skipNavLinksProp, labelWithExpertSlotProp],
} as const satisfies PropsConfigShape;

export type SkipNavApi = ApiFromConfig<
	typeof skipNavPropsConfig,
	{
		States: {
			/**
			 * Orchestration records for the skip links (everything `LinkFC` needs, built by
			 * `createSkipNavLinkItem`), rebuilt whenever `_links` changes.
			 */
			linkItems: SkipNavLinkItem[];
		};
	}
>;
