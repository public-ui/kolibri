import React, { forwardRef } from 'react';

import { KolInputRadio } from '@public-ui/react';

import { ERROR_MSG } from '../../../shares/constants';

import type { Components } from '@public-ui/components';
export const InputRadioCases = forwardRef<HTMLKolInputRadioElement, Components.KolInputRadio>(function InputRadioCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolInputRadio
				{...props}
				_options="[{'disabled':true,'label':'Mrs. (disabled)','value':'Mrs.'},{'label':'Mr.'},{'label':'Company','value':'Company'}]"
				_label="Salutation"
			/>
			<KolInputRadio
				{...props}
				_required
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_touched
				_value="Company"
				_options="[{'label':'Mrs.','value':'Mrs.'},{'disabled':true,'label':'Mr. (disabled)','value':'Mr.'},{'label':'Company','value':'Company'}]"
				_label="Salutation (with error)"
			/>
			<KolInputRadio
				{...props}
				ref={ref}
				_accessKey="A"
				_orientation="horizontal"
				_required
				_value="Company"
				_options="[{'label':'Mrs.','value':'Mrs.'},{'disabled':true,'label':'Mr. (disabled)'},{'label':'Company','value':'Company'}]"
				_label="Salutation (horizontal)"
			/>
			<KolInputRadio
				{...props}
				_disabled
				_orientation="horizontal"
				_required
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_touched
				_value="Company"
				_options="[{'label':'Mrs.','value':'Mrs.'},{'disabled':true,'label':'Mr. (disabled)'},{'label':'Company','value':'Company'}]"
				_label="Salutation (horizontal with error)"
			/>
			<KolInputRadio
				{...props}
				_disabled
				_value="Company"
				_options="[{'label':'Mrs.','value':'Mrs.'},{'disabled':true,'label':'Mr. (disabled)'},{'label':'Company','value':'Company'}]"
				_label="Salutation"
				_touched
			/>
		</div>
	);
});
