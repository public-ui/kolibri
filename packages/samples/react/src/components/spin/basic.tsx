import React from 'react';

import { KolHeading, KolSpin } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';
import './custom.css';

export const SpinBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				KolSpin renders a loading indicator. It supports the variants &quot;dot&quot; (default) and &quot;cycle&quot;. With{' '}
				<code>_variant=&quot;none&quot;</code> and the expert slot a custom animation can be used &ndash; custom animations are not necessarily barrier-free.
				Color and size can be changed with the CSS properties <code>--kol-spin-color</code> and <code>--kol-spin-size</code>. The label (<code>_label</code>) is
				only exposed to assistive technology, so it does not change the visual appearance.
			</p>
		</SampleDescription>

		<div className="grid gap-8">
			<SampleBlock id="basic" heading="Variant dot (default)" fitContent>
				<KolSpin _show />
			</SampleBlock>

			<SampleBlock id="cycle" heading="Variant cycle" fitContent>
				<KolSpin _show _variant="cycle" />
			</SampleBlock>

			<SampleBlock id="custom" heading="Custom animation (expert slot)" fitContent>
				<KolSpin _show _variant="none">
					<span slot="expert" className="loader"></span>
				</KolSpin>
			</SampleBlock>

			<div>
				<KolHeading _level={2} _label="With label (screen reader only)" />
				<KolSpin _show _label="Loading data..." />
			</div>

			<div>
				<KolHeading _level={2} _label="Custom color and size (CSS properties)" />
				<KolSpin _show style={{ '--kol-spin-color': 'green', '--kol-spin-size': '80' }} />
			</div>
		</div>
	</>
);
