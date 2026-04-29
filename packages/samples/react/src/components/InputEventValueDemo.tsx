import { KolCard } from '@public-ui/react-v19';
import type { FC, ReactNode } from 'react';
import React, { useMemo, useState } from 'react';

type EventHandlers = {
	onChange: (_event: Event, value: unknown) => void;
	onInput: (_event: Event, value: unknown) => void;
};

type Props = {
	label: string;
	renderInput: (handlers: EventHandlers) => ReactNode;
};

export const InputEventValueDemo: FC<Props> = ({ label, renderInput }) => {
	const [changeValue, setChangeValue] = useState<unknown>('');
	const [inputValue, setInputValue] = useState<unknown>('');

	const handlers = useMemo<EventHandlers>(
		() => ({
			onChange: (_event: Event, value: unknown) => {
				setChangeValue(value);
			},
			onInput: (_event: Event, value: unknown) => {
				setInputValue(value);
			},
		}),
		[],
	);

	return (
		<KolCard _label={`Event callback demo: ${label}`} className="block mb-6">
			<div className="grid gap-4 p-4">
				{renderInput(handlers)}
				<div className="grid gap-2">
					<p>
						<strong>onInput value:</strong> <code>{JSON.stringify(inputValue)}</code>
					</p>
					<p>
						<strong>onChange value:</strong> <code>{JSON.stringify(changeValue)}</code>
					</p>
				</div>
			</div>
		</KolCard>
	);
};
