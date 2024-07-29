import React from 'react';
import { KolProgress } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const ProgressBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolProgress renders a progress indicator. The sample shows the variants &quot;bar&quot; and &quot;cycle&quot;.</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolProgress _variant="bar" _max={100} _value={33}></KolProgress>
			<KolProgress _variant="cycle" _max={100} _value={33}></KolProgress>
		</div>
	</>
);
