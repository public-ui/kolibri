import { labelProp, skipNavLinksProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';
import type { SkipNavLinkItem } from './link-item';

/**
 * Props configuration for the skip-nav component.
 *
 * Both props are required. Notes on prop choices:
 * - `skipNavLinksProp`: `Stringified<LinkProps[]>` in, parsed array out, every entry
 *   an object with a string `_href` or `_label`, and the Millersche Zahl hint (>7 entries).
 */
export const skipNavPropsConfig = {
	required: [skipNavLinksProp, labelProp],
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
