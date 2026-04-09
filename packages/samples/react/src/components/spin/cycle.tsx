import React from 'react';

import { KolSpin } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const SpinCycle: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows the KolSpin variant &quot;cycle&quot; and that you can change its color and size.</p>
		</SampleDescription>

		<section className="grid gap-4">
			<KolSpin _show _variant="cycle" />

			<KolSpin _show _variant="cycle" style={{ '--kol-spin-color': 'green', '--kol-spin-size': '80' }} />
		</section>
	</>
);
