import React from 'react';

import type { ToolbarItemsPropType } from '@public-ui/components';
import { KolSplitButton, KolToolbar } from '@public-ui/react-v19';
import { useToasterService } from '../../hooks/useToasterService';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

export const SplitButtonBasic: FC = () => {
	const { buttonWithTextClickEventHandler } = useToasterService();
	const dummyEventHandler = {
		onClick: buttonWithTextClickEventHandler,
	};
	const TOOLBAR_ITEMS: ToolbarItemsPropType = [
		{
			type: 'button',
			_label: 'Save',
			_icons: 'kolicon-check',
			_on: dummyEventHandler,
		},
		{
			type: 'button',
			_label: 'Move Up',
			_icons: 'kolicon-chevron-up',
			_on: dummyEventHandler,
		},
		{
			type: 'button',
			_label: 'Delete',
			_icons: 'kolicon-minus',
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

			<SampleBlock id="basic" className="flex flex-col gap-4">
				<KolSplitButton _label="Edit" _on={dummyEventHandler}>
					<KolToolbar _label="Action toolbar" _items={TOOLBAR_ITEMS} _orientation="vertical" />
				</KolSplitButton>
			</SampleBlock>
		</>
	);
};
