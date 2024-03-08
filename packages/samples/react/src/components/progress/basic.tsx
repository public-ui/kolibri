import React from 'react';

import { KolProgress } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const ProgressBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Hier ist ein Fortschrittsbalken und Fortschrittskreis. Der Fortschritt verändert sich nicht.</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolProgress _variant="bar" _max={100} _value={33}></KolProgress>
			<KolProgress _variant="cycle" _max={100} _value={33}></KolProgress>
		</div>
	</>
);
