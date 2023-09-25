import React from 'react';
import { KolForm, KolInputDate } from '@public-ui/react';

import { FC } from 'react';

import { ERROR_MSG } from '../../shares/constants';

export const InputDateBasic: FC = () => (
	<KolForm>
		<div className="grid gap-4">
			<KolInputDate _id="date1" _type="date" _label="Datumseingabe" />
			<KolInputDate _id="datetime-local1" _type="datetime-local" _label="Local-Datetime (Standard)" />
			<KolInputDate _id="datetime-local2" _step={1} _type="datetime-local" _error={ERROR_MSG} _label="Local-Datetime (mit Sekunden)" />
			<KolInputDate _id="month" _type="month" _label="Monat" />
			<KolInputDate _id="week" _type="week" _label="Woche" />
			<KolInputDate _id="time" _type="time" _label="Zeit (Standard)" />
			<KolInputDate _id="time" _step={1} _type="time" _label="Zeit (mit Sekunden)" />
			<KolInputDate _id="date2" _read-only _label="Zahleneingabe (Readonly)" />
			<KolInputDate _disabled _id="date3" _label="Zahleneingabe (Disabled)" />
		</div>
	</KolForm>
);
