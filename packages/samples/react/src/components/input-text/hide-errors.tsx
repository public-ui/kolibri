import { KolAlert, KolCard, KolInputText } from '@public-ui/react';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputTextHideErrors: FC = () => (
	<div className="grid gap-4">
		<SampleDescription>
			<p>
				This sample shows the <code>_hideError</code> feature for KolInputText. It allows to hide the error message from an input field and can be used, when
				the error is already shown somewhere else, e.g. for a group of inputs.
			</p>
		</SampleDescription>

		<KolCard _label="Normal input field with error" _level={0}>
			<KolInputText _msg={{ _type: 'error', _description: 'Error message' }} _label="Input with error" _touched />
		</KolCard>
		<KolCard _label="Input fields with hidden error" _level={0}>
			<fieldset className="grid md:grid-cols-2 gap-4">
				<legend>Combined input field</legend>
				<KolAlert className="col-span-2" _level={0} _type="error">
					This is a combined error message
				</KolAlert>
				<KolInputText _msg={{ _type: 'error', _description: 'This is a combined error message' }} _hideError _label="First input" _touched />
				<KolInputText _msg={{ _type: 'error', _description: 'This is a combined error message' }} _hideError _label="Second input with error" _touched />
			</fieldset>
		</KolCard>
	</div>
);
