import { KolButtonLink, KolInputText } from '@public-ui/react-v19';
import * as React from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputTextSelectRange = () => {
	type InputTextHandle = {
		focus: () => void;
		setSelectionStart: (start: number) => void;
		setSelectionRange: (start: number, end: number) => void;
		setRangeText: (replacement: string, start: number, end: number, selectionMode?: SelectionMode) => void;
	};
	const isInputHandle = (element: unknown): element is InputTextHandle => {
		return (
			typeof (element as InputTextHandle)?.focus === 'function' &&
			typeof (element as InputTextHandle)?.setSelectionStart === 'function' &&
			typeof (element as InputTextHandle)?.setSelectionRange === 'function' &&
			typeof (element as InputTextHandle)?.setRangeText === 'function'
		);
	};
	const textInput = React.useRef<unknown>(null);

	function setSelectioStart() {
		if (isInputHandle(textInput.current)) {
			textInput.current.focus();
			textInput.current.setSelectionStart(8);
		}
	}

	function setSelectionRange() {
		if (isInputHandle(textInput.current)) {
			textInput.current.focus();
			textInput.current.setSelectionRange(2, 5);
		}
	}

	function setRangeText() {
		if (isInputHandle(textInput.current)) {
			textInput.current.focus();
			textInput.current.setRangeText('INSERTED', 5, 9, 'select');
		}
	}

	return (
		<>
			<SampleDescription>
				<p>This sample shows how to change the selection in a KolInputText.</p>
			</SampleDescription>
			<div className="grid gap-4">
				<KolInputText _value="Very long value" _label="Text Input Label" ref={(element) => (textInput.current = element)} />
				<KolButtonLink _label="Set Start" onClick={setSelectioStart} />
				<KolButtonLink _label="Set Range" onClick={setSelectionRange} />
				<KolButtonLink _label="Set Range Text" onClick={setRangeText} />
			</div>
		</>
	);
};
