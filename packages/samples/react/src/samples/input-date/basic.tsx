import React from 'react';
import { KolInputDate } from '@public-ui/react';

import { FC } from 'react';

import { ERROR_MSG } from '../../shares/constants';

export const InputDateBasic: FC = () => (
	<div className="grid gap-4">
		<KolInputDate _id="date1" _type="date">
			Datumseingabe
		</KolInputDate>
		<KolInputDate _id="datetime-local1" _type="datetime-local">
			Local-Datetime (Standard)
		</KolInputDate>
		<KolInputDate _id="datetime-local2" _step={1} _type="datetime-local" _error={ERROR_MSG}>
			Local-Datetime (mit Sekunden)
		</KolInputDate>
		<KolInputDate _id="month" _type="month">
			Monat
		</KolInputDate>
		<KolInputDate _id="week" _type="week">
			Woche
		</KolInputDate>
		<KolInputDate _id="time" _type="time">
			Zeit (Standard)
		</KolInputDate>
		<KolInputDate _id="time" _step={1} _type="time">
			Zeit (mit Sekunden)
		</KolInputDate>
		<KolInputDate _id="date2" _read-only>
			Zahleneingabe (Readonly)
		</KolInputDate>
		<KolInputDate _disabled _id="date3">
			Zahleneingabe (Disabled)
		</KolInputDate>
	</div>
);
