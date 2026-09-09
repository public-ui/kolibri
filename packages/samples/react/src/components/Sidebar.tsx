import type { FC } from 'react';
import React, { useEffect, useMemo, useRef } from 'react';

import { KolButton, KolDrawer, KolHeading, KolSelect, KolVersion } from '@public-ui/react-v19';
import { useMobile } from '../hooks/useMobile';

import type { SelectOption } from '@public-ui/components';
import { useLocation } from 'react-router';
import type { ColorSchemePreference } from '../shares/colorScheme';
import type { Theme } from '../shares/theme';
import { DARK_CAPABLE_THEMES } from '../shares/theme';
import type { Routes } from '../shares/types';
import Navigation from './Navigation';

const getThemeLabel = (themes: Theme[], theme: string) => themes.find((candidate) => candidate.key === theme)?.name ?? theme;

type BuildInformationProps = {
	buildDate?: string | null;
	commitHash?: string | null;
};
const BuildInformation: FC<BuildInformationProps> = ({ buildDate, commitHash }) => {
	if (!buildDate && !commitHash) {
		return '';
	}

	return (
		<div className="text-sm font-mono color-gray-5 m-t-2">
			{buildDate && commitHash ? ( // date and hash provided
				<>
					Build: {commitHash}
					<br />
					at {buildDate}
				</>
			) : commitHash ? ( // hash only
				`Build: ${commitHash}`
			) : (
				// date only
				`Build date: ${buildDate}`
			)}
		</div>
	);
};

type Props = {
	version: string;
	themes: Theme[];
	theme: string;
	routes: Routes;
	routeList: string[];
	sample: string;
	buildDate?: string;
	commitHash?: string;
	colorScheme: ColorSchemePreference;
	onThemeChange: (theme: unknown) => void;
	onColorSchemeChange: (colorScheme: ColorSchemePreference) => void;
};

const COLOR_SCHEME_OPTIONS: SelectOption<ColorSchemePreference>[] = [
	{ label: 'Auto (follow the OS)', value: 'auto' },
	{ label: 'Light', value: 'light' },
	{ label: 'Dark', value: 'dark' },
];

export const Sidebar: FC<Props> = ({
	version,
	themes,
	theme,
	routes,
	routeList,
	sample,
	buildDate,
	commitHash,
	colorScheme,
	onThemeChange,
	onColorSchemeChange,
}) => {
	/* KolSelect calls onChange initially by design - work around this with a state variable  */

	const getIndexOfSample = () => routeList.indexOf(sample);
	const formatSampleAsLabel = () => sample.replace(/\//g, ' ');

	const handleThemeSelectChange = (_event: Event, value: unknown) => {
		onThemeChange(value as string);
	};

	const handleColorSchemeSelectChange = (_event: Event, value: unknown) => {
		onColorSchemeChange(value as ColorSchemePreference);
	};

	/* Only some themes ship a dark palette; for the others the switch has no visible effect beyond
	   the page background, which would be confusing without a word of explanation. */
	const colorSchemeHint = DARK_CAPABLE_THEMES.includes(theme)
		? undefined
		: `The ${getThemeLabel(themes, theme)} theme has no dark palette yet – only Default follows this setting.`;

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

	const themeOption = useMemo<SelectOption<string>[]>(
		() =>
			themes.map(
				(t) =>
					({
						label: t.name,
						value: t.key,
					}) satisfies SelectOption<string>,
			),
		[themes],
	);

	const isMobile = useMobile();
	const locationWatch = useLocation();

	useEffect(() => {
		drawerElement.current?.close();
	}, [locationWatch]);
	const drawerElement = useRef<HTMLKolDrawerElement>(null);

	return (
		<aside className="app-sidebar p-4">
			<div className="scrollable-container-wrapper">
				<div className="flex flex-justify-between flex-items-center">
					<KolHeading _label="KoliBri React"></KolHeading>
					<KolVersion _label={version}></KolVersion>
				</div>
				<BuildInformation buildDate={buildDate} commitHash={commitHash} />
				{!isMobile ? <KolSelect _label="Theme" _options={themeOption} _on={{ onChange: handleThemeSelectChange }} _value={theme} class="mt"></KolSelect> : ''}
				{!isMobile ? (
					<KolSelect
						_label="Color scheme"
						_hint={colorSchemeHint}
						_options={COLOR_SCHEME_OPTIONS}
						_on={{ onChange: handleColorSchemeSelectChange }}
						_value={colorScheme}
						class="mt"
					></KolSelect>
				) : (
					''
				)}
				{!isMobile ? <KolHeading _label="Components" _level={2} className="block mt"></KolHeading> : ''}
				<div className="flex flex-justify-between flex-items-center mt">
					<KolButton _icons="kolicon-chevron-left" _hideLabel _label="Previous component" _on={{ onClick: handlePreviousClick }} />

					{isMobile ? (
						<div className="flex gap-4 flex-items-center">
							<span className="text-base text-center">
								{formatSampleAsLabel()} ({getIndexOfSample() + 1}/{routeList.length})
							</span>
							<KolButton _label="Navigation" _hideLabel _icons={{ right: 'kolicon-settings' }} _on={{ onClick: () => drawerElement.current?.showModal() }} />
						</div>
					) : (
						<span className="text-base text-center">
							{formatSampleAsLabel()} ({getIndexOfSample() + 1}/{routeList.length})
						</span>
					)}

					<KolButton _icons="kolicon-chevron-right" _hideLabel _label="Next component" _on={{ onClick: handleNextClick }} />
				</div>
				{isMobile ? (
					<KolDrawer _align="top" _label="Navigation" _hasCloser={true} ref={drawerElement}>
						<KolSelect _label="Theme" _options={themeOption} _on={{ onChange: handleThemeSelectChange }} _value={theme} class="mt"></KolSelect>
						<KolSelect
							_label="Color scheme"
							_hint={colorSchemeHint}
							_options={COLOR_SCHEME_OPTIONS}
							_on={{ onChange: handleColorSchemeSelectChange }}
							_value={colorScheme}
							class="mt"
						></KolSelect>
						<KolHeading _label="Components" _level={2} className="block mt"></KolHeading>
						<Navigation routes={routes} />
					</KolDrawer>
				) : (
					<Navigation routes={routes} />
				)}
			</div>
		</aside>
	);
};
