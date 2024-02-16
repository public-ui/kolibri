import React from 'react';

import { KolCard } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const CardBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Hier wird eine Card mit Titel und &apos;Inhalt&apos; angezeigt. Es gibt keine Interaktionsmöglichkeit.</p>
		</SampleDescription>
		<KolCard _label="Titel">
			<div slot="">Inhalt</div>
		</KolCard>
	</>
);
