import { KolHeading, KolMeter } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const MeterUnit: FC = () => (
	<>
		<SampleDescription>
			<p>The _unit prop customizes the unit label displayed alongside the value. It defaults to &quot;%&quot;.</p>
		</SampleDescription>

		<div className="grid gap-8">
			<section className="grid gap-4">
				<KolHeading _level={2} _label="Default unit (%)" />
				<KolMeter _label="Battery" _max={100} _value={73} />
			</section>

			<section className="grid gap-4">
				<KolHeading _level={2} _label="Custom units" />
				<div className="flex flex-col gap-4">
					<KolMeter _label="Weight" _max={150} _value={82} _unit="kg" />
					<KolMeter _label="Temperature" _max={100} _value={37} _unit="°C" />
					<KolMeter _label="Distance" _max={42195} _value={21000} _unit="m" />
					<KolMeter _label="Tasks completed" _max={12} _value={8} _unit="tasks" />
				</div>
			</section>
		</div>
	</>
);
