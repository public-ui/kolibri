import type { FC } from 'react';
import React, { useContext } from 'react';
import { KolBadge, KolToolbar } from '@public-ui/react';
import { HideMenusContext } from '../../shares/HideMenusContext';

export const ToolbarDisabled: FC = () => {
	const hideMenus = useContext(HideMenusContext);
	return (
		<>
			{!hideMenus && <KolBadge className="block mb-3" _label="Component is a DRAFT - Don't use in production yet." _color="#db5461" />}
			<KolToolbar
				_label="Toolbar"
				class="block w-fit"
				_items={[
					{
						_label: 'Back',
						_hideLabel: true,
						_icons: {
							left: {
								icon: 'codicon codicon-arrow-left',
							},
						},
					},
					{
						_label: 'Next',
						_hideLabel: true,
						_disabled: true,
						_icons: {
							right: {
								icon: 'codicon codicon-arrow-right',
							},
						},
					},
					{
						_href: '#',
						_label: 'Simple Link 1',
					},
					{
						_href: '#',
						_disabled: true,
						_label: 'Simple Link 3',
					},
					{
						_label: 'Bold',
					},
				]}
			/>
		</>
	);
};
