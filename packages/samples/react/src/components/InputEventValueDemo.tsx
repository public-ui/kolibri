import type { FC, ReactNode } from 'react';
import React, { useMemo, useState } from 'react';
import { toKebabCase } from './SampleBlock';

type EventHandlers = {
	onChange: (_event: Event, value: unknown) => void;
	onInput: (_event: Event, value: unknown) => void;
};

type Props = {
	label: string;
	/** Overrides the visual block id derived from `label`. */
	blockId?: string;
	renderInput: (handlers: EventHandlers) => ReactNode;
};

export const InputEventValueDemo: FC<Props> = ({ label, blockId, renderInput }) => {
	const [changeValue, setChangeValue] = useState<unknown>(null);
	const [inputValue, setInputValue] = useState<unknown>(null);

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
		<section className="grid gap-4 mb-6" aria-label={`Event callback demo: ${label}`} data-visual-block={blockId ?? toKebabCase(label)}>
			{renderInput(handlers)}
			<div className="grid gap-2">
				<p>
					<strong>onInput value:</strong> <code>{JSON.stringify(inputValue)}</code>
				</p>
				<p>
					<strong>onChange value:</strong> <code>{JSON.stringify(changeValue)}</code>
				</p>
			</div>
		</section>
	);
};
