import React from 'react';

import { KolAbbr, KolLinkButton } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';
export const AbbrFocusable: FC = () => (
	<>
		<SampleDescription>
			<p>KolAbbr can contain focusable elements in its slot, like buttons, links, or other interactive components.</p>
		</SampleDescription>

		<p>
			This abbreviation contains a <KolAbbr _label="clickable button abbreviation">Ich soll ein Tooltip</KolAbbr> in its slot.
		</p>

		<p>
			This abbreviation contains a{' '}
			<KolAbbr _label="hyperlink abbreviation">
				<KolLinkButton _label="API" _href="https://example.com" _target="blank" />
			</KolAbbr>{' '}
			in its slot.
		</p>

		<p>
			This abbreviation contains a{' '}
			<KolAbbr _label="input field abbreviation">
				<input type="text" placeholder="Input in abbr" />
			</KolAbbr>{' '}
			in its slot.
		</p>
	</>
);
