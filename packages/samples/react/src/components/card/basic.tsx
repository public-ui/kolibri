import React from 'react';
import { KolCard } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const CardBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolCard shows a card with title and slot content. The second sample features a close button.</p>
		</SampleDescription>

		<KolCard _heading="Titel" _hasFooter>
			<div slot="header">Zusätzlicher Header</div>
			<div slot="content">Inhalt</div>
			<div slot="footer">Fusszeile</div>
		</KolCard>
	</>
);
