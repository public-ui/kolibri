import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputTextReadonly: FC = () => (
	<>
		<SampleDescription>
			<p>This story demonstrates the readonly state of KolInputText. Readonly inputs can be focused but not edited.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolInputText _label="Readonly with placeholder" _placeholder="Placeholder text" _readOnly />
			<KolInputText _label="Readonly with value" _value="This field is readonly" _readOnly />
			<KolInputText
				_label="Readonly with info message"
				_value="Read-only value"
				_msg={{ _type: 'info', _description: 'This field cannot be edited' }}
				_readOnly
			/>
			<KolInputText _label="Comparison: Editable" _value="This field is editable" />
		</div>
	</>
);
