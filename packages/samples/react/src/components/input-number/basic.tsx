import React from 'react';
import { KolForm, KolInputNumber } from '@public-ui/react';

import { FC } from 'react';

import { ERROR_MSG } from '../../shares/constants';

export const InputNumberBasic: FC = () => (
	<KolForm>
		<div className="grid gap-4">
			<KolInputNumber
				_required
				_error={ERROR_MSG}
				_touched
				_placeholder="Mit Icons"
				_label="Zahleneingabe"
				_icon={{
					left: {
						icon: 'codicon codicon-arrow-left',
					},
					right: {
						icon: 'codicon codicon-arrow-right',
					},
				}}
			/>
			<KolInputNumber _max={10} _min={-10} _step={2} _label="Zahleneingabe (-10 bis 10 in 2er Schritten)" />
			<KolInputNumber _read-only _label="Zahleneingabe (Readonly)" />
			<KolInputNumber _disabled _label="Zahleneingabe (Disabled)" />
		</div>
	</KolForm>
);
