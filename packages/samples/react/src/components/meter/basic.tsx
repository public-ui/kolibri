import { KolHeading, KolMeter } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const MeterBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolMeter renders a semantic meter element. You can use _min (default 0), _max (default 1) and _unit (default %) to customize it.</p>
		</SampleDescription>

		<div className="grid gap-8">
			<section className="grid gap-4">
				<KolHeading _level={2} _label="Basic" />
				<div className="flex flex-col gap-4">
					<KolMeter _label="Progress" _value={0.5} />
					<KolMeter _label="Weight" _max={100} _value={75} _unit="kg" />
					<KolMeter _label="Temperature" _min={-100} _max={100} _value={-50} _unit="°C" />
				</div>
			</section>
		</div>
	</>
);
