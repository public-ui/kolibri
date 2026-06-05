import type { FC } from 'react';
import React from 'react';

import { KolInputNumber } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

export const InputNumberFeatureFlags: FC = () => (
	<>
		<SampleDescription>
			<p>
				The <code>inputNumberButtons</code> feature flag controls whether the step-up/step-down buttons are rendered inside <code>KolInputNumber</code>.
			</p>
			<p>
				Each theme can export a <code>*_FEATURE_FLAGS</code> object (e.g. <code>DEFAULT_FEATURE_FLAGS</code> from <code>@public-ui/themes</code>) that acts as
				the recommended baseline for that theme. Use <code>mergeFeatureFlags()</code> to combine it with app-level overrides:
			</p>
			<pre>
				<code>
					{`import { bootstrap, mergeFeatureFlags } from '@public-ui/components';
import { DEFAULT_FEATURE_FLAGS } from '@public-ui/themes';

bootstrap(themes, loaders, {
  features: mergeFeatureFlags(DEFAULT_FEATURE_FLAGS, { inputNumberButtons: 'hide' }),
});`}
				</code>
			</pre>
			<p>
				The inputs below reflect the current bootstrap configuration. Edit <code>react.main.tsx</code> and swap the commented <code>features</code> line to see
				the buttons hidden.
			</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolInputNumber _label="Default (step buttons follow feature flag)" _min={0} _max={100} _step={1} _value={42} />
			<KolInputNumber _label="Disabled (no step buttons regardless of flag)" _disabled _value={42} />
			<KolInputNumber _label="Read-only (no step buttons regardless of flag)" _readOnly _value={42} />
		</div>
	</>
);
