import React from 'react';
import { KolVersion } from '@public-ui/react';
import { ComponentMeta } from '@storybook/react';
import { BikBitvTest, STORY_CONFIG } from '../../bik-bitv-test';

export default {
	...STORY_CONFIG,
	title: 'React/Version/Beispiele',
	component: KolVersion,
} as ComponentMeta<typeof KolVersion>;

export const Erweitert = () => {
	return (
		<div style={{ display: 'flex', gap: '0.25em' }}>
			<KolVersion _version="1.0.0-beta.0"></KolVersion>
			<KolVersion _version="1.0.0-rc.0"></KolVersion>
			<KolVersion _version="1.0.0"></KolVersion>
		</div>
	);
};
