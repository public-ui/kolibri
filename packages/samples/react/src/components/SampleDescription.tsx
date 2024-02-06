import type { FC, PropsWithChildren } from 'react';
import React, { useContext } from 'react';

import { KolIndentedText, KolLink } from '@public-ui/react';

import { HideMenusContext } from '../shares/HideMenusContext';

export const SampleDescription: FC<PropsWithChildren> = (props) => {
	const hideMenus = useContext(HideMenusContext);

	return hideMenus ? null : (
		<div className="flex mb-sm">
			<KolIndentedText>{props.children}</KolIndentedText>
			<KolLink
				_hideLabel
				_href={`${location.href}?hideMenus`}
				_label="Beispiel in neuem Tab öffnen"
				_target="_blank"
				className="mla flex-self-center"
			></KolLink>
		</div>
	);
};
