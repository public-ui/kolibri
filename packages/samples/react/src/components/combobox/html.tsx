import { KolCombobox } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { logKoliBriCallbackEvent, logKoliBriNativeEvent } from '../../shares/utils';
import { SampleDescription } from '../SampleDescription';

export const ComboboxHtml: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>A HTML only KolCombobox.</p>
			</SampleDescription>

			<KolCombobox
				_label="With string array in html"
				_suggestions="['Herr','Frau','Firma']"
				_value="Herr"
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
		</>
	);
};
