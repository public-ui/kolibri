import React, { forwardRef } from 'react';

import { KolInputRadio } from '@public-ui/react';

import { ERROR_MSG } from '../../../shares/constants';

import type { Components } from '@public-ui/components';
export const InputRadioCases = forwardRef<HTMLKolInputRadioElement, Components.KolInputRadio>(function InputRadioCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolInputRadio
				{...props}
				_options="[{'disabled':true,'label':'Frau (disabled)','value':'Frau'},{'label':'Herr'},{'label':'Firma','value':'Firma'}]"
				_label="Anrede"
			/>
			<KolInputRadio
				{...props}
				_required
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_touched
				_value="Firma"
				_options="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)','value':'Herr'},{'label':'Firma','value':'Firma'}]"
				_label="Anrede (mit Fehler)"
			/>
			<KolInputRadio
				{...props}
				ref={ref}
				_accessKey="A"
				_orientation="horizontal"
				_required
				_value="Firma"
				_options="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)'},{'label':'Firma','value':'Firma'}]"
				_label="Anrede (horizontal)"
			/>
			<KolInputRadio
				{...props}
				_disabled
				_orientation="horizontal"
				_required
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_touched
				_value="Firma"
				_options="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)'},{'label':'Firma','value':'Firma'}]"
				_label="Anrede (horizontal mit Fehler)"
			/>
			<KolInputRadio
				{...props}
				_disabled
				_value="Firma"
				_options="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)'},{'label':'Firma','value':'Firma'}]"
				_label="Anrede"
				_touched
			/>
		</div>
	);
});
