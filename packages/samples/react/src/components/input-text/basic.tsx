import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { logKoliBriCallbackEvent, logKoliBriNativeEvent } from '../../shares/utils';
import { SampleDescription } from '../SampleDescription';

export const InputTextBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				This story showcases the most important InputText variants: default, required, validation error, disabled, read-only, search with clear button, and with
				icons.
			</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolInputText
				_label="Name"
				_value="Anderson-Clark"
				_on={{
					onBlur: logKoliBriCallbackEvent,
					onChange: logKoliBriCallbackEvent,
					onClick: logKoliBriCallbackEvent,
					onFocus: logKoliBriCallbackEvent,
					onInput: logKoliBriCallbackEvent,
					onKeyDown: logKoliBriCallbackEvent,
				}}
				onBlur={logKoliBriNativeEvent}
				onChange={logKoliBriNativeEvent}
				onClick={logKoliBriNativeEvent}
				onFocus={logKoliBriNativeEvent}
				onInput={logKoliBriNativeEvent}
				onKeyDown={logKoliBriNativeEvent}
			/>
			<KolInputText _label="Name" _required _msg={{ _type: 'error', _description: 'Please enter your name' }} _touched />
			<KolInputText _label="Name" _required _hint="Enter your surname" />
			<KolInputText _label="Name" _value="Anderson-Clark" _disabled />
			<KolInputText
				_label="Name"
				_required
				_value="Anderson-Clark"
				_infoPopover={{ _label: 'hint', _content: 'Ich bin ein Hinweis.', _icons: 'kolicon-alert-info' }}
			/>
			<KolInputText
				_label="Name"
				_readOnly
				_value="Anderson-Clark"
				_infoPopover={{ _label: 'hint', _content: 'Ich bin ein Hinweis.', _icons: 'kolicon-alert-info' }}
			/>
			<KolInputText _label="Name" _icons="kolicon-house" _value="Anderson-Clark" />
			<KolInputText _label="Search" _type="search" _value="test" _placeholder="Search with clear button" />
		</div>
	</>
);
