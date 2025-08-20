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

const MODES = ['development', 'production', 'test'] as const;
export type Mode = (typeof MODES)[number];

let runtimeMode: Mode = 'production';

export const setRuntimeMode = (mode: Mode): void => {
	try {
		if (MODES.includes(mode)) {
			runtimeMode = mode;
		} else {
			throw new Error(`Invalid NODE_ENV value: ${mode}. Expected one of ${MODES.join(', ')}.`);
		}
	} catch (e) {
		void 0;
	}
};

setRuntimeMode(process.env['NODE_ENV'] as Mode);

let EXPERIMENTAL_MODE: boolean = false;
let COLOR_CONTRAST_ANALYSIS: boolean = false;

export const isDevMode = (): boolean => runtimeMode === 'development';
export const isTestMode = (): boolean => runtimeMode === 'test';
export const isProdMode = (): boolean => runtimeMode === 'production';

export const getExperimentalMode = (): boolean => EXPERIMENTAL_MODE === true;
export const setExperimentalMode = (mode: boolean): void => {
	EXPERIMENTAL_MODE = mode === true;
};

export const getColorContrastAnalysis = (): boolean => COLOR_CONTRAST_ANALYSIS === true;
export const setColorContrastAnalysis = (mode: boolean): void => {
	COLOR_CONTRAST_ANALYSIS = mode === true;
};

type LogShieldOptions = {
	classifier?: string;
	forceLog?: boolean;
	overwriteStyle?: string;
};

const LOG_STYLE = 'color: white; background: #666; font-weight: bold; padding: .25em .5em; border-radius: 3px; border: 1px solid #000';

const mapToArray = (msg: unknown | unknown[]): unknown[] => {
	return Array.isArray(msg) ? msg : [msg];
};

const getLogLabel = (label: string): string => {
	return `%c${label}`;
};

const handleClassifier = (label: string, classifier?: string): string => {
	if (typeof classifier === 'string' && classifier.length > 0) {
		return `${getLogLabel(label)} | ${classifier}`;
	} else {
		return getLogLabel(label);
	}
};

const getShield = (label: string, options?: LogShieldOptions): string[] => {
	return [handleClassifier(label, options?.classifier), `${LOG_STYLE};${options?.overwriteStyle || ''}`];
};

const isDevModeOrForceLog = (forceLog?: boolean): boolean => isDevMode() || forceLog === true;

export class Logger {
	public constructor(private readonly label: string) {}

	public debug(msg: unknown | unknown[], options?: LogShieldOptions): void {
		if (isDevModeOrForceLog(options?.forceLog)) {
			// eslint-disable-next-line no-console
			console.debug(...getShield(this.label, options), ...mapToArray(msg));
		}
	}

	public info(msg: unknown | unknown[], options?: LogShieldOptions): void {
		if (isDevModeOrForceLog(options?.forceLog)) {
			// eslint-disable-next-line no-console
			console.info(...getShield(this.label, options), ...mapToArray(msg));
		}
	}

	public trace(msg: unknown | unknown[], options?: LogShieldOptions): void {
		if (isDevModeOrForceLog(options?.forceLog)) {
			// eslint-disable-next-line no-console
			console.trace(...getShield(this.label, options), ...mapToArray(msg));
		}
	}

	public warn(msg: unknown | unknown[], options?: LogShieldOptions): void {
		if (isDevModeOrForceLog(options?.forceLog)) {
			// eslint-disable-next-line no-console
			console.warn(...getShield(this.label, options), ...mapToArray(msg));
		}
	}

	public error(msg: unknown | unknown[], options?: LogShieldOptions): void {
		// eslint-disable-next-line no-console
		console.error(...getShield(this.label, options), ...mapToArray(msg));
	}

	public throw(msg: unknown | unknown[], options?: LogShieldOptions): void {
		if (isDevModeOrForceLog(options?.forceLog)) {
			throw new Error(...getShield(this.label, options), ...mapToArray(msg));
		}
	}
}

export const Log = new Logger('KoliBri');
