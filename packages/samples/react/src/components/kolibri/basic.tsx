import type { FC } from 'react';
import React from 'react';

import { KolHeading, KolKolibri } from '@public-ui/react';

import { SampleDescription } from '../SampleDescription';

export const KolibriBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolKolibri render the KoliBri logo. The sample show the logo with and without label and with a custom color.</p>
		</SampleDescription>

		<KolHeading class="block" _level={3} _label="Regular" />
		<KolKolibri class="block" style={{ width: 300 }} />
		<KolHeading class="block" _level={3} _label="Without Label" />
		<KolKolibri class="block" style={{ width: 300 }} _labeled={false} />
		<KolHeading class="block" _level={3} _label="Customized color" />
		<KolKolibri class="block" style={{ width: 300 }} _color="#cc006e" />
	</>
);
