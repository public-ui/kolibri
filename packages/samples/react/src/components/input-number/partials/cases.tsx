import React, { forwardRef } from 'react';

import { KolInputNumber } from '@public-ui/react';

import { ERROR_MSG } from '../../../shares/constants';

import type { Components } from '@public-ui/components';
export const InputNumberCases = forwardRef<HTMLKolInputNumberElement, Components.KolInputNumber>(function InputNumberCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolInputNumber
				{...props}
				_required
				_msg={{ _type: 'error', _label: ERROR_MSG }}
				_touched
				_placeholder="Mit Icons"
				_label="Zahleneingabe"
				_icons={{
					left: {
						icon: 'codicon codicon-arrow-left',
					},
					right: {
						icon: 'codicon codicon-arrow-right',
					},
				}}
			/>
			<KolInputNumber {...props} ref={ref} _accessKey="Z" _max={10} _min={-10} _step={2} _label="Zahleneingabe (-10 bis 10 in 2er Schritten)" />
			<KolInputNumber {...props} _readOnly _label="Zahleneingabe (Readonly)" />
			<KolInputNumber {...props} _disabled _label="Zahleneingabe (Disabled)" />
		</div>
	);
});
