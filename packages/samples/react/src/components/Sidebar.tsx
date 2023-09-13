import React, { FC, useState } from 'react';
import { KolHeading, KolLink, KolSelect, KolVersion } from '@public-ui/react';
import { THEME_OPTIONS } from '../shares/theme';
import { Routes } from '../shares/types';

type Props = {
	version: string;
	theme: string;
	routes: Routes;
	onThemeChange: (theme: unknown) => void;
};

export const Sidebar: FC<Props> = ({ version, theme, routes, onThemeChange }) => {
	/* KolSelect calls onChange initially by design - work around this with a state variable  */
	const [isFirstThemeSelectChange, setIsFirstThemeSelectChange] = useState(true);

	const handleThemeSelectChange = (_event: Event, value: unknown) => {
		if (isFirstThemeSelectChange) {
			setIsFirstThemeSelectChange(false);
		} else {
			onThemeChange((value as [string])[0]);
		}
	};

	const handleLinkClick = (event: Event) => {
		location.replace((event.target as HTMLLinkElement).href); // KoliBri prevents the default click behavior as soon as an event listener is set, so we need to reimplement it.
		document.body.scrollIntoView({ behavior: 'smooth' });
		// @todo set focus?
	};

	return (
		<aside className="app-sidebar p-4">
			<KolHeading _label="KoliBri React Sample"></KolHeading>
			<KolVersion _version={version} class="block mt"></KolVersion>
			<KolSelect _label="Theme wählen" _list={THEME_OPTIONS} _on={{ onChange: handleThemeSelectChange }} _value={[theme]} class="mt"></KolSelect>

			<KolHeading _label="Components" _level={2} className="block mt"></KolHeading>

			<nav>
				<ul className="m0 p0 list-inside">
					{Object.entries(routes).map(([parentName, children]) => (
						<li key={parentName} className="mt-2">
							{parentName}
							<ul className="list-inside ml p0">
								{Object.keys(children).map((childName) => (
									<li key={`${parentName}/${childName}`}>
										<KolLink _label={childName} _href={`#/${parentName}/${childName}`} _on={{ onClick: handleLinkClick }} />
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
};
