import React, { FC } from 'react';
import { KolKolibri } from '@public-ui/react';

export const KolibriNoLabel: FC = () => (
	<div style={{ width: 300 }}>
		<KolKolibri _labeled={false}></KolKolibri>
	</div>
);
