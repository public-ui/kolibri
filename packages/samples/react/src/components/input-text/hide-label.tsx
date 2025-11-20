import { KolAlert, KolCard, KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputTextHideLabel: FC = () => (
	<div className="grid gap-4">
		<SampleDescription>
			<p>
				This story demonstrates the <code>_hideLabel</code> feature for KolInputText. It allows hiding the label visually while keeping it accessible for
				screen readers.
			</p>
		</SampleDescription>

		<KolCard _label="Basic hide-label example" _level={0}>
			<KolInputText _hideLabel _label="Search" _placeholder="Search..." _type="search" />
		</KolCard>

		<KolCard _label="Hide-label with error" _level={0}>
			<KolInputText _hideLabel _label="Email" _placeholder="Enter email" _msg={{ _type: 'error', _description: 'Invalid email format' }} _touched />
		</KolCard>

		<KolCard _label="Combined fields with hide-label" _level={0}>
			<fieldset className="grid md:grid-cols-2 gap-4">
				<legend>Street Address</legend>
				<KolAlert className="col-span-2" _level={0} _type="error">
					Please complete the address
				</KolAlert>
				<KolInputText _hideLabel _hideMsg _label="Street name" _placeholder="Street name" _msg={{ _type: 'error', _description: 'Please complete the address' }} _touched />
				<KolInputText _hideLabel _hideMsg _label="House number" _placeholder="Number" _msg={{ _type: 'error', _description: 'Please complete the address' }} _touched />
			</fieldset>
		</KolCard>
	</div>
);
