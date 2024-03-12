import { processEnv } from './reuse';

let WINDOW: Window | null = null;
let DOCUMENT: Document | null = null;

export const getWindow = (): Window => (WINDOW || typeof window === 'undefined' ? (null as unknown as Window) : window);
export const setWindow = (value: Window): void => {
	WINDOW = value;
};

export const getDocument = (): Document => (DOCUMENT || typeof getWindow().document === 'undefined' ? (null as unknown as Document) : getWindow().document);
export const setDocument = (value: Document): void => {
	DOCUMENT = value;
};

let DEV_MODE: boolean | null = null;
let EXPERIMENTAL_MODE: boolean | null = null;
let COLOR_CONTRAST_ANALYSIS: boolean | null = null;

export const getDevMode = (): boolean => DEV_MODE === true;
export const setDevMode = (value: boolean): void => {
	DEV_MODE = value;
};

export const getExperimentalMode = (): boolean => EXPERIMENTAL_MODE === true;
export const setExperimentalMode = (value: boolean): void => {
	EXPERIMENTAL_MODE = value;
};

export const getColorContrastAnalysis = (): boolean => COLOR_CONTRAST_ANALYSIS === true;
export const setColorContrastAnalysis = (value: boolean): void => {
	COLOR_CONTRAST_ANALYSIS = value;
};

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

export { getKoliBri };

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
	🚹 The accessible HTML-Standard | 👉 https://public-ui.github.io | 1.7.15
		`,
			{
				forceLog: true,
			},
		);
	} else {
		console.warn(`You can only initialize KoliBri once.`);
	}
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

if (processEnv === 'test') {
	nonce = (): string => 'nonce';
}

export { nonce };
