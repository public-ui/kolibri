import type { FC } from 'react';
import React from 'react';

import { KolInputRadio } from '@public-ui/react';

import type { AlignPropType } from '@public-ui/components';

const options = ['left', 'top', 'right', 'bottom'].map((align) => ({
	label: align,
	value: align,
}));

export type DrawerRadioAlignProps = {
	value?: AlignPropType;
	onChange?: (_: Event, value: unknown) => void;
};

export const DrawerRadioAlign: FC<DrawerRadioAlignProps> = ({ value = 'left', onChange }) => {
	return (
		<div className="grid gap-4">
			<div className="container my-4 d-grid gap-4">
				<KolInputRadio _label="Drawer alignment" _value={value} _options={options} _orientation="horizontal" _on={{ onChange }} />
			</div>
		</div>
	);
};
