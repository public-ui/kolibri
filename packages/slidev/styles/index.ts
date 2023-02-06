import { register } from '@public-ui/core';
import { ITZBund } from '@public-ui/themes';
import { TH } from '@public-oss/kolibri-themes';
import './base.css';

register(
	[ITZBund, TH],
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
