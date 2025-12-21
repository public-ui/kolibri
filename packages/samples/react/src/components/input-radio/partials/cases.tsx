import React, { forwardRef } from 'react';

import { KolInputRadio } from '@public-ui/react-v19';

import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';

import type { Components } from '@public-ui/components';

// Add onChange handler to log value changes
const ON = {
	onChange: console.info,
};

export const InputRadioCases = forwardRef<HTMLKolInputRadioElement, Components.KolInputRadio>(function InputRadioCases(props, ref) {
	return (
		<div className="grid gap-4">
			<div className="black-background">
				<KolInputRadio
					{...props}
					_options="[{'disabled':true,'label':'Mrs. (disabled)','value':'Mrs.'},{'label':'Mr.'},{'label':'Company','value':'Company'}]"
					_label="Salutation (Black background test)"
				/>
			</div>
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
			<KolInputRadio
				{...props}
				_orientation="horizontal"
				_required
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_touched
				_value="Company"
				_options={[
					{ label: 'Mrs.', value: 'Mrs.', hint: 'Description for option "Mrs."' },
					{ label: 'Mr. (disabled)', value: 'Mr.', hint: 'Description for option "Mr."', disabled: true },
					{ label: 'Company', value: 'Company', hint: 'Description for option "Company"' },
				]}
				_label="Salutation (horizontal with error hint and description)"
				_hint={HINT_MSG}
			/>
			<KolInputRadio
				{...props}
				_label="Boolean, Object, Array values"
				_on={ON}
				_options={[
					{
						label: 'True',
						value: true,
					},
					{
						label: 'False',
						value: false,
					},
					{
						label: '1',
						value: 1,
					},
					{
						label: '0',
						value: 0,
					},
					{
						label: 'Object',
						value: {
							key: 'true',
							text: 'This is true',
						},
					},
					{
						label: 'Array',
						value: ['0', '1'],
					},
				]}
				_value={false}
			/>
		</div>
	);
});
