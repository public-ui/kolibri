import React from 'react';
import { KolInputNumber } from '@public-ui/react';

import { FC } from 'react';

import { ERROR_MSG } from '../../shares/constants';

export const InputNumberBasic: FC = () => (
	<div className="grid gap-4">
		<KolInputNumber
			_id="number"
			_name="number"
			_required
			_error={ERROR_MSG}
			_placeholder="Mit Icons"
			_icon={{
				left: {
					icon: 'codicon codicon-arrow-left',
				},
				right: {
					icon: 'codicon codicon-arrow-right',
				},
			}}
			_touched
		>
			Zahleneingabe
		</KolInputNumber>
		<KolInputNumber _id="number" _max={10} _min={-10} _step={2}>
			Zahleneingabe (-10 bis 10 in 2er Schritten)
		</KolInputNumber>
		<KolInputNumber _id="number" _read-only>
			Zahleneingabe (Readonly)
		</KolInputNumber>
		<KolInputNumber _disabled _id="number">
			Zahleneingabe (Disabled)
		</KolInputNumber>
	</div>
);
