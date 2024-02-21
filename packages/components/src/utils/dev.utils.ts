import { ModalService } from '../components/modal/service';
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
export const getExperimentalMode = (): boolean => EXPERIMENTAL_MODE === true;
export const getColorContrastAnalysis = (): boolean => COLOR_CONTRAST_ANALYSIS === true;

type LogShield = {
	label: string;
	style: string;
};

type LogShieldOptions = {
	classifier?: string;
	forceLog?: boolean;
	overwriteStyle?: string;
};

export class Log {
	private static shield: LogShield = {
		label: '%cKoliBri',
		style: 'color: white; background: #666; font-weight: bold; padding: .25em .5em; border-radius: 3px; border: 1px solid #000',
	};

	private static mapToArray(msg: unknown | unknown[]): unknown[] {
		return Array.isArray(msg) ? msg : [msg];
	}

	private static handleClassifier(classifier?: string): string {
		if (typeof classifier === 'string' && classifier.length > 0) {
			return `${Log.shield.label} | ${classifier}`;
		} else {
			return Log.shield.label;
		}
	}

	private static getShield(options?: LogShieldOptions): string[] {
		return [Log.handleClassifier(options?.classifier), `${Log.shield.style};${options?.overwriteStyle || ''}`];
	}

	public static debug(msg: unknown | unknown[], options?: LogShieldOptions): void {
		if (DEV_MODE || options?.forceLog === true) {
			console.debug(...Log.getShield(options), ...Log.mapToArray(msg));
		}
	}

	public static info(msg: unknown | unknown[], options?: LogShieldOptions): void {
		if (DEV_MODE || options?.forceLog === true) {
			console.info(...Log.getShield(options), ...Log.mapToArray(msg));
		}
	}

	public static trace(msg: unknown | unknown[], options?: LogShieldOptions): void {
		if (DEV_MODE || options?.forceLog === true) {
			console.trace(...Log.getShield(options), ...Log.mapToArray(msg));
		}
	}

	public static warn(msg: unknown | unknown[], options?: LogShieldOptions): void {
		if (DEV_MODE || options?.forceLog === true) {
			console.warn(...Log.getShield(options), ...Log.mapToArray(msg));
		}
	}

	public static error(msg: unknown | unknown[], options?: LogShieldOptions): void {
		if (DEV_MODE || options?.forceLog === true) {
			console.error(...Log.getShield(options), ...Log.mapToArray(msg));
		}
	}

	public static throw(msg: unknown | unknown[], options?: LogShieldOptions): void {
		if (DEV_MODE || options?.forceLog === true) {
			throw new Error(...Log.getShield(options), ...Log.mapToArray(msg));
		}
	}
}

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
		if (getKoliBri().Modal === undefined) {
			const Modal = new ModalService();
			Object.defineProperty(getKoliBri(), 'Modal', {
				get: function (): ModalService {
					return Modal;
				},
			});
		}
		Log.debug(
			`
	,--. ,--.         ,--. ,--. ,-----.           ,--.
	|  .'   /  ,---.  |  | \`--' |  |) /_  ,--.--. \`--'
	|  .   '  | .-. | |  | ,--. |  .-.  \\ |  .--' ,--.
	|  |\\   \\ | '-' | |  | |  | |  '--' / |  |    |  |
	\`--' \`--´  \`---´  \`--' \`--' \`------´  \`--'    \`--'
	🚹 The accessible HTML-Standard | 👉 https://public-ui.github.io | 1.7.12
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
