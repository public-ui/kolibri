import React from 'react';

import { KolCard } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const CardFlex: FC = () => (
	<>
		<SampleDescription>
			<p>
				Hier werden mehrere Karten mit unterschiedlichen Inhalten angezeigt. Beim anklicken des &apos;x&apos; wird ein Label mit &apos;Schließen&apos;
				angezeigt.
			</p>
		</SampleDescription>
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
	</>
);
