import * as React from 'react';
import { SampleDescription } from '../SampleDescription';
import { KolButtonLink, KolInputText } from '@public-ui/react-v19';

export const InputTextSelectRange = () => {
	const textInput = React.useRef<HTMLKolInputTextElement>(null);

	function setSelectioStart() {
		textInput.current?.focus();
		textInput.current?.setSelectionStart(8);
	}

	function setSelectionRange() {
		textInput.current?.focus();
		textInput.current?.setSelectionRange(2, 5);
	}

	return (
		<>
			<SampleDescription>
				<p>This sample shows how to change the selection in a KolInputText.</p>
			</SampleDescription>
			<div className="grid gap-4">
				<KolInputText _value="Very long value" _label="Text Input Label" ref={textInput} />
				<KolButtonLink _label="Set Start" onClick={setSelectioStart} />
				<KolButtonLink _label="Set Range" onClick={setSelectionRange} />
				<p>{textInput.current?._value}</p>
			</div>
		</>
	);
};
