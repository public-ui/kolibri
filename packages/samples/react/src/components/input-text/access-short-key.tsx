import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputTextAccessShortKey: FC = () => (
	<>
		<SampleDescription>
			<p>This story demonstrates access keys and short keys for KolInputText. Access keys provide keyboard shortcuts for focusing inputs.</p>
		</SampleDescription>

		<div className="grid gap-4" data-visual-block="access-short-key">
			<KolInputText _label="With access key (Alt+F)" _value="Press Alt+F to focus" _accessKey="f" />
			<KolInputText _label="With short key (Alt+N)" _value="Press Alt+N to focus" _shortKey="n" />
			<KolInputText _label="Access key (Alt+E)" _value="" _placeholder="Email address" _accessKey="e" />
			<KolInputText _label="Short key (Alt+P)" _value="" _placeholder="Phone number" _shortKey="p" />
		</div>
	</>
);
