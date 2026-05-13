import { Log, getDocument, isTestMode, setColorContrastAnalysis, setExperimentalMode } from '../schema';

import { Env } from '@stencil/core';
import { getWindow } from '../schema';

const initMeta = (): void => {
	try {
		const document = getDocument();
		if (!document || typeof document.querySelector !== 'function') {
			return; // Skip meta initialization if document is not available
		}

		const meta = document.querySelector('meta[name="kolibri"]');
		if (meta && meta.hasAttribute('content')) {
			const content = meta.getAttribute('content');
			if (typeof content === 'string') {
				setExperimentalMode(content.includes('experimental-mode=true'));
				setColorContrastAnalysis(content.includes('color-contrast-analysis=true'));
			}
		}
	} catch {
		// Ignore meta initialization errors in test/SSR environments
	}
};

const getKoliBri = (): Record<string, unknown> => {
	let kolibri = getWindow().KoliBri;
	if (kolibri === undefined) {
		kolibri = {};
		Object.defineProperty(getWindow(), 'KoliBri', {
			value: kolibri,
			writable: false,
		});
	}
	return kolibri;
};

export { getKoliBri };

export const initKoliBri = (): void => {
	initMeta();
	Log.debug(
		`
,--. ,--.         ,--. ,--. ,-----.           ,--.
|  .'   /  ,---.  |  | \`--' |  |) /_  ,--.--. \`--'
|  .   '  | .-. | |  | ,--. |  .-.  \\ |  .--' ,--.
|  |\\   \\ | '-' | |  | |  | |  '--' / |  |    |  |
\`--' \`--´  \`---´  \`--' \`--' \`------´  \`--'    \`--'
🚹 The accessible HTML-Standard | 👉 https://public-ui.github.io | ${Env.kolibriVersion}
	`,
		{
			forceLog: true,
		},
	);
};

export const renderDevAdvice = (): void => {
	if (getKoliBri().adviceShown !== true) {
		Object.defineProperty(getKoliBri(), 'adviceShown', {
			get: function () {
				return true;
			},
		});
		Log.debug(
			`
You are using the KoliBri component library. If you have any suggestions for improvement or find a problem, please contact us:

Ticket: https://github.com/public-ui/kolibri/issues/new/choose (for privacy reasons, please use email)
Email: kolibri@itzbund.de
`,
		);
	}
};

let nonce = (): string => Math.floor(Math.random() * 16777215).toString(16);

if (isTestMode()) {
	nonce = (): string => 'nonce';
}

export { nonce };

const uniqueIds = new Set<string>();

export const createUniqeId = (id: string): string => {
	const uniqueId = `${id}-${nonce()}`;
	uniqueIds.add(uniqueId);
	return uniqueId;
};

export const createRelatedUniqeId = (id: string, suffix: string): string => {
	if (!uniqueIds.has(id)) {
		return `${id}-${suffix}`;
	}

	const separatorIndex = id.lastIndexOf('-');
	const uniqueId = `${id.slice(0, separatorIndex)}-${suffix}-${id.slice(separatorIndex + 1)}`;
	uniqueIds.add(uniqueId);
	return uniqueId;
};
