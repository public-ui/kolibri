import { Log, getDocument, processEnv, setColorContrastAnalysis, setDevMode, setExperimentalMode } from '@public-ui/schema';

import { getWindow } from '@public-ui/schema';

const initMeta = (): void => {
	const meta = getDocument().querySelector('meta[name="kolibri"]');
	if (meta && meta.hasAttribute('content')) {
		const content = meta.getAttribute('content');
		if (typeof content === 'string') {
			setDevMode(content.includes('dev-mode=true'));
			setExperimentalMode(content.includes('experimental-mode=true'));
			setColorContrastAnalysis(content.includes('color-contrast-analysis=true'));
		}
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

export const initKoliBri = (): void => {
	initMeta();
	if (getKoliBri() === undefined) {
		Log.debug(
			`
	,--. ,--.         ,--. ,--. ,-----.           ,--.
	|  .'   /  ,---.  |  | \`--' |  |) /_  ,--.--. \`--'
	|  .   '  | .-. | |  | ,--. |  .-.  \\ |  .--' ,--.
	|  |\\   \\ | '-' | |  | |  | |  '--' / |  |    |  |
	\`--' \`--´  \`---´  \`--' \`--' \`------´  \`--'    \`--'
	🚹 The accessible HTML-Standard | 👉 https://public-ui.github.io | 2.0.7
		`,
			{
				forceLog: true,
			}
		);
	} else {
		console.warn(`You can only initialize KoliBri once.`);
	}
};
export { getKoliBri };

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
`
		);
	}
};

let nonce = (): string => Math.floor(Math.random() * 16777215).toString(16);

if (processEnv === 'test') {
	nonce = (): string => 'nonce';
}

export { nonce };
