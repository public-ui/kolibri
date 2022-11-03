import { KolButton, KolProgress } from '@public-ui/react';
import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { STORY_CONFIG } from '../../bik-bitv-test';

export default {
	...STORY_CONFIG,
	title: 'React/Progress/Beispiele',
	component: KolProgress,
} as ComponentMeta<typeof KolProgress>;

const runProcess = (index: number) => {
	const simButtons = document.querySelectorAll('kol-button[_label="Simulation starten"]');
	const progressBars = document.querySelectorAll('kol-progress');

	let percent = 0;
	simButtons[index].setAttribute('_disabled', 'true');
	const interval = setInterval(() => {
		if (percent <= 100) {
			progressBars[index].setAttribute('_value', percent as unknown as string);
			percent += 5;
		} else {
			clearInterval(interval);
			simButtons[index].removeAttribute('_disabled');
		}
	}, 500);
};

export const Erweitert = () => {
	return (
		<div style={{ display: 'grid', gap: '0.25em' }}>
			<KolProgress></KolProgress>
			<KolButton
				_label="Simulation starten"
				_on={{
					onClick: () => {
						runProcess(0);
					},
				}}
			></KolButton>
			<KolProgress _unit="Schnitzel" _value="75" _type="cycle"></KolProgress>
			<KolButton
				_label="Simulation starten"
				_on={{
					onClick: () => {
						runProcess(1);
					},
				}}
			></KolButton>
		</div>
	);
};
