import React from 'react';
import type { FC } from 'react';

import { KolButton, KolSelect, KolSpin } from '@public-ui/react';

import { FromComponent } from '../common/form/component';
import { FormProps } from '../common/form/types';
import { LOCATION_OPTIONS } from './location.form';

export const TerminLocationComponent: FC<FormProps> = () => (
	<FromComponent submitted={true} onSubmit={() => {}}>
		<div className="grid sm:grid-cols-1 xl:grid-cols-2 gap-2 my-2">
			<KolSelect _id="termin-location-location" _list={LOCATION_OPTIONS} _touched={true}></KolSelect>
		</div>
		<KolButton className="inline-block my-1" _icon="icofont-arrow-right" _iconAlign="right" _label="Zur Terminauswahl" _type="submit"></KolButton>
		<KolSpin _show={true} className="ml-4" />
	</FromComponent>
);
