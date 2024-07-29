import React, { FC, PropsWithChildren, useState } from 'react';
import { KolAccordion, KolButton, KolHeading, KolLink, KolSelect, KolVersion } from '@public-ui/react';
import { THEME_OPTIONS } from '../shares/theme';
import { Routes } from '../shares/types';
import { useMobile } from '../hooks/useMobile';

type Props = {
	version: string;
	theme: string;
	routes: Routes;
	routeList: string[];
	sample: string;
	buildDate?: string;
	commitHash?: string;
	onThemeChange: (theme: unknown) => void;
};

const ComponentNavContainer = ({ children, isMobile }: PropsWithChildren<{ isMobile: boolean }>) =>
	isMobile ? (
		<KolAccordion _label="Alle Komponenten" class="mt">
			{children}
		</KolAccordion>
	) : (
		<div className="mt">{children}</div>
	);
export const Sidebar: FC<Props> = ({ version, theme, routes, routeList, sample, buildDate, commitHash, onThemeChange }) => {
	/* KolSelect calls onChange initially by design - work around this with a state variable  */
	const [isFirstThemeSelectChange, setIsFirstThemeSelectChange] = useState(true);
	const isMobile = useMobile();

	const getIndexOfSample = () => routeList.indexOf(sample);
	const formatSampleAsLabel = () => sample.replace(/\//g, ' ');

	const handleThemeSelectChange = (_event: Event, value: unknown) => {
		if (isFirstThemeSelectChange) {
			setIsFirstThemeSelectChange(false);
		} else {
			onThemeChange((value as [string])[0]);
		}
	};

	const handleLinkClick = (event: Event) => {
		location.replace((event.target as HTMLLinkElement).href); // KoliBri prevents the default click behavior as soon as an event listener is set, so we need to reimplement it.
		document.querySelector('#route-container')?.scrollIntoView({ behavior: 'smooth' });
	};

	const handlePreviousClick = () => {
		const currentIndex = getIndexOfSample();
		const nextIndex = currentIndex <= 0 ? routeList.length - 1 : currentIndex - 1;
		location.replace(`#${routeList[nextIndex]}`);
	};

	const handleNextClick = () => {
		const currentIndex = getIndexOfSample();
		const nextIndex = currentIndex === routeList.length - 1 ? 0 : currentIndex + 1;
		location.replace(`#${routeList[nextIndex]}`);
	};

	return (
		<aside className="app-sidebar p-4">
			<div className="flex flex-justify-between flex-items-center">
				<KolHeading _label="KoliBri React"></KolHeading>
				<KolVersion _version={version}></KolVersion>
			</div>
			{(buildDate || commitHash) && (
				<div className="text-sm font-mono color-gray-5 m-t-2">
					{commitHash ? `Build: ${commitHash}` : ''}
					<br />
					{buildDate ? `at ${buildDate}` : ''}
				</div>
			)}
			<KolSelect _label="Theme" _list={THEME_OPTIONS} _on={{ onChange: handleThemeSelectChange }} _value={[theme]} class="mt"></KolSelect>

			<KolHeading _label="Components" _level={2} className="block mt"></KolHeading>
			<div className="flex flex-justify-between flex-items-center mt">
				<KolButton _icons="codicon codicon-arrow-left" _hideLabel _label="Previous component" _on={{ onClick: handlePreviousClick }} />
				<span className="text-center">
					{formatSampleAsLabel()} ({getIndexOfSample() + 1}/{routeList.length})
				</span>
				<KolButton _icons="codicon codicon-arrow-right" _hideLabel _label="Next component" _on={{ onClick: handleNextClick }} />
			</div>

			<ComponentNavContainer isMobile={isMobile}>
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
			</ComponentNavContainer>
		</aside>
	);
};
