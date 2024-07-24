import React, { FC, useState } from 'react';

import { Orientation } from '@public-ui/components';
import { KolButton, KolForm, KolInputCheckbox, KolInputRadio } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const InputRadioHorizontal: FC = () => {
	const [show, setShow] = useState(true);
	const [orientation, setOrientation] = useState<Orientation>('horizontal');

	const options = [
		{ label: 'Field 1', value: 1 },
		{ label: 'Field 2', value: 2 },
	];

	const showClick = () => {
		setShow((s) => !s);
	};

	const toggleOrientation = () => {
		setOrientation((o) => (o === 'horizontal' ? 'vertical' : 'horizontal'));
	};

	return (
		<div className="grid gap-4">
			<SampleDescription>
				<p>
					This sample shows the <code>horizontal</code> and <code>vertical</code> orientation of KolInoutRadio. It also features a button to test re-rendering.
				</p>
			</SampleDescription>
			<div className="flex gap-4">
				<KolButton _label="Click me a few times" _on={{ onClick: showClick }} />
				<KolInputCheckbox _label="Switch orientation (horizontal/vertical)" _on={{ onChange: toggleOrientation }} _variant="switch" />
			</div>
			{show && (
				<KolForm>
					<div className="container my-4 d-grid gap-4">
						<KolInputRadio _label={`Test (${orientation})`} _options={options} _orientation={orientation} _required />
						<KolInputRadio _hideLabel _label={`Test (${orientation})`} _options={options} _orientation={orientation} _required />
					</div>
				</KolForm>
			)}
		</div>
	);
};
