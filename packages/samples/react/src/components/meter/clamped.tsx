import { KolMeter } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const MeterClamped: FC = () => (
	<>
		<SampleDescription>
			<p>
				A <code>_value</code> outside the range of <code>_min</code> and <code>_max</code> is clamped into it: a value above <code>_max</code> renders as{' '}
				<code>_max</code>, a value below <code>_min</code> as <code>_min</code>.
			</p>
		</SampleDescription>

		<div className="grid gap-8">
			<SampleBlock id="clamped" heading="Values outside the range">
				<div className="flex flex-col gap-4">
					<KolMeter _label="Value 140, maximum 100 (shows 100)" _max={100} _value={140} _unit="%" />
					<KolMeter _label="Value 60, range 0 to 100 (unchanged)" _max={100} _value={60} _unit="%" />
					<KolMeter _label="Value -20, minimum 0 (shows 0)" _min={0} _max={100} _value={-20} _unit="%" />
					<KolMeter _label="Value -40 °C, range -20 to 60 °C (shows -20 °C)" _min={-20} _max={60} _value={-40} _unit="°C" />
				</div>
			</SampleBlock>
		</div>
	</>
);
