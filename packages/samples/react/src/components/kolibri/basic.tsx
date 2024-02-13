import type { FC } from 'react';
import React from 'react';

import { KolHeading, KolKolibri } from '@public-ui/react';

import { SampleDescription } from '../SampleDescription';

export const KolibriBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Das KoliBri-Logo in verschiedenen Varianten</p>
		</SampleDescription>

		<KolHeading class="block" _level={3} _label="Regular" />
		<KolKolibri class="block" style={{ width: 300 }} />
		<KolHeading class="block" _level={3} _label="Ohne Label" />
		<KolKolibri class="block" style={{ width: 300 }} _labeled={false} />
		<KolHeading class="block" _level={3} _label="Individuelle Farbe" />
		<KolKolibri class="block" style={{ width: 300 }} _color="#cc006e" />
	</>
);
