import { executeSnapshotTests } from './snapshot-testing';

export function executeInputSnapshotTests<Props extends Record<string, unknown>>(
	ComponentName: string,
	components: unknown[],
	extendedProps?: Partial<Props>,
	options: { hasSmartButton?: boolean } = {},
) {
	const baseObj: unknown = {
		_label: 'Label',
		_name: 'field',
		_placeholder: 'Hier steht ein Platzhaltertext',

		...(extendedProps || ({} as Props)),
	};

	const propVariants: Props[] = [
		{ ...(baseObj as Props) },
		{ ...(baseObj as Props), _accessKey: 'V' },
		{ ...(baseObj as Props), _shortKey: 'S' },
		{ ...(baseObj as Props), _alert: true },
		{ ...(baseObj as Props), _readOnly: true },
		{ ...(baseObj as Props), _disabled: true },
		{ ...(baseObj as Props), _msg: { _type: 'error', _description: 'Es ist ein Fehler aufgetreten' } },
		{ ...(baseObj as Props), _msg: { _type: 'error', _description: 'Es ist ein Fehler aufgetreten' }, _hideError: true },
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

	executeSnapshotTests<Props>(ComponentName, components, propVariants);
}
