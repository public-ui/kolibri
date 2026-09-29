import type { FocusableElement } from '@public-ui/components';
import {
	KolAccordion,
	KolAlert,
	KolBadge,
	KolButton,
	KolButtonLink,
	KolCard,
	KolCombobox,
	KolDetails,
	KolHeading,
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
	KolPopoverButton,
	KolSelect,
	KolSingleSelect,
	KolSkipNav,
	KolSplitButton,
	KolTabs,
	KolTextarea,
	KolToolbar,
	KolTree,
	KolTreeItem,
} from '@public-ui/react-v19';
import type { FC, ForwardRefRenderFunction } from 'react';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { SampleDescription } from '../components/SampleDescription';

type FocusElementProps = {
	disabled?: boolean;
};

/**
 * Elements with a disabled state. `?component=<name>&disabled` renders them disabled and focused, so
 * the visual tests show the focus ring on the disabled look of every element.
 */
const DISABLED_ELEMENTS = new Set([
	'accordion',
	'badge',
	'button',
	'buttonLink',
	'combobox',
	'details',
	'inputCheckbox',
	'inputColor',
	'inputDate',
	'inputEmail',
	'inputFile',
	'inputFileMultiple',
	'inputNumber',
	'inputPassword',
	'inputRadio',
	'inputRange',
	'inputText',
	'link',
	'linkButton',
	'popoverButton',
	'select',
	'selectMultiple',
	'singleSelect',
	'splitButton',
	'textarea',
	'toolbar',
]);

