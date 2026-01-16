import type { FC } from 'react';
import React from 'react';

import { KolInputText } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

const PATTERN = '^[A-Z]{3}-\\d{3}$';

export const InputTextPattern: FC = () => (
	<>
		<SampleDescription>
			<p>This sample demonstrates HTML5 pattern validation for a native input and KolInputText.</p>
		</SampleDescription>
		<form className="grid gap-4">
			<div className="grid gap-2">
				<label htmlFor="native-pattern">Native code (AAA-123)</label>
				<input aria-describedby="native-pattern-help" id="native-pattern" name="native-pattern" pattern={PATTERN} required type="text" />
				<p id="native-pattern-help">Use three uppercase letters, a dash, and three digits (example: ABC-123).</p>
			</div>
			<KolInputText
				_label="KoliBri code (AAA-123)"
				_msg={{ _description: 'Use three uppercase letters, a dash, and three digits (example: ABC-123).', _type: 'info' }}
				_pattern={PATTERN}
				_required
			/>
			<button type="submit">Submit</button>
		</form>
	</>
);
