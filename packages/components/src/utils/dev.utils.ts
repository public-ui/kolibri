import { Log, getDocument, processEnv, setColorContrastAnalysis, setDevMode, setExperimentalMode } from '@public-ui/schema';

import { getWindow, setDocument, setWindow } from '@public-ui/schema';
import { ModalService } from '../components/modal/service';

export const configKoliBri = (window: Window): void => {
	if (window instanceof Window) {
		setWindow(window);
		if (getWindow().document instanceof Document) {
			setDocument(window.document);
		} else {
			console.warn(`The given Window has no valid Document.`);
		}
	} else {
		console.warn(`The given Window is not valid.`);
	}
};

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
	if (getKoliBri().Modal === undefined) {
		const Modal = new ModalService();
		Object.defineProperty(getKoliBri(), 'Modal', {
			get: function (): ModalService {
				return Modal;
			},
		});
		initMeta();
		Log.debug(
			`
	,--. ,--.         ,--. ,--. ,-----.           ,--.
	|  .'   /  ,---.  |  | \`--' |  |) /_  ,--.--. \`--'
	|  .   '  | .-. | |  | ,--. |  .-.  \\ |  .--' ,--.
	|  |\\   \\ | '-' | |  | |  | |  '--' / |  |    |  |
	\`--' \`--´  \`---´  \`--' \`--' \`------´  \`--'    \`--'
	🚹 The accessible HTML-Standard | 👉 https://public-ui.github.io | 2.0.8
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
