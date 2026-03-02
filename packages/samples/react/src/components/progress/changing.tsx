import React, { useState } from 'react';

import { KolProgress } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const ProgressChanging: FC = () => {
	const [val, setVal] = useState<number>(5);

	return (
		<>
			<SampleDescription>
				<p>This shows that values can be changed and that they are clamped at max value (here at 10).</p>
			</SampleDescription>

			<fieldset title="changing" className="flex flex-col gap-4">
				<div className="flex gap-4">
					<button onClick={() => setVal(-2)}>set -2</button>
					<button onClick={() => setVal(5)}>set 5</button>
					<button onClick={() => setVal(13)}>set 13</button>
				</div>

				<KolProgress _label={`Showing ${val}`} _variant="bar" _max={10} _value={val}></KolProgress>
				<KolProgress _label={`Showing ${val}`} _variant="cycle" _max={10} _value={val}></KolProgress>
			</fieldset>
		</>
	);
};
