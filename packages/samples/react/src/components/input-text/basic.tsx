import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { logKoliBriCallbackEvent, logKoliBriNativeEvent } from '../../shares/utils';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const InputTextBasic: FC = () => (
	<div className="grid gap-4">
		<SampleDescription>
			<p>
				This story showcases the most important InputText variants: default, required, validation error, disabled, read-only, search with clear button, and with
				icons.
			</p>
		</SampleDescription>

		<SampleBlock id="events">
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
		</SampleBlock>
		<SampleBlock id="error">
			<KolInputText _label="Name" _required _msg={{ _type: 'error', _description: 'Please enter your name' }} _touched />
		</SampleBlock>
		<SampleBlock id="hint">
			<KolInputText _label="Name" _required _hint="Enter your surname" />
		</SampleBlock>
		<SampleBlock id="disabled">
			<KolInputText _label="Name" _value="Anderson-Clark" _disabled />
		</SampleBlock>
		<SampleBlock id="info-popover">
			<KolInputText
				_label="Name"
				_required
				_value="Anderson-Clark"
				_infoPopover={{ _label: 'hint', _content: 'Ich bin ein Hinweis.', _icons: 'kolicon-alert-info' }}
			/>
		</SampleBlock>
		<SampleBlock id="readonly-popover">
			<KolInputText
				_label="Name"
				_readOnly
				_value="Anderson-Clark"
				_infoPopover={{ _label: 'hint', _content: 'Ich bin ein Hinweis.', _icons: 'kolicon-alert-info' }}
			/>
		</SampleBlock>
		<SampleBlock id="icon">
			<KolInputText _label="Name" _icons="kolicon-house" _value="Anderson-Clark" />
		</SampleBlock>
		<SampleBlock id="search">
			<KolInputText _label="Search" _type="search" _value="test" _placeholder="Search with clear button" />
		</SampleBlock>
	</div>
);
