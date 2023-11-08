import React from 'react';
import { KolCard } from '@public-ui/react';

import { FC } from 'react';

export const CardBasic: FC = () => (
	<KolCard _label="Titel">
		<div slot="">Inhalt</div>
	</KolCard>
);
