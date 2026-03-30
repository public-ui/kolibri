import { KolHeading, KolMeter } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const MeterBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolMeter renders a semantic meter element. The required props are _label, _max and _value.</p>
		</SampleDescription>

		<div className="grid gap-8">
			<section className="grid gap-4">
				<KolHeading _level={2} _label="Basic" />
				<div className="flex flex-col gap-4">
					<KolMeter _label="Storage used" _max={100} _value={0} />
					<KolMeter _label="Storage used" _max={100} _value={42} />
					<KolMeter _label="Storage used" _max={100} _value={100} />
				</div>
			</section>
		</div>
	</>
);
