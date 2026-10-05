import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const InputTextMsgAndCounter: FC = () => (
	<div className="grid gap-4">
		<SampleDescription>
			<p>Regression sample for #9073: when both _msg and _hasCounter are set, aria-describedby must reference both the message and counter elements.</p>
			<p>Open DevTools and inspect each input to confirm aria-describedby contains both IDs.</p>
		</SampleDescription>

		<SampleBlock id="warning">
			<KolInputText _label="Warning + Counter" _msg={{ _type: 'warning', _description: 'Bitte prüfen Sie Ihre Eingabe.' }} _hasCounter _maxLength={30} />
		</SampleBlock>
		<SampleBlock id="error">
			<KolInputText
				_label="Error + Counter (touched)"
				_msg={{ _type: 'error', _description: 'Pflichtfeld – bitte ausfüllen.' }}
				_hasCounter
				_maxLength={30}
				_touched
			/>
		</SampleBlock>
		<SampleBlock id="info">
			<KolInputText _label="Info + Counter" _msg={{ _type: 'info', _description: 'Hinweis: maximal 20 Zeichen.' }} _hasCounter _maxLength={20} />
		</SampleBlock>
	</div>
);
