import './SampleDescription.css';
import type { FC, PropsWithChildren } from 'react';
import React, { useContext, useMemo } from 'react';

import { PUBLIC_DOC_COMPONENT_URL } from '../shares/constants';

import { KolIndentedText, KolLink } from '@public-ui/react';

import { HideMenusContext } from '../shares/HideMenusContext';

export const SampleDescription: FC<PropsWithChildren> = (props) => {
	const hideMenus = useContext(HideMenusContext);
	const docRedirect = useMemo(() => {
		const arr = location.href.split('/');
		return `${PUBLIC_DOC_COMPONENT_URL}/${arr[arr.length - 2]}`;
	}, [PUBLIC_DOC_COMPONENT_URL, location.href]);

	return hideMenus ? null : (
		<div className="flex mb-sm">
			<KolIndentedText>{props.children}</KolIndentedText>
			<div className="links">
				<KolLink _href={docRedirect} _label="Dokumentation" _target="_blank" />
				<KolLink _href={`${location.href}?hideMenus`} _label="Beispiel" _target="_blank" />
			</div>
		</div>
	);
};
