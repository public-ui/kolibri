import { ModalService } from '../components/modal/service';
import { ToasterService } from '../components/toast/toaster';
import { Log } from './log';
import { processEnv } from './reuse';

let WINDOW: Window | null = null;
let DOCUMENT: Document | null = null;

export const configKoliBri = (window: Window): void => {
	if (window instanceof Window) {
		WINDOW = window;
		if (WINDOW.document instanceof Document) {
			DOCUMENT = window.document;
		} else {
			console.warn(`The given Window has no valid Document.`);
		}
	} else {
		console.warn(`The given Window is not valid.`);
	}
};

export const getWindow = (): Window => (WINDOW || typeof window === 'undefined' ? (null as unknown as Window) : window);
export const getDocument = (): Document => (DOCUMENT || typeof getWindow().document === 'undefined' ? (null as unknown as Document) : getWindow().document);

let META_CONFIG: string | null = null;
let DEV_MODE: boolean | null = null;
let EXPERIMENTAL_MODE: boolean | null = null;
let COLOR_CONTRAST_ANALYSIS: boolean | null = null;

export const getDevMode = (): boolean => DEV_MODE === true;
export const getExperimalMode = (): boolean => EXPERIMENTAL_MODE === true;
export const getColorContrastAnalysis = (): boolean => COLOR_CONTRAST_ANALYSIS === true;

const initMeta = (): void => {
	if (DEV_MODE === null && EXPERIMENTAL_MODE === null && COLOR_CONTRAST_ANALYSIS === null) {
		const meta = getDocument().querySelector('meta[name="kolibri"]');
		if (meta && meta.hasAttribute('content')) {
			META_CONFIG = meta.getAttribute('content');
			if (typeof META_CONFIG === 'string') {
				DEV_MODE = META_CONFIG.includes('dev-mode=true');
				EXPERIMENTAL_MODE = META_CONFIG.includes('experimental-mode=true');
				COLOR_CONTRAST_ANALYSIS = META_CONFIG.includes('color-contrast-analysis=true');
			}
		}
	} else {
		console.warn(`You can only initialize DEV_MODE and COLOR_CONTRAST_ANALYSIS once.`);
	}
};

let KoliBri: Record<string, unknown> | null = null;
export const getKoliBri = (): Record<string, unknown> => KoliBri || {};
export const initKoliBri = (): void => {
	if (KoliBri === null) {
		KoliBri = getWindow().KoliBri || {};
		const Modal = new ModalService();
		const Toaster = new ToasterService(getDocument());
		Object.defineProperty(KoliBri, 'Modal', {
			get: function (): ModalService {
				return Modal;
			},
		});
		Object.defineProperty(KoliBri, 'Toaster', {
			get: function (): ToasterService {
				return Toaster;
			},
		});
		initMeta();
	} else {
		console.warn(`You can only initialize KoliBri once.`);
	}
};
export { KoliBri };

export const renderDevAdvice = (): void => {
	if (getWindow().KoliBri === undefined) {
		Object.defineProperty(window, 'KoliBri', {
			get: function () {
				return KoliBri;
			},
		});
	}
	if (getKoliBri().adviceShown !== true) {
		Object.defineProperty(KoliBri, 'adviceShown', {
			get: function () {
				return true;
			},
		});
		Log.debug(
			`
You are using the KoliBri component library. If you have any suggestions for improvement or find a problem, please contact us:

Ticket: https://github.com/public-ui/kolibri/issues/new/choose (for privacy reasons, please use email)
Email: kolibri@itzbund.des
`
		);
	}
};

let nonce = (): string => Math.floor(Math.random() * 16777215).toString(16);

if (processEnv === 'test') {
	nonce = (): string => 'nonce';
}

export { nonce };
