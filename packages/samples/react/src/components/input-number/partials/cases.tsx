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
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_touched
				_placeholder="Mit Icons"
				_label="Number input"
				_icons={{
					left: {
						icon: 'codicon codicon-arrow-left',
					},
					right: {
						icon: 'codicon codicon-arrow-right',
					},
				}}
			/>
			<KolInputNumber {...props} _required _msg={{ _type: 'error', _description: ERROR_MSG }} _touched _value={123} _label="Number input" />
			<KolInputNumber {...props} _required _msg={{ _type: 'warning', _description: ERROR_MSG }} _touched _value={123} _label="Number input" />
			<KolInputNumber {...props} _required _msg={{ _type: 'info', _description: ERROR_MSG }} _touched _value={123} _label="Number input" />
			<KolInputNumber {...props} _required _msg={{ _type: 'success', _description: ERROR_MSG }} _touched _value={123} _label="Number input" />
			<KolInputNumber {...props} ref={ref} _accessKey="Z" _max={10} _min={-10} _step={2} _label="Number input (-10 to 10 in steps of 2)" />
			<KolInputNumber {...props} _readOnly _label="Number input (Readonly)" />
			<KolInputNumber {...props} _disabled _label="Number input (Disabled)" />
		</div>
	);
});
