import React from 'react';

import { KolCard } from '@public-ui/react';

import type { FC } from 'react';

export const CardFlex: FC = () => (
	<div className="grid grid-cols-2 gap-4">
		<KolCard _label="Titel">
			<div>Inhalt</div>
		</KolCard>
		<KolCard _label="Titel" _hasCloser>
			<div>
				Inhalt
				<br />
				Inhalt
			</div>
		</KolCard>
		<KolCard _label="Titel">
			<div>
				Inhalt
				<br />
				Inhalt
				<br />
				Inhalt
			</div>
		</KolCard>
		<KolCard _label="Titel">
			<div>Inhalt</div>
		</KolCard>
		<KolCard _label="Titel">
			<div>Inhalt</div>
		</KolCard>
	</div>
);
