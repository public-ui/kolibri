import React from 'react';

import { KolSplitButton, KolToolbar, KolHeading } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { useToasterService } from '../../hooks/useToasterService';

import type { FC } from 'react';

export const SplitButtonBasic: FC = () => {
	const { buttonWithTextClickEventHandler } = useToasterService();
	const dummyEventHandler = {
		onClick: buttonWithTextClickEventHandler,
	};
	const TOOLBAR_ITEMS = [
		{
			_label: 'Save',
			_icons: 'codicon codicon-save',
			_on: dummyEventHandler,
		},
		{
			_label: 'Move',
			_icons: 'codicon codicon-move',
			_on: dummyEventHandler,
		},
		{
			_label: 'Delete',
			_icons: 'codicon codicon-trash',
			_on: dummyEventHandler,
		},
	];

	return (
		<>
			<SampleDescription>
				<p>
					The <code>SplitButton</code> component combines a primary action button with a context menu. Clicking the main button triggers the
					<strong> Edit</strong> action. The context menu opens a vertical list of additional actions:
					<strong> Save</strong>, <strong>Move</strong>, and <strong>Delete</strong>.
				</p>
			</SampleDescription>

			<div className="flex flex-col gap-4">
				<KolSplitButton _label="Edit" _on={dummyEventHandler}>
					<KolToolbar _label="Action toolbar" _items={TOOLBAR_ITEMS} _orientation="vertical" />
				</KolSplitButton>
			</div>
		</>
	);
};
