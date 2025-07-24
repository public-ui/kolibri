import type { FC } from 'react';
import React from 'react';

import { KolInputRadio } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { ERROR_MSG, HINT_MSG } from '../../shares/constants';

export const InputRadioBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputRadio renders a set of radio buttons. The sample shows KolInputRadio in a form context with all variations and states.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<div className="black-background">
				<KolInputRadio
					_options="[{'disabled':true,'label':'Mrs. (disabled)','value':'Mrs.'},{'label':'Mr.'},{'label':'Company','value':'Company'}]"
					_label="Salutation (Black background test)"
				/>
			</div>
			<KolInputRadio
				_required
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_touched
				_value="Company"
				_options="[{'label':'Mrs.','value':'Mrs.'},{'disabled':true,'label':'Mr. (disabled)','value':'Mr.'},{'label':'Company','value':'Company'}]"
				_label="Salutation (with error)"
			/>
			<KolInputRadio
				_orientation="horizontal"
				_required
				_value="Company"
				_options="[{'label':'Mrs.','value':'Mrs.'},{'disabled':true,'label':'Mr. (disabled)'},{'label':'Company','value':'Company'}]"
				_label="Salutation (horizontal)"
			/>
			<KolInputRadio
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
				_disabled
				_value="Company"
				_options="[{'label':'Mrs.','value':'Mrs.'},{'disabled':true,'label':'Mr. (disabled)'},{'label':'Company','value':'Company'}]"
				_label="Salutation"
				_touched
			/>
			<KolInputRadio
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
		</div>
	</>
);
