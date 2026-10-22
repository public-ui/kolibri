import React from 'react';

import { KolBreadcrumb } from '@public-ui/react-v19';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

const LINKS_AS_JSON = JSON.stringify([
	{ _label: 'Homepage', _icons: 'kolicon-house', _hideLabel: true, _href: '#/back-page' },
	{ _label: 'Services', _href: '#/back-page' },
	{ _label: 'Apply for a permit', _href: '#/back-page' },
]);

export const BreadcrumbJsonLinks: FC = () => (
	<>
		<SampleDescription>
			<p>
				The <code>_links</code> of KolBreadcrumb can also be passed as JSON string, e.g. through an HTML attribute; the result is the same as with an array.
				Every entry needs an <code>_href</code>, and an entry with <code>_hideLabel</code> shows only its icon.
			</p>
		</SampleDescription>

		<SampleBlock id="json-links" narrow>
			<KolBreadcrumb _label="Breadcrumb from a JSON string" _links={LINKS_AS_JSON}></KolBreadcrumb>
		</SampleBlock>
	</>
);
