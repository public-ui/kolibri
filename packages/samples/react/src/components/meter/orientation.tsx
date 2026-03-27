import { KolHeading, KolMeter } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const MeterOrientation: FC = () => (
	<>
		<SampleDescription>
			<p>
				The _orientation prop switches the meter bar between horizontal (default) and vertical. Vertical meters grow from bottom to top and are useful for tank
				fill levels, signal strength or similar scalar indicators.
			</p>
		</SampleDescription>

		<div className="grid gap-8">
			<section className="grid gap-4">
				<KolHeading _level={2} _label="Horizontal (default)" />
				<div className="flex flex-col gap-4">
					<KolMeter _label="Storage" _max={100} _value={25} />
					<KolMeter _label="Storage" _max={100} _value={60} />
					<KolMeter _label="Storage" _max={100} _value={90} />
				</div>
			</section>

			<section className="grid gap-4">
				<KolHeading _level={2} _label="Vertical" />
				<div className="flex flex-row gap-8 items-end">
					<KolMeter style={{ '--kol-meter-height': '100px' }} _label="Tank A" _max={100} _value={25} _orientation="vertical" />
					<KolMeter style={{ '--kol-meter-height': '150px' }} _label="Tank B" _max={100} _value={60} _orientation="vertical" />
					<KolMeter style={{ '--kol-meter-height': '200px' }} _label="Tank C" _max={100} _value={90} _orientation="vertical" />
				</div>
			</section>

			<section className="grid gap-4">
				<KolHeading _level={2} _label="Vertical with ranges and optimum" />
				<div className="flex flex-row gap-8">
					<KolMeter _label="Low" _max={100} _value={10} _low={25} _high={75} _optimum={50} _orientation="vertical" />
					<KolMeter _label="OK" _max={100} _value={50} _low={25} _high={75} _optimum={50} _orientation="vertical" />
					<KolMeter _label="High" _max={100} _value={90} _low={25} _high={75} _optimum={50} _orientation="vertical" />
				</div>
			</section>
		</div>
	</>
);
