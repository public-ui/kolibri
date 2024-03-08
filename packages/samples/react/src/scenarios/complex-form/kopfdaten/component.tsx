import React from 'react';
import type { FC } from 'react';

import { KolAbbr, KolButton, KolInputEmail, KolInputRadio, KolInputText, KolSpin } from '@public-ui/react';

import { FromComponent } from '../common/form/component';
import { FormProps } from '../common/form/types';

export const TerminKopfdatenComponent: FC<FormProps> = (props) => (
	<FromComponent submitted={true} onSubmit={() => {}}>
		<div className="grid grid-cols-2 gap-4">
			<KolInputRadio
				_id="anrede"
				_list={[
					{ label: 'Herr', value: 'Herr' },
					{ label: 'Frau', value: 'Frau' },
				]}
				_touched={true}
			></KolInputRadio>
			<KolInputText _id="termin_kopfdaten_vorname" _type="text" _autoComplete="on" _touched={true}></KolInputText>
			<KolInputText _id="termin_kopfdaten_nachname" _type="text" _autoComplete="on" _touched={true}></KolInputText>
			<KolInputText _id="termin_kopfdaten_strasse" _type="text" _autoComplete="on" _touched={true}></KolInputText>
			<div className="grid grid-cols-6 gap-4">
				<KolInputText _id="termin_kopfdaten_plz" _type="text" _autoComplete="on" _touched={true}>
					<KolAbbr _title="Postleitzahl" _tooltipAlign="right">
						PLZ
					</KolAbbr>
				</KolInputText>
				<KolInputText _id="termin_kopfdaten_ort" _type="text" _autoComplete="on" _touched={true}></KolInputText>
			</div>
			<KolInputText
				_id="termin_kopfdaten_telefon"
				_icon="icofont-phone"
				_list={['01234 / 567890']}
				_type="tel"
				_autoComplete="on"
				_touched={true}
			></KolInputText>
			<KolInputEmail
				_id="termin_kopfdaten_email"
				_icon="icofont-email"
				_list={['elke.mustermann@test.de', 'max.mustermann@test.de']}
				_touched={true}
				_autoComplete="on"
			></KolInputEmail>
			<div>
				<KolButton className="inline-block my-1" _icon="icofont-paper-plane" _type="submit" _label="Terminanfrage absenden"></KolButton>
				<KolSpin _show={true} className="ml-4" />
			</div>
		</div>
	</FromComponent>
);
