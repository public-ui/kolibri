import React from 'react';

import { KolForm, KolTextarea } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';
//Umrandung im Reactsample wird nicht angepasst bei Anpassung des Textfelds. Bug?.
export const TextareaResize: FC = () => (
	<>
		<SampleDescription>
			<p>Diese Freitextfelder können in die beschriebenen Richtungen angepasst werden. Die Umrandung ändert sich dabei nicht.</p>
		</SampleDescription>
		<KolForm className="grid gap-4">
			<KolTextarea _resize="both" _label="Texteingabe (both)" />
			<KolTextarea _resize="vertical" _label="Texteingabe (vertical)" />
			<KolTextarea _resize="horizontal" _label="Texteingabe (horizontal)" />
			<KolTextarea _resize="none" _label="Texteingabe (none)" />
		</KolForm>
	</>
);
