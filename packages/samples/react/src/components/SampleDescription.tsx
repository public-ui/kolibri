import type { FC, PropsWithChildren } from 'react';
import React, { useContext, useMemo } from 'react';

import { PUBLIC_CODE_COMPONENT_URL, PUBLIC_DOC_COMPONENT_URL } from '../shares/constants';

import { KolLink } from '@public-ui/react-v19';

import { HideMenusContext } from '../shares/HideMenusContext';
import { useLocation } from 'react-router';

export const SampleDescription: FC<PropsWithChildren> = (props) => {
	const hideMenus = useContext(HideMenusContext);
	const location = useLocation();
	const paths = location.pathname.split('/').slice(1);

	const docLink = useMemo(() => {
		return paths[0] === 'scenarios'
			? null // Scenarios are not a component and hence have no documentation.
			: `${PUBLIC_DOC_COMPONENT_URL}/${paths[0]}`;
	}, [location.hash]);

	const codeLink = useMemo(() => {
		return paths[0] === 'scenarios'
			? null // Scenarios are not a component and hence have no documentation.
			: `${PUBLIC_CODE_COMPONENT_URL}/${paths[0]}/${paths[1]}.tsx`;
	}, [location.hash]);

	return (
		<>
			<h1 className="visually-hidden">{location.pathname.replace(/\//g, ' ')}</h1>
			{hideMenus ? null : (
				<div className="grid sm:flex gap-4 justify-between pb-sm border-b-1 border-b-solid border-gray mb-2">
					<div className="indented-text">{props.children}</div>
					<ul className="flex flex-wrap gap-2 m-0 p-0 list-none">
						{codeLink && (
							<li>
								<KolLink _href={codeLink} _label="Code" _target="_blank" />
							</li>
						)}
						{docLink && (
							<li>
								<KolLink _href={docLink} _label="Documentation" _target="_blank" />
							</li>
						)}
						<li>
							<KolLink _href={`#${location.pathname}?hideMenus`} _label="Standalone example" _target="_blank" />
						</li>
					</ul>
				</div>
			)}
		</>
	);
};
