import React from 'react';
import { KolButton, KolSpin } from '@public-ui/react';
import { ComponentMeta } from '@storybook/react';
import { BikBitvTest, STORY_CONFIG } from '../../bik-bitv-test';

export default {
	...STORY_CONFIG,
	title: 'React/Spin/Beispiele',
	component: KolSpin,
} as ComponentMeta<typeof KolSpin>;

export const Erweitert = () => {
	return (
		<BikBitvTest _heading="Spin">
			<KolButton
				_label="Aktion ausführen"
				_on={{
					onClick: () => {
						var spins = document.querySelectorAll('kol-spin');
						spins.forEach((spin) => {
							spin.removeAttribute('style');
							spin.setAttribute('_show', 'true');
						});
						let timeout = setTimeout(() => {
							clearTimeout(timeout);
							spins.forEach((spin) => {
								spin.removeAttribute('_show');
							});
						}, 7500);
					},
				}}
			></KolButton>
			<KolSpin></KolSpin>
		</BikBitvTest>
	);
};
