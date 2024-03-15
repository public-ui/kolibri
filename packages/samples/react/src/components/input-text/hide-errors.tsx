import { KolAlert, KolCard, KolInputText } from '@public-ui/react';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputTextHideErrors: FC = () => (
	<div className="grid gap-4">
		<SampleDescription>
			This case shows the <code>_hideError</code> feature in the se. You can use the <code>_error</code> prop to show an error message.
		</SampleDescription>
		<KolCard _label="Normal input field with error" _level={0}>
			<KolInputText _msg={{ _type: 'error', _description: 'Error message' }} _label="Input with error" _touched />
		</KolCard>
		<KolCard _label="Input field with hidden error" _level={0}>
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
