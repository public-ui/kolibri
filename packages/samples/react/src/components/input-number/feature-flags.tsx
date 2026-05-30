import type { FC } from 'react';
import React from 'react';

import { KolInputNumber } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

export const InputNumberFeatureFlags: FC = () => (
	<>
		<SampleDescription>
			<p>
				The <code>inputNumberButtons</code> feature flag controls whether the step-up/step-down buttons are rendered inside <code>KolInputNumber</code>.
				Configure it at bootstrap time to opt out globally:
			</p>
			<pre>
				<code>{"bootstrap(themes, loaders, { features: { inputNumberButtons: 'hide' } })"}</code>
			</pre>
			<p>The inputs below reflect the current bootstrap configuration. Uncomment the feature flag in react.main.tsx to see the buttons hidden.</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolInputNumber _label="Default (step buttons follow feature flag)" _min={0} _max={100} _step={1} _value={42} />
			<KolInputNumber _label="Disabled (no step buttons regardless of flag)" _disabled _value={42} />
			<KolInputNumber _label="Read-only (no step buttons regardless of flag)" _readOnly _value={42} />
		</div>
	</>
);
