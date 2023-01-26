import React from 'react';
import { KolBadge, KolButton, KolIndentedText, KolToast } from '@public-ui/react';
import { ComponentMeta } from '@storybook/react';
import { BikBitvTest, STORY_CONFIG } from '../../bik-bitv-test';

export default {
	...STORY_CONFIG,
	title: 'React/Toast/Beispiele',
	component: KolToast,
} as ComponentMeta<typeof KolToast>;

export const Erweitert = () => {
	return (
		<BikBitvTest _heading="Toast">
			<KolButton
				_label="Toast starten"
				_on={{
					onClick: () => {
						const toast = document.createElement('kol-toast');
						toast.setAttribute('_heading', 'Ich bin ein Toast!');
						toast.setAttribute('_level', '3');
						toast.setAttribute('_show-duration', '10000');
						toast.setAttribute('_type', 'info');
						toast.innerText = `Ich werden in 10 Sekunden automatisch wieder ausgeblendet.`;
						document.body.appendChild(toast);
					},
				}}
			></KolButton>
			<KolIndentedText>
				<KolBadge _label="TODO"></KolBadge> Hier müssen noch mehr Beispiele rein.
			</KolIndentedText>
		</BikBitvTest>
	);
};
