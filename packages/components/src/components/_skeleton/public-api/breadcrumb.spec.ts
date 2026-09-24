import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-breadcrumb` — byte-identical to the predecessor on the develop branch
 * (2 required props, no methods).
 */
const KOL_BREADCRUMB_PUBLIC_API: PublicApiContract = {
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_links: {
		kind: 'prop',
		type: 'Stringified<BreadcrumbLinkProps[]>',
		required: true,
		doc: 'Defines the list of links combined with their labels to render.',
	},
};

describePublicApiContract({ tag: 'kol-breadcrumb', component: 'breadcrumb', pinnedApi: KOL_BREADCRUMB_PUBLIC_API, schemaInterface: 'BreadcrumbProps' });
