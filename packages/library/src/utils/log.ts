import { getDevMode } from './dev.utils';

type LogShield = {
	label: string;
	style: string;
};

type LogShieldOptions = {
	classifier?: string;
	forceLog?: boolean;
	overwriteStyle?: string;
};

const DEV_MODE = getDevMode();

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
