import React from 'react';
import { KolCard } from '@public-ui/react';

import { FC } from 'react';

export const CardFlex: FC = () => (
	<div className="grid grid-cols-2 gap-4">
		<KolCard _label="Titel" _hasFooter>
			<div>Inhalt</div>
		</KolCard>
		<KolCard _label="Titel" _hasFooter>
			<div>
				Inhalt
				<br />
				Inhalt
			</div>
		</KolCard>
		<KolCard _label="Titel" _hasFooter>
			<div>
				Inhalt
				<br />
				Inhalt
				<br />
				Inhalt
			</div>
		</KolCard>
		<KolCard _label="Titel" _hasFooter>
			<div>Inhalt</div>
		</KolCard>
		<KolCard _label="Titel" _hasFooter>
			<div>Inhalt</div>
		</KolCard>
	</div>
);
