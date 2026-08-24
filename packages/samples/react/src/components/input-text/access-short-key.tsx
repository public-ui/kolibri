import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const InputTextAccessShortKey: FC = () => (
	<div className="grid gap-4">
		<SampleDescription>
			<p>This story demonstrates access keys and short keys for KolInputText. Access keys provide keyboard shortcuts for focusing inputs.</p>
		</SampleDescription>

		<SampleBlock id="access-key-value">
			<KolInputText _label="With access key (Alt+F)" _value="Press Alt+F to focus" _accessKey="f" />
		</SampleBlock>
		<SampleBlock id="short-key-value">
			<KolInputText _label="With short key (Alt+N)" _value="Press Alt+N to focus" _shortKey="n" />
		</SampleBlock>
		<SampleBlock id="access-key-placeholder">
			<KolInputText _label="Access key (Alt+E)" _value="" _placeholder="Email address" _accessKey="e" />
		</SampleBlock>
		<SampleBlock id="short-key-placeholder">
			<KolInputText _label="Short key (Alt+P)" _value="" _placeholder="Phone number" _shortKey="p" />
		</SampleBlock>
	</div>
);