const getFocusElements = () => {
	// Blocklist: Components excluded from focus testing (breadcrumb, dialog, drawer, form, modal, nav, pagination)
	// These components have special behaviors (navigation, modals, forms, pagination) that conflict with automated focus tests.
	// Note: popover-based components (e.g. popoverButton, splitButton) are included since their primary button element is focusable.
	const focusElements = new Map<string, ForwardRefRenderFunction<any, FocusElementProps>>();
	focusElements.set('accordion', ({ disabled }, ref) => <KolAccordion _disabled={disabled} className="w-full" _label="Accordion here" ref={ref} />);
	focusElements.set('badge', ({ disabled }, ref) => (
		<KolBadge
			className="w-full"
			_label="Badge with button"
			_smartButton={{ _disabled: disabled, _label: 'Action', _icons: 'kolicon-house', _on: { onClick: () => {} } }}
			ref={ref}
		/>
	));
	focusElements.set('button', ({ disabled }, ref) => <KolButton _disabled={disabled} _label="Button here" ref={ref} />);
	focusElements.set('buttonLink', ({ disabled }, ref) => <KolButtonLink _disabled={disabled} _label="ButtonLink here" ref={ref} />);
	focusElements.set('card', (_, ref) => <KolCard className="w-full" _label="Card with link here" _href="#" ref={ref} />);
	focusElements.set('combobox', ({ disabled }, ref) => (
		<KolCombobox _disabled={disabled} className="w-full" _label="KolCombobox here" _suggestions={[]} ref={ref} />
	));
	focusElements.set('details', ({ disabled }, ref) => (
		<KolDetails _disabled={disabled} className="w-full" _label="Details here" ref={ref}>
			detailed details
		</KolDetails>
	));
	focusElements.set('inputCheckbox', ({ disabled }, ref) => (
		<KolInputCheckbox _disabled={disabled} className="w-full" _name="checkbox" _label="Checkbox" ref={ref} />
	));
	focusElements.set('inputColor', ({ disabled }, ref) => <KolInputColor _disabled={disabled} className="w-full" _name="color" _label="Color" ref={ref} />);
	focusElements.set('inputDate', ({ disabled }, ref) => <KolInputDate _disabled={disabled} className="w-full" _name="date" _label="Date" ref={ref} />);
	focusElements.set('inputEmail', ({ disabled }, ref) => <KolInputEmail _disabled={disabled} className="w-full" _name="email" _label="Email" ref={ref} />);
	focusElements.set('inputFile', ({ disabled }, ref) => <KolInputFile _disabled={disabled} className="w-full" _name="file" _label="File" ref={ref} />);
	focusElements.set('inputFileMultiple', ({ disabled }, ref) => (
		<KolInputFile _disabled={disabled} className="w-full" _name="file" _label="Files (multiple)" _multiple ref={ref} />
	));
	focusElements.set('inputNumber', ({ disabled }, ref) => <KolInputNumber _disabled={disabled} className="w-full" _name="number" _label="Number" ref={ref} />);
	focusElements.set('inputPassword', ({ disabled }, ref) => (
		<KolInputPassword _disabled={disabled} className="w-full" _name="password" _label="Password" ref={ref} />
	));
	focusElements.set('inputRadio', ({ disabled }, ref) => (
		<KolInputRadio
			_disabled={disabled}
			className="w-full"
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
	focusElements.set('inputRange', ({ disabled }, ref) => <KolInputRange _disabled={disabled} className="w-full" _name="range" _label="Range" ref={ref} />);
	focusElements.set('inputText', ({ disabled }, ref) => <KolInputText _disabled={disabled} className="w-full" _name="text" _label="Text" ref={ref} />);
	focusElements.set('link', ({ disabled }, ref) => <KolLink _disabled={disabled} className="w-full" _label="Link here" _href="#" ref={ref} />);
	focusElements.set('linkButton', ({ disabled }, ref) => (
		<div>
			<KolLinkButton _disabled={disabled} _label="LinkButton here" _href="#" ref={ref} />
		</div>
	));
	focusElements.set('popoverButton', ({ disabled }, ref) => <KolPopoverButton _disabled={disabled} _label="PopoverButton here" ref={ref} />);
	focusElements.set('select', ({ disabled }, ref) => (
		<KolSelect
			_disabled={disabled}
			className="w-full"
			_name="select"
			_label="Select"
			_options={[
				{ label: 'Option A', value: 'A' },
				{ label: 'Option B', value: 'B' },
			]}
			ref={ref}
		/>
	));
	focusElements.set('selectMultiple', ({ disabled }, ref) => (
		<KolSelect
			_disabled={disabled}
			className="w-full"
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
	focusElements.set('singleSelect', ({ disabled }, ref) => (
		<KolSingleSelect
			_disabled={disabled}
			className="w-full"
			_name="singleSelect"
			_label="Single Select"
			_options={[
				{ label: 'Option A', value: 'A' },
				{ label: 'Option B', value: 'B' },
			]}
			ref={ref}
		/>
	));
	focusElements.set('skipNav', (_, ref) => (
		<KolSkipNav
			_label="SkipNav"
			_links={[
				{
					_label: 'Skip to main content',
					_href: '#main',
				},
			]}
			ref={ref}
		/>
	));
	focusElements.set('splitButton', ({ disabled }, ref) => <KolSplitButton _disabled={disabled} _label="SplitButton here" ref={ref} />);
	focusElements.set('tabs', (_, ref) => (
		<KolTabs className="w-full" _label="Tabs here" _tabs={[{ _label: 'Tab 1' }, { _label: 'Tab 2' }, { _label: 'Tab 3' }]} ref={ref}>
			Tab content
		</KolTabs>
	));
	focusElements.set('textarea', ({ disabled }, ref) => (
		<KolTextarea _disabled={disabled} className="w-full" _name="textarea" _label="Textarea" _rows={5} ref={ref} />
	));
	focusElements.set('toolbar', ({ disabled }, ref) => (
		<KolToolbar
			className="w-full"
			_label="Toolbar here"
			_items={[
				{ type: 'button', _disabled: disabled, _label: 'Action 1' },
				{ type: 'button', _disabled: disabled, _label: 'Action 2' },
			]}
			ref={ref}
		/>
	));
	focusElements.set('tree', (_, ref) => (
		<KolTree className="w-full" _label="Tree here" ref={ref}>
			<KolTreeItem _label="1 Home" _href="#" />
			<KolTreeItem _label="2 Products" _href="#" _open>
				<KolTreeItem _label="2.1 Electronics" _href="#" />
				<KolTreeItem _label="2.2 Furniture" _href="#" />
			</KolTreeItem>
			<KolTreeItem _label="3 Services" _href="#" />
		</KolTree>
	));

	return focusElements;
};

type FallbackProps = {
	invalidComponent?: boolean;
};
const Fallback = (props: FallbackProps) => {
	const focusElements = useMemo(() => getFocusElements(), []);
	const componentNames = [...focusElements.keys()].map((key) => key);

	return (
		<>
			<SampleDescription>
				<p>
					This sample serves for automated tests of the focus state for input components. When loading one of the examples linked below, focus will be set on
					the element initially. When testing manually, you may have to reload the page after opening an example.
				</p>
				<p>The disabled variants render the element disabled and focused: a disabled element stays focusable and shows its focus indicator.</p>
			</SampleDescription>

			{props.invalidComponent && (
				<KolAlert _type="error" _variant="card">
					Component not found.
				</KolAlert>
			)}

			<KolHeading _level={2} _label="Focus Test Cases" />
			<ul>
				{componentNames.map((componentName) => (
					<li key={componentName}>
						<KolLink _label={componentName} _href={`#/scenarios/focus-elements?component=${componentName}`} />
						{DISABLED_ELEMENTS.has(componentName) && (
							<>
								{' '}
								<KolLink _label={`${componentName} (disabled)`} _href={`#/scenarios/focus-elements?component=${componentName}&disabled`} />
							</>
						)}
					</li>
				))}
			</ul>
		</>
	);
};

export const FocusElements: FC = () => {
	const focusElements = useMemo(() => getFocusElements(), []);
	const [searchParams] = useSearchParams();
	const componentName = searchParams.get('component');
	const disabled = searchParams.has('disabled') && componentName !== null && DISABLED_ELEMENTS.has(componentName);

	const Component = componentName ? focusElements.get(componentName) : undefined;

	// Memoize the Element component type to prevent unnecessary unmount/remount on re-renders.
	const Element = useMemo(() => (Component ? forwardRef(Component) : null), [Component]);

	// Callback ref fires whenever a component instance mounts, ensuring focus is set on each mount.
	const focusRef = useCallback(
		(instance: FocusableElement | null) => {
			if (instance) {
				void instance.focus();
			}
		},
		[componentName, disabled],
	);

	if (componentName) {
		if (!Element) {
			return <Fallback invalidComponent />;
		}
		return (
			<div>
				<Element key={String(disabled)} disabled={disabled} ref={focusRef} />
			</div>
		);
	} else {
		return <Fallback />;
	}
};
