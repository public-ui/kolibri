import React, { FC, useState } from 'react';

import { Orientation } from '@public-ui/components';
import { KolButton, KolDetails, KolForm, KolInputCheckbox, KolInputRadio } from '@public-ui/react';

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
			<KolDetails _label="Description" _open>
				<p>
					This sample simulates the <code>horizontal</code> and <code>vertical</code> orientation of the <code>kol-input-radio</code>, if we rerender the
					component.
				</p>
			</KolDetails>
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
