import React, { useState } from 'react';

import { KolInputCheckbox, KolNav } from '@public-ui/react';

import { LINKS } from './links';

import type { FC } from 'react';
export const NavBasic: FC = () => {
	const [hasIconsWhenExpanded, setHasIconsWhenExpanded] = useState(false);

	return (
		<>
			<KolInputCheckbox
				_label="Show icons when expanded"
				_checked={hasIconsWhenExpanded}
				_on={{
					onChange: (_event, value: unknown) => {
						setHasIconsWhenExpanded(value as boolean);
					},
				}}
			></KolInputCheckbox>
			<KolNav class="block w-fit" _label="Main navigation" _links={LINKS} _hasCompactButton _hasIconsWhenExpanded={hasIconsWhenExpanded} />
		</>
	);
};
