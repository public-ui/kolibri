import { KolButton, KolMeter } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useState } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const MeterDynamic: FC = () => {
	const [usedStorage, setUsedStorage] = useState(120);

	return (
		<>
			<SampleDescription>
				<p>KolMeter announces value changes immediately to screen readers. Use the buttons below to verify the live region updates without delay.</p>
			</SampleDescription>

			<div className="grid gap-8">
				<SampleBlock id="dynamic-value" heading="Dynamic value">
					<KolMeter _label="Used hard disk space" _max={500} _min={0} _unit="GB" _value={usedStorage} />
					<div className="flex gap-4">
						<KolButton _label="120 GB" _on={{ onClick: () => setUsedStorage(120) }} _variant="secondary" />
						<KolButton _label="240 GB" _on={{ onClick: () => setUsedStorage(240) }} _variant="secondary" />
						<KolButton _label="360 GB" _on={{ onClick: () => setUsedStorage(360) }} _variant="secondary" />
						<KolButton _label="480 GB" _on={{ onClick: () => setUsedStorage(480) }} _variant="secondary" />
					</div>
				</SampleBlock>
			</div>
		</>
	);
};
