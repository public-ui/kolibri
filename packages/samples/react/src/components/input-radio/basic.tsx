import React from 'react';
import { KolForm, KolInputRadio } from '@public-ui/react';

import { FC } from 'react';

import { ERROR_MSG } from '../../shares/constants';

export const InputRadioBasic: FC = () => (
	<KolForm>
		<div className="grid gap-4">
			<KolInputRadio
				_options="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)'},{'label':'Firma','value':'Firma'}]"
				_label="Anrede"
			/>
			<KolInputRadio
				_required
				_error={ERROR_MSG}
				_touched
				_value="Firma"
				_options="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)','value':'Herr'},{'label':'Firma','value':'Firma'}]"
				_label="Anrede (mit Fehler)"
			/>
			<KolInputRadio
				_orientation="horizontal"
				_required
				_value="Firma"
				_options="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)'},{'label':'Firma','value':'Firma'}]"
				_label="Anrede (horizontal)"
			/>
			<KolInputRadio
				_orientation="horizontal"
				_required
				_error={ERROR_MSG}
				_touched
				_value="Firma"
				_options="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)'},{'label':'Firma','value':'Firma'}]"
				_label="Anrede (horizontal mit Fehler)"
			/>
			<KolInputRadio
				_disabled
				_value="Firma"
				_options="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)'},{'label':'Firma','value':'Firma'}]"
				_label="Anrede (alle Optionen disabled)"
			/>
		</div>
	</KolForm>
);
