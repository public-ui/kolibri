import React from 'react';
import { KolForm, KolInputRadio } from '@public-ui/react';

import { FC } from 'react';

import { ERROR_MSG } from '../../shares/constants';

export const InputRadioBasic: FC = () => (
	<KolForm className="grid gap-4">
		<KolInputRadio
			_id="anrede"
			_error={ERROR_MSG}
			_name="anrede"
			_options="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)'},{'label':'Firma','value':'Firma'}]"
			_label="Anrede"
		/>
		<KolInputRadio
			_id="anrede"
			_required
			_error={ERROR_MSG}
			_name="anrede2"
			_value="Firma"
			_options="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)','value':'Herr'},{'label':'Firma','value':'Firma'}]"
			_label="Anrede"
		/>
		<KolInputRadio
			_id="anrede"
			_orientation="horizontal"
			_required
			_error={ERROR_MSG}
			_name="anrede2"
			_value="Firma"
			_options="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)'},{'label':'Firma','value':'Firma'}]"
			_label="Anrede (horizontal)"
		/>
		<KolInputRadio
			_id="anrede"
			_disabled
			_error={ERROR_MSG}
			_name="anrede3"
			_value="Firma"
			_options="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)'},{'label':'Firma','value':'Firma'}]"
			_label="Anrede"
		/>
	</KolForm>
);
