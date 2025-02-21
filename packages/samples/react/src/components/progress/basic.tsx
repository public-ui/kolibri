import React from 'react';

import { KolProgress } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const ProgressBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolProgress renders a progress indicator. The sample shows the variants &quot;bar&quot; and &quot;cycle&quot; with and without labels.</p>
		</SampleDescription>

		<div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
			<fieldset title='Percentages' className='flex flex-col gap-4'>
				<KolProgress _variant="bar" _max={100} _value={0} ></KolProgress>
				<KolProgress _variant="bar" _max={100} _value={17} ></KolProgress>
				<KolProgress _variant="bar" _max={100} _value={100} ></KolProgress>
				<KolProgress _variant="cycle" _max={100} _value={85}></KolProgress>
			</fieldset>
			<fieldset title='Custom units' className='flex flex-col gap-4'>
				<KolProgress _label='Distance' _variant="bar" _max={65434} _value={7236} _unit='m'></KolProgress>
				<KolProgress _label='12 Tasks to do' _variant="bar" _max={12} _value={5} _unit='tasks completed'></KolProgress>
				<KolProgress _label='Max 150 kg' _variant="cycle" _max={150} _value={134} _unit='kg'></KolProgress>
			</fieldset>
		</div>
	</>
);
