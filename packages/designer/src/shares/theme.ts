import { KoliBriDevHelper } from '@public-ui/components';

export const THEME_LIST = new Set<string>(['bmf', 'default', 'ecl-ec', 'ecl-eu', 'itzbund']);

export const saveData = (content: string, fileName: string) => {
	const a = document.createElement('a');
	document.body.appendChild(a);
	a.style.display = 'none';
	const blob = new Blob([content], { type: 'octet/stream' }),
		url = window.URL.createObjectURL(blob);
	a.href = url;
	a.download = fileName;
	a.click();
	window.URL.revokeObjectURL(url);
};

export const restoreThemes = () => {
	let store: Record<string, Record<string, string>> = {};
	try {
		store = JSON.parse(sessionStorage.getItem('kolibri-themes') || '{}') as Record<string, Record<string, string>>;
	} catch (e) {}
	if (typeof store === 'object' && store !== null) {
		const themeNames = Object.getOwnPropertyNames(store);
		themeNames.forEach((themeName) => {
			if (typeof store[themeName] === 'object' && store[themeName] !== null) {
				KoliBriDevHelper.patchTheme(themeName, store[themeName]);
			}
		});
	}
};

export const storeThemeChange = (theme: string, tagName: string, css: string) => {
	let store = JSON.parse(sessionStorage.getItem('kolibri-themes') || '{}') as Record<string, Record<string, string>>;
	store = {
		...store,
		[theme]: {
			...store[theme],
			[tagName]: css,
		},
	};
	sessionStorage.setItem('kolibri-themes', JSON.stringify(store));
};
