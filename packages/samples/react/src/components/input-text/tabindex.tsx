/* eslint-disable jsx-a11y/tabindex-no-positive */
import { KolInputText, KolSelect } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputTextTabindex: FC = () => (
	<div className="grid gap-4">
		<SampleDescription>
			<p>This sample sets tabIndex of the First input to 1 and deaktivates tab on the second (-1).</p>
		</SampleDescription>
		<KolInputText _label="First input" _tabIndex={20} />
		<KolInputText _label="Second input" _tabIndex={-1} />

		<KolSelect _tabIndex={21} _options="[{'label':'Herr','value':0},{'label':'Frau','value':1}]" _label="Label-Text"></KolSelect>

		<label>
			normal input
			<input tabIndex={-1} type="text" />
		</label>
	</div>
);
