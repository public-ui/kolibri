import {
	KolInputCheckbox,
	KolInputColor,
	KolInputDate,
	KolInputEmail,
	KolInputFile,
	KolInputNumber,
	KolInputPassword,
	KolInputRadio,
	KolInputRange,
	KolInputText,
	KolSelect,
	KolTextarea,
} from '@public-ui/react';
import type { FC, ForwardRefRenderFunction } from 'react';
import React, { forwardRef, useLayoutEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

const focusElements = new Map<string, ForwardRefRenderFunction<HTMLElement, any>>();
focusElements.set('inputCheckbox', (props, ref) => <KolInputCheckbox _name="checkbox" _label="Checkbox" ref={ref} />);
focusElements.set('inputColor', (props, ref) => <KolInputColor _name="color" _label="Color" ref={ref} />);
focusElements.set('inputDate', (props, ref) => <KolInputDate _name="date" _label="Date" ref={ref} />);
focusElements.set('inputEmail', (props, ref) => <KolInputEmail _name="email" _label="Email" ref={ref} />);
focusElements.set('inputFile', (props, ref) => <KolInputFile _name="file" _label="File" ref={ref} />);
focusElements.set('inputFileMultiple', (props, ref) => <KolInputFile _name="file" _label="Files (multiple)" _multiple ref={ref} />);
focusElements.set('inputNumber', (props, ref) => <KolInputNumber _name="number" _label="Number" ref={ref} />);
focusElements.set('inputPassword', (props, ref) => <KolInputPassword _name="password" _label="Password" ref={ref} />);
focusElements.set('inputRadio', (props, ref) => (
	<KolInputRadio
		_name="radio"
		_label="Radio"
		_options={[
			{ label: 'Option A', value: 'A' },
			{ label: 'Option B', value: 'B' },
		]}
		ref={ref}
	/>
));
focusElements.set('inputRange', (props, ref) => <KolInputRange _name="range" _label="Range" ref={ref} />);
focusElements.set('inputText', (props, ref) => <KolInputText _name="text" _label="Text" ref={ref} />);
focusElements.set('select', (props, ref) => (
	<KolSelect
		_name="select"
		_label="Select"
		_options={[
			{ label: 'Option A', value: 'A' },
			{ label: 'Option B', value: 'B' },
		]}
		ref={ref}
	/>
));
focusElements.set('selectMultiple', (props, ref) => (
	<KolSelect
		_name="select"
		_label="Select (multiple)"
		_multiple
		_options={[
			{ label: 'Option A', value: 'A' },
			{ label: 'Option B', value: 'B' },
		]}
		_rows={2}
		ref={ref}
	/>
));
focusElements.set('textarea', (props, ref) => <KolTextarea _name="textarea" _label="Textarea" _rows={5} ref={ref} />);

export const FocusElements: FC = () => {
	const ref = useRef(null);

	const [searchParams, setSearchParams] = useSearchParams();
	const componentName = searchParams.get('component');

	useLayoutEffect(() => {
		setTimeout(() => {
			(ref.current as unknown as HTMLElement)?.focus();
		}, 500);
	}, [ref]);

	if (componentName) {
		const Component = focusElements.get(componentName);
		if (!Component) {
			throw new Error('Component not found:', componentName);
		}
		const Element = forwardRef(Component);

		return <Element ref={ref} />;
	} else {
		return <>Select component</>;
	}
};
