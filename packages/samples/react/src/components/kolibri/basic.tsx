import React, { FC } from 'react';
import { KolHeading, KolKolibri } from '@public-ui/react';

export const KolibriBasic: FC = () => (
	<>
		<KolHeading class="block" _level={3} _label="Regular" />
		<KolKolibri class="block" style={{ width: 300 }} />
		<KolHeading class="block" _level={3} _label="Ohne Label" />
		<KolKolibri class="block" style={{ width: 300 }} _labeled={false} />
		<KolHeading class="block" _level={3} _label="Individuelle Farbe" />
		<KolKolibri class="block" style={{ width: 300 }} _color="#cc006e" />
	</>
);
