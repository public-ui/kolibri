import { register } from '@public-ui/core';
import { TH } from '@public-oss/kolibri-themes';
import { BMF, BZST, DESY, ITZBund, MAPZ, ZOLL } from '@public-ui/themes';
import './base.css';

register(
	[BMF, BZST, DESY, ITZBund, MAPZ, TH, ZOLL],
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
		document.body.dataset.theme = 'bmf';
	})
	.catch(() => console.warn);
