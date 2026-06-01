import { KolButton, KolHeading, KolMeter } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useState } from 'react';
import { SampleDescription } from '../SampleDescription';

export const MeterDynamic: FC = () => {
	const [value, setValue] = useState(0.5);

	return (
		<>
			<SampleDescription>
				<p>
					Demonstrates that KolMeter updates its accessible live-region immediately when <code>_value</code> changes dynamically. Screen readers announce the new
					value without delay when the meter is updated.
				</p>
			</SampleDescription>

			<div className="grid gap-8">
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Dynamic value" />
					<KolMeter _label="Storage used" _value={value} />
					<div className="flex gap-4">
						<KolButton _label="Set to 25%" _on={{ onClick: () => setValue(0.25) }} _variant="secondary" />
						<KolButton _label="Set to 50%" _on={{ onClick: () => setValue(0.5) }} _variant="secondary" />
						<KolButton _label="Set to 75%" _on={{ onClick: () => setValue(0.75) }} _variant="secondary" />
						<KolButton _label="Set to 100%" _on={{ onClick: () => setValue(1) }} _variant="secondary" />
					</div>
				</section>
			</div>
		</>
	);
};
