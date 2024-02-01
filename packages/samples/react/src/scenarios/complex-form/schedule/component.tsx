import React, { FC } from 'react';

import { KolButton, KolInputDate, KolSpin } from '@public-ui/react';

import { FromComponent } from '../common/form/component';
import { FormProps } from '../common/form/types';

export const TerminScheduleComponent: FC<FormProps> = (props) => (
	<FromComponent submitted={true} onSubmit={() => {}}>
		<div className="grid sm:grid-cols-1 xl:grid-cols-2 gap-2 my-2">
			<KolInputDate _id="termin-schedule-schedule" _type="date" _touched={true}></KolInputDate>
			<KolInputDate _id="termin-schedule-time" _type="time" _touched={true}></KolInputDate>
		</div>
		<KolButton className="inline-block my-1" _icon="icofont-arrow-right" _iconAlign="right" _label="Zu den Kontaktdaten" _type="submit"></KolButton>
		<KolSpin _show={true} className="ml-4" />
	</FromComponent>
);
