import type { FC } from 'react';
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

import {
	KolButton,
	KolButtonLink,
	KolCard,
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
	KolSingleSelect,
	KolCombobox,
	KolTextarea,
} from '@public-ui/react';

import { SampleDescription } from '../components/SampleDescription';
import { COUNTRY_SUGGESTIONS } from '../shares/country';

import type { HTMLStencilElement } from '@stencil/core/internal';
import type { W3CInputValue } from '@public-ui/components';

const EventTargetContext = createContext<EventTarget | undefined>(undefined);
const EventLoggerActiveContext = createContext<boolean>(false);

type Props = {
	InputComponent: React.ComponentType<any>;
	inputProps: { [key: string]: any };
	formatter?: (value: any) => string;
	testId?: string;
};
const Scenario = (props: Props) => {
	const ref = useRef<HTMLStencilElement & { getValue: () => Promise<any> }>();
	const [value, setValue] = useState<unknown>(undefined);
	const formatter = props.formatter || JSON.stringify;
	const eventTarget = useContext(EventTargetContext);
	const eventLoggerActive = useContext(EventLoggerActiveContext);

	const handleButtonClick = async () => {
		setValue(await ref.current?.getValue());
	};

	useEffect(() => {
		const handleRunAll = () => {
			void handleButtonClick();
		};
		eventTarget?.addEventListener('runAll', handleRunAll);

		return () => {
			eventTarget?.removeEventListener('runAll', handleRunAll);
		};
	}, [eventTarget]);

	const eventListeners = Object.fromEntries(
		['onInput', 'onChange', 'onBlur', 'onClick', 'onFocus', 'onMouseDown'].map((eventName) => [
			eventName,
			(event: Event, value: W3CInputValue) => {
				if (eventLoggerActive) {
					console.log(props.inputProps._label, eventName, value, event);
				}
			},
		]),
	);

	return (
		<div className="grid grid-cols-3 items-end gap-4" data-testid={props.testId}>
			<props.InputComponent ref={ref} _on={eventListeners} {...props.inputProps} />
			<KolButton
				_label="getValue()"
				_on={{
					onClick: () => {
						void handleButtonClick();
					},
				}}
			></KolButton>
			<pre>{formatter(value)}</pre>
		</div>
	);
};

export const InputsGetValue: FC = () => {
	const eventTarget = useMemo(() => new EventTarget(), []);
	const [eventLoggerActive, setEventLoggerActive] = useState<boolean>(true);

	return (
		<>
			<EventTargetContext.Provider value={eventTarget}>
				<EventLoggerActiveContext.Provider value={eventLoggerActive}>
					<SampleDescription>
						<p>
							This sample shows how the input components <code>getValue()</code> method works. It&apos;s called when clicking the &quot;getValue()&quot; button
							and prints the current value right next to itself.
						</p>
					</SampleDescription>

					<section className="w-full flex flex-col">
						<KolCard _label="Sample options" className="block ha mb-8">
							<KolInputCheckbox
								_label="Log events to console"
								_value={true}
								_checked={eventLoggerActive}
								_on={{ onChange: (_, active) => setEventLoggerActive(active as boolean) }}
							/>
						</KolCard>

						<div className="grid gap-4">
							<Scenario testId="scenario-inputText" InputComponent={KolInputText} inputProps={{ _label: 'InputText' }} />
							<Scenario
								testId="scenario-inputCheckboxString"
								InputComponent={KolInputCheckbox}
								inputProps={{ _label: 'KolInputCheckbox (value)', _value: 'Checkbox True Value' }}
							/>
							<Scenario testId="scenario-inputCheckboxBoolean" InputComponent={KolInputCheckbox} inputProps={{ _label: 'KolInputCheckbox (boolean)' }} />
							<Scenario testId="scenario-inputColor" InputComponent={KolInputColor} inputProps={{ _label: 'KolInputColor' }} />
							<Scenario testId="scenario-inputDate" InputComponent={KolInputDate} inputProps={{ _label: 'KolInputDate' }} />
							<Scenario testId="scenario-inputEmail" InputComponent={KolInputEmail} inputProps={{ _label: 'KolInputEmail' }} />
							<Scenario
								testId="scenario-inputFile"
								InputComponent={KolInputFile}
								inputProps={{ _label: 'KolInputFile' }}
								formatter={(value) =>
									value instanceof FileList
										? `FileList{${Array.from(value)
												.map((file: File) => file.name)
												.join(', ')}}`
										: JSON.stringify(value)
								}
							/>
							<Scenario testId="scenario-inputNumber" InputComponent={KolInputNumber} inputProps={{ _label: 'KolInputNumber' }} />
							<Scenario testId="scenario-inputPassword" InputComponent={KolInputPassword} inputProps={{ _label: 'KolInputPassword' }} />
							<Scenario testId="scenario-inputRange" InputComponent={KolInputRange} inputProps={{ _label: 'KolInputRange' }} />
							<Scenario
								testId="scenario-inputRadio"
								InputComponent={KolInputRadio}
								inputProps={{
									_label: 'KolInputRadio',
									_orientation: 'horizontal',
									_options: [
										{ label: 'New York', value: 'New York' },
										{ label: 'Rio de Janeiro', value: 'Rio de Janeiro' },
										{ label: 'Rosenheim', value: 'Rosenheim' },
									],
									_value: 'New York',
								}}
							/>
							<Scenario
								testId="scenario-select"
								InputComponent={KolSelect}
								inputProps={{
									_label: 'KolSelect',
									_options: [
										{ label: 'New York', value: 'New York' },
										{ label: 'Rio de Janeiro', value: 'Rio de Janeiro' },
										{ label: 'Rosenheim', value: 'Rosenheim' },
									],
								}}
							/>
							<Scenario
								testId="scenario-singleSelect"
								InputComponent={KolSingleSelect}
								inputProps={{
									_label: 'KolSingleSelect',
									_options: [
										{ label: 'New York', value: 'New York' },
										{ label: 'Rio de Janeiro', value: 'Rio de Janeiro' },
										{ label: 'Rosenheim', value: 'Rosenheim' },
									],
									_value: 'Rosenheim',
								}}
							/>
							<Scenario
								testId="scenario-combobox"
								InputComponent={KolCombobox}
								inputProps={{
									_label: 'KolCombobox',
									_suggestions: COUNTRY_SUGGESTIONS,
									_value: 'Deutschland',
								}}
							/>
							<Scenario
								testId="scenario-textarea"
								InputComponent={KolTextarea}
								inputProps={{
									_label: 'KolTextarea',
								}}
							/>
							<Scenario
								testId="scenario-button"
								InputComponent={KolButton}
								inputProps={{
									_label: 'KolButton',
									_variant: 'ghost',
									_value: 'KolButton value',
								}}
							/>
							<Scenario
								testId="scenario-buttonLink"
								InputComponent={KolButtonLink}
								inputProps={{
									_label: 'KolButtonLink',
									_value: 'KolButtonLink value',
								}}
							/>

							<div className="grid grid-cols-3 gap-4">
								<div></div>
								<KolButton
									_label="Run all"
									_variant="primary"
									_on={{
										onClick: () => {
											eventTarget.dispatchEvent(new Event('runAll'));
										},
									}}
								></KolButton>
							</div>
						</div>
					</section>
				</EventLoggerActiveContext.Provider>
			</EventTargetContext.Provider>
		</>
	);
};
