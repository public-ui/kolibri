import type { ToolbarItemsPropType } from '@public-ui/components';
import { KolHeading, KolToolbar } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const ToolbarBasic: FC = () => {
	const TOOLBAR_ITEMS: ToolbarItemsPropType = [
		{
			type: 'button',
			_label: 'Back',
			_hideLabel: true,
			_icons: {
				left: {
					icon: 'kolicon-chevron-left',
				},
			},
		},
		{
			type: 'button',
			_label: 'Next',
			_hideLabel: true,
			_icons: {
				right: {
					icon: 'kolicon-chevron-right',
				},
			},
		},
		{
			type: 'link',
			_href: '#/back-page',
			_label: 'Simple Link 1',
		},
		{
			type: 'link',
			_href: '#/back-page',
			_label: 'Simple Link 3',
		},
		{
			type: 'button',
			_label: 'Bold',
		},
	];
	return (
		<>
			<SampleDescription>
				<p>
					KolToolbars renders a set of given control elements grouped into one toolbar where focus can be moved using the keyboard arrow keys. The sample
					features button and link elements.
				</p>
			</SampleDescription>

			<div className="flex flex-col gap-4">
				<KolHeading _label="Orientation horizontal" _level={2} />
				<KolToolbar class="block w-fit" _label="Toolbar" _items={TOOLBAR_ITEMS} />

				<KolHeading _label="Orientation vertical" _level={2} />
				<KolToolbar class="block w-fit" _label="Toolbar" _items={TOOLBAR_ITEMS} _orientation="vertical" />
			</div>
		</>
	);
};
