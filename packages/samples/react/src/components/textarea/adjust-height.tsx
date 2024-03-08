import React from 'react';

import { KolForm, KolTextarea } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

const VALUE = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
sit amet.`;

export const TextareaAdjustHeight: FC = () => (
	<>
		<SampleDescription>
			<p>Hier sind zwei Freitextfelder. Im oberen kann die Größe des Textfelds angepasst werden, im unteren nicht.</p>
		</SampleDescription>
		<KolForm className="row">
			<div className="col-sm-6">
				<KolTextarea _adjustHeight={true} _resize="vertical" _value={VALUE} _label="Texteingabe (horizontal)" />
			</div>
			<div className="col-sm-6">
				<KolTextarea _adjustHeight={true} _resize="none" _value={VALUE} _label="Texteingabe (none)" />
			</div>
		</KolForm>
	</>
);
