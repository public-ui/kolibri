import React from 'react';
import { KolInputRadio } from '@public-ui/react';

import { FC } from 'react';

import { ERROR_MSG } from '../../shares/constants';

const list = [
	{ label: 'Frau', value: 'Frau' },
	{ disabled: true, label: 'Herr (disabled)' },
	{ label: 'Firma', value: 'Firma' },
];

export const InputRadioSelect: FC = () => (
	<div className="grid gap-4">
		<KolInputRadio _id="anrede-radio" _error={ERROR_MSG} _name="anrede" _list={list}>
			Anrede
		</KolInputRadio>
	</div>
);
