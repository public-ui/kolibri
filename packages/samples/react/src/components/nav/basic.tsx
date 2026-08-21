import React, { useState } from 'react';

import { KolInputCheckbox, KolNav } from '@public-ui/react-v19';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';
import { LINKS, LINKS_SUB_ACTIVE, LINKS_WITHOUT_SUBMENU } from './links';

import type { FC } from 'react';
export const NavBasic: FC = () => {
	const [hasIconsWhenExpanded, setHasIconsWhenExpanded] = useState(true);

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
				<SampleBlock id="navigation-submenu" heading="Navigation without submenu" fitContent>
					<KolNav
						class="block w-fit"
						_label="Navigation without submenu"
						_links={LINKS_WITHOUT_SUBMENU}
						_hasCompactButton
						_hasIconsWhenExpanded={hasIconsWhenExpanded}
					/>
				</SampleBlock>
				<SampleBlock id="navigation-submenu-2" heading="Navigation with submenu" fitContent>
					<KolNav class="block w-fit" _label="Navigation with submenu" _links={LINKS} _hasCompactButton _hasIconsWhenExpanded={hasIconsWhenExpanded} />
				</SampleBlock>
				<SampleBlock id="navigation-submenu-active" heading="Navigation with submenu active" fitContent>
					<KolNav
						class="block w-fit"
						_label="Navigation with submenu active"
						_links={LINKS_SUB_ACTIVE}
						_hasCompactButton
						_hasIconsWhenExpanded={hasIconsWhenExpanded}
					/>
				</SampleBlock>
			</section>
		</>
	);
};
