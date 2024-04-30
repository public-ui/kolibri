import { Log } from './dev.utils';

type HintOptions = {
	details?: unknown[];
	force?: boolean;
};

const a11yCache: Set<string> = new Set();
export const a11yHint = (msg: string, options?: HintOptions): void => {
	if (a11yCache.has(msg) === false || !!options?.force) {
		a11yCache.add(msg);
		Log.debug(([msg] as unknown[]).concat(options?.details || []), {
			classifier: `✋ a11y`,
			forceLog: !!options?.force,
			overwriteStyle: '; background-color: #09f',
		});
	}
};

// const deprecatedCache: Set<string> = new Set();
// export const deprecatedHint = (msg: string, options?: HintOptions): void => {
// 	if (deprecatedCache.has(msg) === false || !!options?.force) {
// 		deprecatedCache.add(msg);
// 		Log.warn(([msg] as unknown[]).concat(options?.details || []), {
// 			classifier: `🔥 deprecated`,
// 			forceLog: !!options?.force,
// 			overwriteStyle: '; background-color: #f00',
// 		});
// 	}
// };

const devCache: Set<string> = new Set();
export const devHint = (msg: string, options?: HintOptions): void => {
	if (devCache.has(msg) === false || !!options?.force) {
		devCache.add(msg);
		Log.debug(([msg] as unknown[]).concat(options?.details || []), {
			classifier: `💻 dev`,
			forceLog: !!options?.force,
			overwriteStyle: '; background-color: #f09',
		});
	}
};
export const devWarning = (msg: string, options?: HintOptions): void => {
	if (devCache.has(msg) === false || !!options?.force) {
		devCache.add(msg);
		Log.warn(([msg] as unknown[]).concat(options?.details || []), {
			classifier: `⚠️ dev`,
			forceLog: !!options?.force,
			overwriteStyle: '; background-color: #f09',
		});
	}
};

const featureCache: Set<string> = new Set();
export const featureHint = (msg: string, done = false, options?: HintOptions): void => {
	if (featureCache.has(msg) === false || !!options?.force) {
		featureCache.add(msg);
		msg += done === true ? ' ✅' : '';
		Log.debug(([msg] as unknown[]).concat(options?.details || []), {
			classifier: `🌟 feature`,
			forceLog: !!options?.force,
			overwriteStyle: '; background-color: #309',
		});
	}
};
devHint(
	`Wir freuen uns über jedes Feedback, Kommentare, Screenshots oder Demo-Links von einer auf KoliBri-basierenden Anwendung (kolibri@itzbund.de). Vielen Dank!`,
);

const uiUxCache: Set<string> = new Set();
export const uiUxHint = (msg: string, options?: HintOptions): void => {
	if (uiUxCache.has(msg) === false || !!options?.force) {
		uiUxCache.add(msg);
		Log.debug(([msg] as unknown[]).concat(options?.details || []), {
			classifier: `📑 ui/ux`,
			forceLog: !!options?.force,
			overwriteStyle: '; background-color: #060;',
		});
	}
};

export const a11yHintDisabled = (): void => {
	a11yHint(
		`"Disabled" schränkt die Zugänglichkeit und Sichtbarkeit ein. Wir empfehlen aus Sicht der Barrierefreiheit readonly- statt disabled-Attribut zu verwenden.\n- https://uxdesign.cc/is-it-ok-to-grey-out-disabled-buttons-8afa74a0fae`,
	);
};

export const a11yHintLabelingLandmarks = (value: unknown): void => {
	if (typeof value !== 'string' || value === '') {
		a11yHint(
			`Manche Strukturelemente, wie bspw. der nav-Tag, können mehrfach in einer Webseite verwendet werden. Damit die gleichnamigen Strukturelemente voneinander unterschieden werden können, ist es erforderlich ein Aria-Label zu setzen.\n- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Navigation_Role#accessibility_concerns`,
		);
	}
};

export const uiUxHintMillerscheZahl = (className: string, length = 8): void => {
	if (length > 7) {
		uiUxHint(
			`[${className}] Innerhalb von Navigationsstrukturen wird empfohlen nicht mehr als 7 Menüpunkte zu verwenden.

Links:
- https://de.ryte.com/wiki/Millersche_Zahl
- https://de.wikipedia.org/wiki/Millersche_Zahl`,
		);
	}
};
