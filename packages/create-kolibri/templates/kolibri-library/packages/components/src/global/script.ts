import { register } from '@a11y-ui/core';
import { KoliBri } from '@public-ui/schema';

// ts-prune-ignore-next
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
		}
	).catch(console.warn);
};
