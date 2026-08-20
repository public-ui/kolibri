import { KolAlert, KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputTextHideMsg: FC = () => (
	<div className="grid gap-4">
		<SampleDescription>
			<p>
				This sample shows the <code>_hideMsg</code> feature for KolInputText. It allows to hide the message from an input field and can be used, when the
				message (e.g. error) is already shown somewhere else, e.g. for a group of inputs.
			</p>
		</SampleDescription>

		<section data-visual-block="single-error">
			<KolInputText _msg={{ _type: 'error', _description: 'Error message' }} _label="Input with error" _touched />
		</section>
		<section data-visual-block="combined-error">
			<fieldset className="grid md:grid-cols-2 gap-4">
				<legend>Combined input field</legend>
				<KolAlert className="col-span-2" _level={0} _type="error">
					This is a combined error message
				</KolAlert>
				<KolInputText _msg={{ _type: 'error', _description: 'This is a combined error message' }} _hideMsg _label="First input" _touched />
				<KolInputText _msg={{ _type: 'error', _description: 'This is a combined error message' }} _hideMsg _label="Second input with error" _touched />
			</fieldset>
		</section>
	</div>
);
