import { KolToolbar } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const ToolbarDisabled: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>This sample shows KolToolbars with some of the elements disabled.</p>
			</SampleDescription>

			<SampleBlock id="disabled" fitContent>
				<KolToolbar
					_label="Toolbar"
					class="block w-fit"
					_items={[
						{
							type: 'button',
							_label: 'Back',
							_disabled: true,
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
							_disabled: true,
							_label: 'Simple Link 3',
						},
						{
							type: 'button',
							_label: 'Bold',
						},
					]}
				/>
			</SampleBlock>
		</>
	);
};
