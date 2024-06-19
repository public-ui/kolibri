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
	KolTextarea,
} from '@public-ui/react';

import { SampleDescription } from '../components/SampleDescription';

import type { HTMLStencilElement } from '@stencil/core/internal';
const EventTargetContext = createContext<EventTarget | undefined>(undefined);
const EventLoggerActiveContext = createContext<boolean>(false);

type Props = {
	InputComponent: React.ComponentType<any>;
	inputProps: { [key: string]: any };
	formatter?: (value: any) => string;
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
			(event, value) => {
				if (eventLoggerActive) {
					console.log(props.inputProps._label, eventName, value, event);
				}
			},
		]),
	);

	return (
		<div className="grid grid-cols-3 items-end gap-4">
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
							This sample show how the input components <code>getValue()</code> method works. It&apos;s called when clicking the &quot;getValue()&quot; button
							and prints the current value right next to itself.
						</p>
					</SampleDescription>

					<KolCard _label="Sample options" className="block ha mb-8">
						<KolInputCheckbox
							_label="Log events to console"
							_value={true}
							_checked={eventLoggerActive}
							_on={{ onChange: (_, active) => setEventLoggerActive(active as boolean) }}
						/>
					</KolCard>

					<div className="grid gap-4">
						<Scenario InputComponent={KolInputText} inputProps={{ _label: 'InputText' }} />
						<Scenario InputComponent={KolInputCheckbox} inputProps={{ _label: 'KolInputCheckbox (value)', _value: 'Checkbox True Value' }} />
						<Scenario InputComponent={KolInputCheckbox} inputProps={{ _label: 'KolInputCheckbox (boolean)' }} />
						<Scenario InputComponent={KolInputColor} inputProps={{ _label: 'KolInputColor' }} />
						<Scenario InputComponent={KolInputDate} inputProps={{ _label: 'KolInputDate' }} />
						<Scenario InputComponent={KolInputEmail} inputProps={{ _label: 'KolInputEmail' }} />
						<Scenario
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
						<Scenario InputComponent={KolInputNumber} inputProps={{ _label: 'KolInputNumber' }} />
						<Scenario InputComponent={KolInputPassword} inputProps={{ _label: 'KolInputPassword' }} />
						<Scenario InputComponent={KolInputRange} inputProps={{ _label: 'KolInputRange' }} />
						<Scenario
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
							InputComponent={KolTextarea}
							inputProps={{
								_label: 'KolTextarea',
							}}
						/>
						<Scenario
							InputComponent={KolButton}
							inputProps={{
								_label: 'KolButton',
								_variant: 'ghost',
								_value: 'KolButton value',
							}}
						/>
						<Scenario
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
				</EventLoggerActiveContext.Provider>
			</EventTargetContext.Provider>
		</>
	);
};
