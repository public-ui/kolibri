import type { FC, PropsWithChildren } from 'react';
import React, { useContext, useMemo } from 'react';
import { PUBLIC_DOC_COMPONENT_URL, PUBLIC_CODE_COMPONENT_URL } from '../shares/constants';
import { KolIndentedText, KolLink } from '@public-ui/react';

import { HideMenusContext } from '../shares/HideMenusContext';

export const SampleDescription: FC<PropsWithChildren> = (props) => {
	const hideMenus = useContext(HideMenusContext);
	const docLink = useMemo(() => {
		const arr = location.href.split('/');
		const componentName = arr[arr.length - 2];
		return componentName === 'scenarios'
			? null // Scenarios are not a component and hence have no documentation.
			: `${PUBLIC_DOC_COMPONENT_URL}/${componentName}`;
	}, [location.href]);
	const codeLink = useMemo(() => {
		const link = location.hash.slice(1);
		return `${PUBLIC_CODE_COMPONENT_URL}${link}.tsx`;
	}, [location.hash]);

	return hideMenus ? null : (
		<div className="flex justify-between mb-sm">
			<KolIndentedText>{props.children}</KolIndentedText>
			<div className="flex flex-wrap gap-2 shrink-0 ml">
				{codeLink && <KolLink _href={codeLink} _label="Code" _target="_blank" />}
				{docLink && <KolLink _href={docLink} _label="Documentation" _target="_blank" />}
				<KolLink _href={`${location.href}?hideMenus`} _label="Standalone example" _target="_blank" />
			</div>
		</div>
	);
};
