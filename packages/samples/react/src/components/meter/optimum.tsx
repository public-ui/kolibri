import { KolHeading, KolMeter } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const MeterOptimum: FC = () => (
	<>
		<SampleDescription>
			<p>
				The _optimum prop indicates the preferred value. Combined with _low and _high, the browser uses it to determine whether the current value is in a good,
				acceptable or bad zone – which affects the semantic coloring.
			</p>
		</SampleDescription>

		<div className="grid gap-8">
			<section className="grid gap-4">
				<KolHeading _level={2} _label="Optimum in medium zone (good = medium)" />
				<div className="flex flex-col gap-4">
					<KolMeter _label="Temperature is nice" _min={-20} _max={60} _low={10} _high={30} _optimum={20} _value={20} _unit="°C" />
					<KolMeter _label="It's too cold" _min={-20} _max={60} _low={10} _high={30} _optimum={20} _value={-10} _unit="°C" />
					<KolMeter _label="It's too hot" _min={-20} _max={60} _low={10} _high={30} _optimum={20} _value={50} _unit="°C" />
				</div>
			</section>

			<section className="grid gap-4">
				<KolHeading _level={2} _label="Optimum in low zone (good = low)" />
				<div className="flex flex-col gap-4">
					<KolMeter _label="Memory Usage" _max={100} _value={10} _low={25} _high={75} _optimum={10} />
					<KolMeter _label="Memory Usage" _max={100} _value={50} _low={25} _high={75} _optimum={10} />
					<KolMeter _label="Memory Usage" _max={100} _value={90} _low={25} _high={75} _optimum={10} />
				</div>
			</section>

			<section className="grid gap-4">
				<KolHeading _level={2} _label="Optimum in high zone (good = high)" />
				<div className="flex flex-col gap-4">
					<KolMeter _label="Battery level" _max={100} _value={10} _low={25} _high={75} _optimum={90} />
					<KolMeter _label="Battery level" _max={100} _value={50} _low={25} _high={75} _optimum={90} />
					<KolMeter _label="Battery level" _max={100} _value={90} _low={25} _high={75} _optimum={90} />
				</div>
			</section>
		</div>
	</>
);
