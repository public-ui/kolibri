import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolAlertTag } from '../../../core/component-names';
import type { AlertProps, AlertType } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolAlert } from '../component';
import { KolAlertWc } from '../wc';

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

describe('KolAlert slot', () => {
	test('should render content passed into the slot', async () => {
		const components = [KolAlert, KolAlertWc];
		const page = await newSpecPage({
			components,
			template: () => (
				<KolAlertTag _label="alert with slot">
					<div>content of slot</div>
				</KolAlertTag>
			),
		});
		await page.waitForChanges();

		expect(page.root).toMatchSnapshot();
	});

	test('should render the closer as a single ButtonFC root', async () => {
		const components = [KolAlert, KolAlertWc];
		const page = await newSpecPage({
			components,
			template: () => <KolAlertTag _hasCloser _label="closable alert" />,
		});
		await page.waitForChanges();

		expect(page.root).toMatchSnapshot();
	});
});
