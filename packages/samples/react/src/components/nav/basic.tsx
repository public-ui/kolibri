import React, { useState } from 'react';

import { KolHeading, KolInputCheckbox, KolNav } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { LINKS, LINKS_WITHOUT_SUBMENU } from './links';

import type { FC } from 'react';
export const NavBasic: FC = () => {
	const [hasIconsWhenExpanded, setHasIconsWhenExpanded] = useState(false);

	return (
		<>
			<SampleDescription>
				<p>
					KolNav renders a navigation. In this sample, icons for the navigation elements can be shown or hidden using a checkbox and the navigation can be
					collapsed, showing only icons and no text labels.
				</p>
			</SampleDescription>

			<section className="grid gap-8">
				<section>
					<KolInputCheckbox
						_label="Show icons when expanded"
						_checked={hasIconsWhenExpanded}
						_on={{
							onChange: (_event, value: unknown) => {
								setHasIconsWhenExpanded(value as boolean);
							},
						}}
					></KolInputCheckbox>
				</section>
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Navigation without submenu" />
					<KolNav class="block w-fit" _label="Main navigation" _links={LINKS_WITHOUT_SUBMENU} _hasCompactButton _hasIconsWhenExpanded={hasIconsWhenExpanded} />
				</section>
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Navigation with submenu" />
					<KolNav class="block w-fit" _label="Main navigation" _links={LINKS} _hasCompactButton _hasIconsWhenExpanded={hasIconsWhenExpanded} />
				</section>
			</section>
		</>
	);
};
