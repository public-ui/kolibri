import { register } from '@public-ui/core';
import { BMF, DESYv2, ITZBund, MAPZ, ZOLLv2 } from '@public-ui/themes';
import { TH } from '@public-oss/kolibri-themes';
import './base.css';

register(
	[BMF, DESYv2, ITZBund, MAPZ, ZOLLv2, TH],
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
