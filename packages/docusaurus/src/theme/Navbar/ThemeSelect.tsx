import { SelectOption } from '@public-ui/components';
import { InputTypeOnDefault } from '@public-ui/components/dist/types/types/input/types';
import { KolSelect } from '@public-ui/react';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { getDarkMode, setDarkMode, setTheme, getTheme } from '../../shares/store';
import { Store, Theme } from '../../shares/theme';

const OPTIONS: SelectOption<Theme>[] = [
	{
		label: 'BAMF-Styleguide',
		value: 'bamf',
		disabled: true,
	},
	{
		label: 'BMF-Styleguide',
		value: 'bmf',
	},
	{
		label: 'BPA-Styleguide',
		value: 'bpa',
		disabled: true,
	},
	{
		label: 'BZSt-Styleguide (WIP)',
		value: 'bzst',
	},
	{
		label: 'DESY-Styleguide',
		value: 'desy',
	},
	{
		label: 'ITZBund-Styleguide (WIP)',
		value: 'itzbund',
	},
	{
		label: 'MAPZoll-Styleguide',
		value: 'mapz',
	},
	{
		label: 'Freistaat Thüringen',
		value: 'th',
	},
	{
		label: 'ZOLL-Styleguide (WIP)',
		value: 'zoll',
		disabled: true,
	},
];

type ActivateButton = {
	_disabled: boolean;
	_on?: InputTypeOnDefault;
};

export const ThemeSelect: FunctionComponent = () => {
	const [activate, setActivate] = useState<ActivateButton>({
		_disabled: true,
	});

	const store = () => {
		console.log({
			darkMode: getDarkMode(),
			theme: getTheme(),
		});
		localStorage.setItem(
			'public-ui.website',
			JSON.stringify({
				darkMode: getDarkMode(),
				theme: getTheme(),
			})
		);
	};

	useEffect(() => {
		const RESTORE = localStorage.getItem('public-ui.website');
		try {
			const store = JSON.parse(RESTORE) as Store;
			if (typeof store === 'object' && store !== null) {
				setDarkMode(store.darkMode);
				setTheme(store.theme);
			}
		} catch (e) {
			/* empty */
		}

		const div = document.querySelector('div[data-theme]');
		if (div instanceof HTMLElement) {
			div.setAttribute('class', getTheme());
			div.dataset.theme = getTheme();
		}
		console.log({
			darkMode: getDarkMode(),
			theme: getTheme(),
		});

		const timeout = setTimeout(() => {
			clearTimeout(timeout);
			setActivate({
				_disabled: false,
				_on: {
					onChange: (_event, value) => {
						if (Array.isArray(value)) {
							setTheme(value[0] as Theme);
							store();
							location.reload();
						}
					},
				},
			});
		}, 1000);
	}, []);

	return (
		<KolSelect className="col-span-2 sm:col-auto" {...activate} _hideLabel _id="theme-toggle" _list={OPTIONS} _value={[getTheme()]}>
			Theme auswählen
		</KolSelect>
	);
};

export default ThemeSelect;
