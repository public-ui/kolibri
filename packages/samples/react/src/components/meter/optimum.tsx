import { KolHeading, KolMeter } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const MeterOptimum: FC = () => (
	<>
		<SampleDescription>
			<p>
				The _optimum prop indicates the preferred value. Combined with _low and _high, the browser uses it to determine whether the current value is in a
				good, acceptable or bad zone – which affects the semantic coloring.
			</p>
		</SampleDescription>

		<div className="grid gap-8">
			<section className="grid gap-4">
				<KolHeading _level={2} _label="Optimum in medium zone (good = medium)" />
				<div className="flex flex-col gap-4">
					<KolMeter _label="Value in preferred zone" _max={100} _value={50} _low={25} _high={75} _optimum={50} />
					<KolMeter _label="Value in suboptimal zone" _max={100} _value={10} _low={25} _high={75} _optimum={50} />
					<KolMeter _label="Value in suboptimal zone" _max={100} _value={90} _low={25} _high={75} _optimum={50} />
				</div>
			</section>

			<section className="grid gap-4">
				<KolHeading _level={2} _label="Optimum in low zone (good = low)" />
				<div className="flex flex-col gap-4">
					<KolMeter _label="Value in preferred zone" _max={100} _value={10} _low={25} _high={75} _optimum={10} />
					<KolMeter _label="Value in acceptable zone" _max={100} _value={50} _low={25} _high={75} _optimum={10} />
					<KolMeter _label="Value in bad zone" _max={100} _value={90} _low={25} _high={75} _optimum={10} />
				</div>
			</section>

			<section className="grid gap-4">
				<KolHeading _level={2} _label="Optimum in high zone (good = high)" />
				<div className="flex flex-col gap-4">
					<KolMeter _label="Value in bad zone" _max={100} _value={10} _low={25} _high={75} _optimum={90} />
					<KolMeter _label="Value in acceptable zone" _max={100} _value={50} _low={25} _high={75} _optimum={90} />
					<KolMeter _label="Value in preferred zone" _max={100} _value={90} _low={25} _high={75} _optimum={90} />
				</div>
			</section>
		</div>
	</>
);
