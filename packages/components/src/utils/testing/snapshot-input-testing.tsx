import type { ElementProps, ElementTag } from './snapshot-testing';
import { executeSnapshotTests } from './snapshot-testing';

export function executeInputSnapshotTests<Tag extends ElementTag>(
	ComponentName: Tag,
	components: unknown[],
	extendedProps?: ElementProps<Tag>,
	options: { hasSmartButton?: boolean } = {},
) {
	const baseObj: unknown = {
		_label: 'Label',
		_name: 'field',
		_placeholder: 'Hier steht ein Platzhaltertext',

		...extendedProps,
	};

	type Props = ElementProps<Tag>;

	const propVariants: Props[] = [
		{ ...(baseObj as Props) },
		{ ...(baseObj as Props), _accessKey: 'V' },
		{ ...(baseObj as Props), _shortKey: 'S' },
		{ ...(baseObj as Props), _alert: true },
		{ ...(baseObj as Props), _readOnly: true },
		{ ...(baseObj as Props), _disabled: true },
		{ ...(baseObj as Props), _msg: { _type: 'error', _description: 'Es ist ein Fehler aufgetreten' } },
		{
			...(baseObj as Props),
			_msg: { _type: 'error', _description: 'Es ist ein Fehler aufgetreten' },
			_hideMsg: true,
			_touched: true,
		},
		{ ...(baseObj as Props), _hint: 'Hint' },
		{ ...(baseObj as Props), _touched: true },
		{
			...(baseObj as Props),
			_icons: {
				left: {
					icon: 'codicon codicon-arrow-left',
				},
			},
		},
		{
			...(baseObj as Props),
			_icons: {
				right: {
					icon: 'codicon codicon-arrow-right',
				},
			},
		},
		{
			...(baseObj as Props),
			_icons: {
				left: {
					icon: 'codicon codicon-arrow-left',
				},
				right: {
					icon: 'codicon codicon-arrow-right',
				},
			},
		},
		{ ...(baseObj as Props), _label: [{ text: 'partly english', lang: 'en' }, { text: ' Label' }] },
	];

	if (options?.hasSmartButton) {
		propVariants.push({
			...(baseObj as Props),
			_smartButton: {
				_icons: ['codicon codicon-eye'],
				_hideLabel: true,
				_label: 'einblenden',
			},
		});
	}

	propVariants.push(
		{ ...(baseObj as Props), _hideLabel: true },
		{ ...(baseObj as Props), _infoPopover: { _label: 'Info', _content: 'Ich bin ein Hinweis.', _icons: 'kolicon-alert-info' } },
		{ ...(baseObj as Props), _msg: { _type: 'error', _description: 'Es ist ein Fehler aufgetreten' }, _touched: true },
		{ ...(baseObj as Props), _variant: 'custom' },
	);

	executeSnapshotTests(ComponentName, components, propVariants);
}
