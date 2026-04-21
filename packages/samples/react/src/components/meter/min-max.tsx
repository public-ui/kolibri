import { KolHeading, KolMeter } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const MeterMinMax: FC = () => (
	<>
		<SampleDescription>
			<p>
				The _min prop defines the lower boundary of the measured range (default 0). Combined with _max it defines the full scale. The _value must lie within
				this range.
			</p>
		</SampleDescription>

		<div className="grid gap-8">
			<section className="grid gap-4">
				<KolHeading _level={2} _label="Default min (0)" />
				<div className="flex flex-col gap-4">
					<KolMeter _label="Progress" _max={10} _value={0} />
					<KolMeter _label="Progress" _max={10} _value={5} />
					<KolMeter _label="Progress" _max={10} _value={10} />
				</div>
			</section>

			<section className="grid gap-4">
				<KolHeading _level={2} _label="Custom min" />
				<div className="flex flex-col gap-4">
					<KolMeter _label="pH value" _min={0} _max={14} _value={7} _unit="pH" />
					<KolMeter _label="Temperature range" _min={-20} _max={40} _value={-10} _unit="°C" />
					<KolMeter _label="Temperature range" _min={-20} _max={40} _value={-15} _unit="°C" />
				</div>
			</section>
		</div>
	</>
);
