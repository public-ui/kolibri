import React from 'react';
import { KolInputRadio } from '@public-ui/react';

import { FC } from 'react';

import { ERROR_MSG } from '../../shares/constants';

export const InputRadioBasic: FC = () => (
	<div className="grid gap-4">
		<KolInputRadio
			_id="anrede"
			_error={ERROR_MSG}
			_name="anrede"
			_list="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)'},{'label':'Firma','value':'Firma'}]"
		>
			Anrede
		</KolInputRadio>
		<KolInputRadio
			_id="anrede"
			_required
			_error={ERROR_MSG}
			_name="anrede2"
			_value="Firma"
			_list="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)','value':'Herr'},{'label':'Firma','value':'Firma'}]"
		>
			Anrede
		</KolInputRadio>
		<KolInputRadio
			_id="anrede"
			_orientation="horizontal"
			_required
			_error={ERROR_MSG}
			_name="anrede2"
			_value="Firma"
			_list="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)'},{'label':'Firma','value':'Firma'}]"
		>
			Anrede (horizontal)
		</KolInputRadio>
		<KolInputRadio
			_id="anrede"
			_disabled
			_touched
			_error={ERROR_MSG}
			_name="anrede3"
			_value="Firma"
			_list="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)'},{'label':'Firma','value':'Firma'}]"
		>
			Anrede
		</KolInputRadio>
	</div>
);
