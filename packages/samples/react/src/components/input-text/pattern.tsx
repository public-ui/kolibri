import type { FC } from 'react';
import React from 'react';

import { KolInputText } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

const PATTERN = '^[A-Z]{3}-\\d{3}$';
const PATTERN_HINT = 'Use three uppercase letters, a dash, and three digits (example: ABC-123).';

export const InputTextPattern: FC = () => (
	<>
		<SampleDescription>
			<p>This sample demonstrates HTML5 pattern validation for a native input and shows how to mirror a KolInputText value to a form-controlled input.</p>
		</SampleDescription>
		<form className="grid gap-4">
			<div className="grid gap-2">
				<label htmlFor="native-pattern">Native code (AAA-123)</label>
				<input aria-describedby="native-pattern-help" id="native-pattern" name="native-pattern" pattern={PATTERN} required type="text" />
				<p id="native-pattern-help">{PATTERN_HINT}</p>
			</div>
			<KolInputText
				_label="KoliBri code (AAA-123)"
				_msg={{ _description: `${PATTERN_HINT} (Mirrored into a hidden native input for HTML5 validation.)`, _type: 'info' }}
				_pattern={PATTERN}
				_required
				_syncValueBySelector="#kolibri-pattern-proxy"
			/>
			<input
				aria-hidden="true"
				className="visually-hidden"
				id="kolibri-pattern-proxy"
				name="kolibri-pattern-proxy"
				pattern={PATTERN}
				required
				tabIndex={-1}
				type="text"
			/>
			<button type="submit">Submit</button>
		</form>
	</>
);
