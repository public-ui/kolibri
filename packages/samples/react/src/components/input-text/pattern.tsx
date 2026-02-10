import type { FC } from 'react';
import React from 'react';

import { KolInputText } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

const PATTERN = '^[A-Za-z]{3}-\\d{3}$';

export const InputTextPattern: FC = () => (
	<>
		<SampleDescription>
			<p>This sample demonstrates HTML5 pattern validation for both native input and KolInputText components.</p>
		</SampleDescription>
		<form className="grid gap-4">
			<div className="grid gap-2">
				<label htmlFor="native-input">Native Input (Pattern: AAA-123, case-insensitive)</label>
				<input id="native-input" name="native-input" pattern={PATTERN} type="text" />
			</div>
			<KolInputText
				_label="KoliBri Input (Pattern: AAA-123, case-insensitive)"
				_name="kolibri-input"
				_pattern={PATTERN}
				_hint="Note: This input is not linked to the form element. The validation inside the Shadow DOM is currently not triggered on form submit."
			/>
			<div>
				<button type="submit">Submit</button>
			</div>
		</form>
	</>
);
