import { KolHeading, KolMeter } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const MeterRanges: FC = () => (
	<>
		<SampleDescription>
			<p>
				The _low and _high props divide the meter scale into three zones: low (below _low), medium (between _low and _high) and high (above _high). These zones
				are used by the browser to apply semantic coloring.
			</p>
		</SampleDescription>

		<div className="grid gap-8">
			<section className="grid gap-4">
				<KolHeading _level={2} _label="Low / High zones" />
				<div className="flex flex-col gap-4">
					<KolMeter _label="Value in low zone" _max={100} _value={10} _low={25} _high={75} />
					<KolMeter _label="Value in medium zone" _max={100} _value={50} _low={25} _high={75} />
					<KolMeter _label="Value in high zone" _max={100} _value={90} _low={25} _high={75} />
				</div>
			</section>

			<section className="grid gap-4">
				<KolHeading _level={2} _label="Only _low boundary" />
				<div className="flex flex-col gap-4">
					<KolMeter _label="Below threshold" _max={100} _value={15} _low={30} />
					<KolMeter _label="Above threshold" _max={100} _value={60} _low={30} />
				</div>
			</section>

			<section className="grid gap-4">
				<KolHeading _level={2} _label="Only _high boundary" />
				<div className="flex flex-col gap-4">
					<KolMeter _label="Below threshold" _max={100} _value={40} _high={70} />
					<KolMeter _label="Above threshold" _max={100} _value={85} _high={70} />
				</div>
			</section>
		</div>
	</>
);
