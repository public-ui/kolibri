import { KolAlertTag } from '../../../core/component-names';
import type { AlertProps, AlertType } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolAlert } from '../shadow';
import { KolAlertWc } from '../component';

const baseObject = { _label: 'Überschrift' };

function buildByType(_type: AlertType) {
	const nextArray: AlertProps[] = [];
	const alertVariants = [true, false];

	[0, 1, 2, 3, 4, 5, 6].forEach((_level) => {
		alertVariants.forEach((_alert) => {
			nextArray.push({ ...baseObject, _alert, _level, _type } as AlertProps);
		});
	});

	return nextArray;
}

executeSnapshotTests<AlertProps>(
	KolAlertTag,
	[KolAlert, KolAlertWc],
	[...buildByType('default'), ...buildByType('error'), ...buildByType('info'), ...buildByType('success'), ...buildByType('warning')],
);
