import * as React from 'react';
import { SampleDescription } from '../SampleDescription';
import { KolButtonLink, KolInputText } from '@public-ui/react-v19';

export const InputTextSelectRange = () => {
	const textInput = React.useRef<HTMLKolInputTextElement>(null);

	const inputRef = React.useRef<HTMLInputElement>(null);

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

	React.useEffect(() => {
		if (textInput.current) {
			textInput.current.addEventListener('kolselectionchange', (ev) => console.log(ev));
		}

		// nur zum test wie an einem normalen input selectionchange läuft
		if (inputRef.current) {
			inputRef.current.addEventListener('selectionchange', (ev) => console.log(ev));
		}
	}, []);

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

				<input type="text" value="Very long value" ref={inputRef} />

				<input ref={(el) => el?.addEventListener('selectionchange', console.log)} />
			</div>
		</>
	);
};
