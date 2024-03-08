import React, { useState } from 'react';

import { KolInputCheckbox, KolNav } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { LINKS } from './links';

import type { FC } from 'react';
export const NavBasic: FC = () => {
	const [hasIconsWhenExpanded, setHasIconsWhenExpanded] = useState(false);

	return (
		<>
			<SampleDescription>
				<p>
					Hier ist ein Beispiel für eine Navigation. Durch anklicken des rechten + Symbols kann die Navigation erweitert und Untermenüs geöffnet werden. Durch
					das anklicken des {'<'} Symbols kann die Navigation minimiert werden.
				</p>
			</SampleDescription>
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
