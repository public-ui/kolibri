import { KolButton, KolInputCheckbox, KolInputNumber, KolInputText, KolSkeleton } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useState } from 'react';
import { SampleDescription } from '../components/SampleDescription';

type ComponentType = 'text' | 'number' | 'checkbox' | 'skeleton';

export const PerformanceTest: FC = () => {
	const [count, setCount] = useState<number>(100);
	const [activeComponent, setActiveComponent] = useState<ComponentType | null>(null);
	const [renderTime, setRenderTime] = useState<number | null>(null);
	const [isRendering, setIsRendering] = useState<boolean>(false);

	const handleEvents = {
		onInput: (_event: Event, value: unknown) => {
			setCount(value as number);
		},
	};

	const renderComponent = (type: ComponentType, idx: number) => {
		switch (type) {
			case 'text':
				return <KolInputText key={idx} _label={`TextInput #${idx}`} />;
			case 'number':
				return <KolInputNumber key={idx} _label={`NumberInput #${idx}`} />;
			case 'checkbox':
				return <KolInputCheckbox key={idx} _label={`Checkbox #${idx}`} />;
			case 'skeleton':
				return <KolSkeleton key={idx} _count={3} _name={`skeleton-${idx}`} />;
			default:
				return null;
		}
	};

	const renderComponents = () => {
		if (!activeComponent) return null;

		const components = [];
		for (let i = 1; i <= count; i++) {
			components.push(renderComponent(activeComponent, i));
		}
		return components;
	};

	const handleComponentRender = (type: ComponentType) => {
		setIsRendering(true);
		setRenderTime(null);
		const startTime = performance.now();

		setActiveComponent(type);

		// Verwende setTimeout um die Renderzeit nach dem nächsten Render-Zyklus zu messen
		setTimeout(() => {
			const endTime = performance.now();
			setRenderTime(endTime - startTime);
			setIsRendering(false);
		}, 0);
	};

	const handleClear = () => {
		setActiveComponent(null);
		setRenderTime(null);
		setIsRendering(false);
	};

	return (
		<>
			<SampleDescription>
				<p>This example renders many KoliBri components to show the performance. Choose a component type and set the number of instances to render.</p>
			</SampleDescription>

			<div className="w-full mb-6">
				<div className="flex flex-wrap items-end gap-4 mb-4">
					<KolInputNumber _label="Number of components" _value={count} _min={1} _max={500} _on={handleEvents} />
				</div>

				<div className="flex flex-wrap gap-4 mb-6">
					<KolButton _label="Render TextInputs" _variant="primary" onClick={() => handleComponentRender('text')} />
					<KolButton _label="Render NumberInputs" _variant="primary" onClick={() => handleComponentRender('number')} />
					<KolButton _label="Render Checkboxes" _variant="primary" onClick={() => handleComponentRender('checkbox')} />
					<KolButton _label="Render Skeletons" _variant="primary" onClick={() => handleComponentRender('skeleton')} />
					<KolButton _label="Clear" _variant="secondary" onClick={handleClear} />
				</div>
			</div>

			{activeComponent && (
				<div className="w-full mb-4">
					<p className="text-sm text-gray-600 mb-2">
						Rendering {count} {activeComponent} component{count !== 1 ? 's' : ''}
					</p>
					{isRendering && <p className="text-sm text-blue-600">⏱️ Measuring render time...</p>}
					{renderTime !== null && !isRendering && <p className="text-sm text-green-600">✅ Render time: {renderTime.toFixed(2)}ms</p>}
				</div>
			)}

			<div className="w-full grid gap-4">{renderComponents()}</div>
		</>
	);
};
