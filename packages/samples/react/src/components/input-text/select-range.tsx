import * as React from 'react';
import { SampleDescription } from '../SampleDescription';
import { KolButtonLink, KolInputText } from '@public-ui/react-v19';

export const InputTextSelectRange = () => {
	const textInput = React.useRef<HTMLKolInputTextElement>(null);

	function setSelectioStart() {
		textInput.current?.focus();
		textInput.current?.setSelectionStart(8);
		console.log(textInput.current?._selectionStart);
		console.log(textInput.current?.selectionStart());
	}

	function setSelectionRange() {
		textInput.current?.focus();
		textInput.current?.setSelectionRange(2, 5);
		console.log(textInput.current?._selectionStart);
		console.log(textInput.current?.selectionStart());
	}

	function setRangeText() {
		textInput.current?.focus();
		textInput.current?.setRangeText('INSERTED', 5, 9, 'select');
		console.log(textInput.current?._selectionStart);
		console.log(textInput.current?.selectionStart());
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
				<KolButtonLink _label="Set Range Text" onClick={setRangeText} />
				<p>value: {textInput.current?._value}</p>
				<p>selection start: {textInput.current?._selectionStart}</p>
			</div>
		</>
	);
};
