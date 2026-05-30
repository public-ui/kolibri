import type { FC } from 'react';
import React from 'react';

import { KolInputNumber } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

/**
 * This sample demonstrates the `inputNumberButtons` feature flag.
 *
 * To test with hidden step buttons, pass `features: { inputNumberButtons: 'hide' }` to `bootstrap()`:
 *
 * ```ts
 * await bootstrap(themes, loaders, {
 *   features: { inputNumberButtons: 'hide' },
 * });
 * ```
 *
 * When set to 'hide', the step-up / step-down buttons are not rendered.
 * The default value is 'show'.
 */
export const InputNumberFeatureFlags: FC = () => (
	<>
		<SampleDescription>
			<p>
				The <code>inputNumberButtons</code> feature flag controls whether the step-up/step-down buttons are rendered inside <code>KolInputNumber</code>.
				Configure it via <code>bootstrap(themes, loaders, {"{ features: { inputNumberButtons: 'hide' } }"})</code> to opt out of the buttons globally.
			</p>
			<p>
				The inputs below reflect the <strong>current bootstrap configuration</strong>. To see the buttons hidden, set{' '}
				<code>features.inputNumberButtons = &apos;hide&apos;</code> in <code>react.main.tsx</code> before starting the sample app.
			</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolInputNumber _label="Default (step buttons follow feature flag)" _min={0} _max={100} _step={1} _value={42} />
			<KolInputNumber _label="Disabled (no step buttons regardless of flag)" _disabled _value={42} />
			<KolInputNumber _label="Read-only (no step buttons regardless of flag)" _readOnly _value={42} />
		</div>
	</>
);
