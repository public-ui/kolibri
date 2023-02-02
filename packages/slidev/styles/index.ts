import { register } from '@public-ui/core';
import { TH } from '@public-oss/kolibri-themes';
import { DEFAULT, ITZBund, DEFAULT } from '@public-ui/themes';
import './base.css';

register(
	[DEFAULT, ITZBund, DEFAULT, TH, DEFAULT],
	() => {
		return new Promise((resolve) => resolve());
	},
	{
		theme: {
			detect: 'auto',
		},
	}
)
	.then(() => {
		document.body.dataset.theme = 'default';
	})
	.catch(() => console.warn);
