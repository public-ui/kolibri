import React from 'react';
import { KolCard } from '@public-ui/react';

import { FC } from 'react';

export const CardBasic: FC = () => (
	<KolCard _label="Titel" _hasFooter>
		<div data-removed-slot="header">Zusätzlicher Header</div>
		<div slot="">Inhalt</div>
		<div data-removed-slot="footer">Fusszeile</div>
	</KolCard>
);
