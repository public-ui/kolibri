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
				Themes declare their preferred flag values as the third argument to <code>KoliBri.createTheme()</code>. Apps inherit these flags automatically and only
				need to pass <code>features</code> to bootstrap when they want to override something for this specific deployment:
			</p>
			<pre>
				<code>
					{`// In your theme package:
export const MY_THEME = KoliBri.createTheme('my-theme', cssMap, {
  inputNumberButtons: 'hide',
});

// In your app – no features option needed unless overriding:
bootstrap(themes, loaders, options);

// To override for this app only:
bootstrap(themes, loaders, { features: { inputNumberButtons: 'show' } });`}
				</code>
			</pre>
			<p>
				The inputs below reflect the current bootstrap configuration. Edit <code>react.main.tsx</code> and uncomment the <code>features</code> line to override
				the theme default.
			</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolInputNumber _label="Default (step buttons follow theme feature flag)" _min={0} _max={100} _step={1} _value={42} />
			<KolInputNumber _label="Disabled (no step buttons regardless of flag)" _disabled _value={42} />
			<KolInputNumber _label="Read-only (no step buttons regardless of flag)" _readOnly _value={42} />
		</div>
	</>
);
