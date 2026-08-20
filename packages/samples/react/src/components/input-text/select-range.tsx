import { KolButtonLink, KolInputText } from '@public-ui/react-v19';
import * as React from 'react';
import { SampleDescription } from '../SampleDescription';

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

	function setRangeText() {
		textInput.current?.focus();
		textInput.current?.setRangeText('INSERTED', 5, 9, 'select');
	}

	return (
		<>
			<SampleDescription>
				<p>This sample shows how to change the selection in a KolInputText.</p>
			</SampleDescription>
			<div className="grid gap-4" data-visual-block="select-range">
				<KolInputText _value="Very long value" _label="Text Input Label" ref={textInput} />
				<KolButtonLink _label="Set Start" onClick={setSelectioStart} />
				<KolButtonLink _label="Set Range" onClick={setSelectionRange} />
				<KolButtonLink _label="Set Range Text" onClick={setRangeText} />
			</div>
		</>
	);
};
