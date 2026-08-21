import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const InputTextReadonly: FC = () => (
	<div className="grid gap-4">
		<SampleDescription>
			<p>This story demonstrates the readonly state of KolInputText. Readonly inputs can be focused but not edited.</p>
		</SampleDescription>

		<SampleBlock id="placeholder">
			<KolInputText _label="Readonly with placeholder" _placeholder="Placeholder text" _readOnly />
		</SampleBlock>
		<SampleBlock id="value">
			<KolInputText _label="Readonly with value" _value="This field is readonly" _readOnly />
		</SampleBlock>
		<SampleBlock id="info">
			<KolInputText
				_label="Readonly with info message"
				_value="Read-only value"
				_msg={{ _type: 'info', _description: 'This field cannot be edited' }}
				_readOnly
				_touched
			/>
		</SampleBlock>
		<SampleBlock id="editable">
			<KolInputText _label="Comparison: Editable" _value="This field is editable" />
		</SampleBlock>
	</div>
);
