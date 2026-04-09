import React from 'react';

import { KolSpin } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const SpinBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolSpin renders a loading indicator. This sample shows the default variant &quot;dot&quot; and that you can change its color and size.</p>
		</SampleDescription>

		<section className="grid gap-4">
			<KolSpin _show />

			<KolSpin _show style={{ '--kol-spin-color': 'green', '--kol-spin-size': '80' }} />
		</section>
	</>
);
