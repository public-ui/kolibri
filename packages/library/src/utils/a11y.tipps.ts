import { Log } from './dev.utils';

const a11yCache: Set<string> = new Set<string>();
export const a11yHint = (msg: string): void => {
	if (a11yCache.has(msg) === false) {
		a11yCache.add(msg);
		Log.info(msg, {
			classifier: `✋ a11y`,
			overwriteStyle: '; background-color: #09f',
		});
	}
};

const deprecatedCache: Set<string> = new Set<string>();
export const deprecatedHint = (msg: string): void => {
	if (deprecatedCache.has(msg) === false) {
		deprecatedCache.add(msg);
		Log.warn(msg, {
			classifier: `🔥 deprecated`,
			forceLog: true,
			overwriteStyle: '; background-color: #f00',
		});
	}
};

const devCache: Set<string> = new Set<string>();
export const devHint = (msg: string): void => {
	if (devCache.has(msg) === false) {
		devCache.add(msg);
		Log.debug(msg, {
			classifier: `💻 dev`,
			overwriteStyle: '; background-color: #f09',
		});
	}
};

const featureCache: Set<string> = new Set<string>();
export const featureHint = (msg: string, done = false): void => {
	if (featureCache.has(msg) === false) {
		featureCache.add(msg);
		msg += done === true ? ' ✅' : '';
		Log.debug(msg, {
			classifier: `🌟 feature`,
			overwriteStyle: '; background-color: #309',
		});
	}
};
devHint(
	`Wir freuen uns über jedes Feedback, Kommentare, Screenshots oder Demo-Links von einer auf KoliBri-basierenden Anwendung (kolibri@itzbund.de). Vielen Dank!`
);

const uiUxCache: Set<string> = new Set<string>();
const uiUxHint = (msg: string): void => {
	if (uiUxCache.has(msg) === false) {
		uiUxCache.add(msg);
		Log.debug(msg, {
			classifier: `📑 ui/ux`,
			overwriteStyle: '; background-color: #060;',
		});
	}
};

export const a11yHintDisabled = (): void => {
	a11yHint(
		`"Disabled" schränkt die Zugänglichkeit und Sichtbarkeit ein. Wir empfehlen aus Sicht der Barrierefreiheit readonly- statt disabled-Attribut zu verwenden.\n- https://uxdesign.cc/is-it-ok-to-grey-out-disabled-buttons-8afa74a0fae`
	);
};

export const a11yHintLabelingLandmarks = (value: unknown): void => {
	if (typeof value !== 'string' || value === '') {
		a11yHint(
			`Manche Strukturelemente, wie bspw. der nav-Tag, können mehrfach in einer Webseite verwendet werden. Damit die gleichnamigen Strukturelemente voneinander unterschieden werden können, ist es erforderlich ein Aria-Label zu setzen.\n- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Navigation_Role#accessibility_concerns`
		);
	}
};

export const uiUxHintMillerscheZahl = (className: string, length = 8): void => {
	if (length > 7) {
		uiUxHint(
			`[${className}] Innerhalb von Navigationsstrukturen wird empfohlen nicht mehr als 7 Menüpunkte zu verwenden.

Links:
- https://de.ryte.com/wiki/Millersche_Zahl
- https://de.wikipedia.org/wiki/Millersche_Zahl`
		);
	}
};
