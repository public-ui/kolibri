import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputTextMsgAndCounter: FC = () => (
	<>
		<SampleDescription>
			<p>Regression sample for #9073: when both _msg and _hasCounter are set, aria-describedby must reference both the message and counter elements.</p>
			<p>Open DevTools and inspect each input to confirm aria-describedby contains both IDs.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolInputText _label="Warning + Counter" _msg={{ _type: 'warning', _description: 'Bitte prüfen Sie Ihre Eingabe.' }} _hasCounter _maxLength={30} />
			<KolInputText _label="Error + Counter (touched)" _msg={{ _type: 'error', _description: 'Pflichtfeld – bitte ausfüllen.' }} _hasCounter _maxLength={30} _touched />
			<KolInputText _label="Info + Counter" _msg={{ _type: 'info', _description: 'Hinweis: maximal 20 Zeichen.' }} _hasCounter _maxLength={20} />
		</div>
	</>
);
