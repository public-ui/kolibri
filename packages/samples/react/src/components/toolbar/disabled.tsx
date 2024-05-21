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
						_label: 'Button',
						_disabled: true,
					},
					{
						_href: '#',
						_label: 'Simple Link 1',
					},
					{
						_label: 'Button',
						_disabled: true,
					},
					{
						_href: '#',
						_label: 'Simple Link 3',
					},
					{
						_href: '#',
						_disabled: true,
						_label: 'Simple Link 3',
					},
				]}
			/>
		</>
	);
};
