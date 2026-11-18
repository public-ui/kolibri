import React, { useEffect, useState } from 'react';

import { KolButton, KolProgress } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

const MAX = 100;
const STEP = 5;
const TICK_MS = 1000;

export const ProgressDynamic: FC = () => {
	const [value, setValue] = useState<number>(0);
	const [running, setRunning] = useState<boolean>(true);
	const [mounted, setMounted] = useState<boolean>(true);

	useEffect(() => {
		if (!running) {
			return;
		}
		const timer = setInterval(() => setValue((current) => (current >= MAX ? 0 : current + STEP)), TICK_MS);
		return () => clearInterval(timer);
	}, [running]);

	return (
		<>
			<SampleDescription>
				<p>
					The value grows by {STEP} every second and starts again at 0 after {MAX}. Screen readers announce the current value every 5 seconds through the live
					region. Removing and inserting the components again checks that the announcement continues afterwards.
				</p>
			</SampleDescription>

			<SampleBlock id="progress-dynamic" skipSnapshot>
				<div className="flex gap-4">
					<KolButton _label={running ? 'Pause' : 'Resume'} _on={{ onClick: () => setRunning(!running) }} />
					<KolButton _label={mounted ? 'Remove' : 'Insert'} _on={{ onClick: () => setMounted(!mounted) }} />
				</div>

				{mounted && (
					<>
						<KolProgress _label="Upload" _variant="bar" _max={MAX} _value={value} />
						<KolProgress _label="Upload" _variant="cycle" _max={MAX} _value={value} />
					</>
				)}
			</SampleBlock>
		</>
	);
};
