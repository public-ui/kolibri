import {
	KolAccordion,
	KolAlert,
	KolButton,
	KolButtonLink,
	KolDetails,
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
	KolLink,
	KolLinkButton,
	KolSelect,
	KolTextarea,
} from '@public-ui/react';
import type { FC, ForwardRefRenderFunction } from 'react';
import { useMemo } from 'react';
import React, { forwardRef, useLayoutEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

const getFocusElements = () => {
	const focusElements = new Map<string, ForwardRefRenderFunction<any, any>>();
	focusElements.set('inputCheckbox', (_, ref) => <KolInputCheckbox _name="checkbox" _label="Checkbox" ref={ref} />);
	focusElements.set('inputColor', (_, ref) => <KolInputColor _name="color" _label="Color" ref={ref} />);
	focusElements.set('inputDate', (_, ref) => <KolInputDate _name="date" _label="Date" ref={ref} />);
	focusElements.set('inputEmail', (_, ref) => <KolInputEmail _name="email" _label="Email" ref={ref} />);
	focusElements.set('inputFile', (_, ref) => <KolInputFile _name="file" _label="File" ref={ref} />);
	focusElements.set('inputFileMultiple', (_, ref) => <KolInputFile _name="file" _label="Files (multiple)" _multiple ref={ref} />);
	focusElements.set('inputNumber', (_, ref) => <KolInputNumber _name="number" _label="Number" ref={ref} />);
	focusElements.set('inputPassword', (_, ref) => <KolInputPassword _name="password" _label="Password" ref={ref} />);
	focusElements.set('inputRadio', (_, ref) => (
		<KolInputRadio
			_name="radio"
			_label="Radio"
			_options={[
				{ label: 'Option A', value: 'A' },
				{ label: 'Option B', value: 'B' },
			]}
			_value="A"
			ref={ref}
		/>
	));
	focusElements.set('inputRange', (_, ref) => <KolInputRange _name="range" _label="Range" ref={ref} />);
	focusElements.set('inputText', (_, ref) => <KolInputText _name="text" _label="Text" ref={ref} />);
	focusElements.set('select', (_, ref) => (
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
	focusElements.set('selectMultiple', (_, ref) => (
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
	focusElements.set('textarea', (_, ref) => <KolTextarea _name="textarea" _label="Textarea" _rows={5} ref={ref} />);
	focusElements.set('accordion', (_, ref) => <KolAccordion _label="Accordion here" ref={ref} />);
	focusElements.set('button', (_, ref) => <KolButton _label="Button here" ref={ref}></KolButton>);
	focusElements.set('buttonLink', (_, ref) => <KolButtonLink _label="ButtonLink here" ref={ref}></KolButtonLink>);
	focusElements.set('details', (_, ref) => (
		<KolDetails _label="Details here" ref={ref}>
			detailed details
		</KolDetails>
	));
	focusElements.set('link', (_, ref) => <KolLink _label="Link here" _href="#" ref={ref}></KolLink>);
	focusElements.set('linkButton', (_, ref) => <KolLinkButton _label="LinkButton here" _href="#" ref={ref}></KolLinkButton>);

	return focusElements;
};

type FallbackProps = {
	invalidComponent?: boolean;
};
const Fallback = (props: FallbackProps) => {
	const focusElements = useMemo(() => getFocusElements(), []);
	const componentNames = [...focusElements.keys()].map((key) => key);

	return (
		<div>
			{props.invalidComponent && (
				<KolAlert _type="error" _variant="card">
					Component not found.
				</KolAlert>
			)}

			<h4>Focus Test Cases</h4>
			<ul>
				{componentNames.map((componentName) => (
					<li key={componentName}>
						<KolLink _label={componentName} _href={`#/scenarios/focus-elements?component=${componentName}`}></KolLink>
					</li>
				))}
			</ul>
		</div>
	);
};

export const FocusElements: FC = () => {
	const ref = useRef(null);
	const focusElements = useMemo(() => getFocusElements(), []);
	const [searchParams] = useSearchParams();
	const componentName = searchParams.get('component');

	useLayoutEffect(() => {
		setTimeout(() => {
			(ref.current as unknown as HTMLElement)?.focus();
		}, 500);
	}, [ref]);

	if (componentName) {
		const Component = focusElements.get(componentName);
		if (!Component) {
			return <Fallback invalidComponent />;
		}
		const Element = forwardRef(Component);

		return <Element ref={ref} />;
	} else {
		return <Fallback />;
	}
};
