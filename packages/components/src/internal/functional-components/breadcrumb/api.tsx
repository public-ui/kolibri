import { breadcrumbLinksProp, labelWithExpertSlotProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';
import type { BreadcrumbLinkItem } from './link-item';

/**
 * Props configuration for the breadcrumb component.
 *
 * Both props are required. Notes on prop choices:
 * - `labelWithExpertSlotProp` (not `labelProp`): the predecessor's `validateLabel` accepted any
 *   string; `labelProp` would reject one-character labels, a validation regression. The same
 *   choice was made for the button and link migrations.
 * - `breadcrumbLinksProp`: `Stringified<BreadcrumbLinkProps[]>` in, parsed array out, with the
 *   legacy `watchNavLinks` item validation and the Millersche Zahl hint (>7 entries).
 */
export const breadcrumbPropsConfig = {
	required: [breadcrumbLinksProp, labelWithExpertSlotProp],
} as const satisfies PropsConfigShape;

export type BreadcrumbApi = ApiFromConfig<
	typeof breadcrumbPropsConfig,
	{
		States: {
			/**
			 * Orchestration records for the interactive links (everything `LinkFC` needs, built
			 * by `createBreadcrumbLinkItem`), rebuilt whenever `_links` changes and cloned on
			 * aria-current updates. The current-page span and the empty state read the raw
			 * `link` entry of each item.
			 */
			linkItems: BreadcrumbLinkItem[];
			/**
			 * Whether the last link renders as the current page (`aria-current="page"` span).
			 * Derived on every render pass in the web component from the `breadcrumbCurrentPage`
			 * feature flag (host-scoped lookup) — `false` when the flag is `'hide'`, `true`
			 * otherwise. Not a Stencil-reactive field by design: like the predecessor, flag
			 * changes only take effect on the next render.
			 */
			showCurrentPage: boolean;
		};
	}
>;
