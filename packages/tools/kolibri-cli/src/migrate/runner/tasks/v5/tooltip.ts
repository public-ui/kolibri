import { RemoveTagNameTask } from '../common/RemoveTagNameTask';

export const RemoveTagNameKolTooltipWc = RemoveTagNameTask.getInstance(
	'kol-tooltip-wc',
	'^5',
	[],
	{},
	'Tooltips rendered by other KoliBri components (for example label hints) are not affected.',
);
