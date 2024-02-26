import { register } from 'adopted-style-sheets';
import { KoliBri } from '@public-ui/schema';

export default (): void => {
	register(
		[
			KoliBri.createTheme('{{kebab name}}', {
				'KOL-BUTTON': `button {
			background-color: #000;
			color: #fff;
			padding: .5em .75em;
		}`,
			}),
		],
		[],
		{
			theme: {
				detect: 'fixed',
				name: '{{kebab name}}',
			},
		},
	).catch(console.warn);
};
