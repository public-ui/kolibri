import { getCounterAriaText, getCounterMaxText, getCounterVisualText } from '../functional-components/FormField/counter-utils';
import type { MaxLengthBehaviorPropType } from '../schema';

/**
 * Prüft, ob ein Tastendruck einen Eingabeversuch (druckbares Einzelzeichen) darstellt.
 * Steuertasten (Pfeiltasten, Tab, Backspace, …) sowie Tastenkombinationen mit Strg/Meta/Alt
 * werden ausgeschlossen, da sie kein Zeichen einfügen.
 */
const isCharacterInputKey = (event: KeyboardEvent): boolean => event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;

/** Nicht sichtbares geschütztes Leerzeichen (NBSP), das zur Erzwingung einer erneuten Live-Region-Ankündigung dient. */
const REANNOUNCE_MARKER = '\u00A0';

export class CounterDomUpdater {
	private visualSpan?: HTMLSpanElement;
	private ariaSpan?: HTMLSpanElement;
	private debounceTimer?: ReturnType<typeof setTimeout>;
	private reannounceToggle = false;

	readonly setVisualRef = (el?: HTMLSpanElement): void => {
		this.visualSpan = el;
	};

	readonly setAriaRef = (el?: HTMLSpanElement): void => {
		this.ariaSpan = el;
	};

	private doUpdateVisual(currentLength: number, maxLength: number | undefined, maxLengthBehavior: MaxLengthBehaviorPropType): void {
		if (!this.visualSpan) return;
		this.visualSpan.innerText = getCounterVisualText(maxLengthBehavior, maxLength, currentLength);
		this.visualSpan.classList.toggle(
			'kol-form-field__counter--exceeded',
			maxLengthBehavior === 'soft' && typeof maxLength === 'number' && currentLength > maxLength,
		);
	}

	private doUpdateAria(currentLength: number, maxLength: number | undefined, maxLengthBehavior: MaxLengthBehaviorPropType, forceReannounce = false): void {
		if (!this.ariaSpan) return;
		const ariaText = getCounterAriaText(maxLengthBehavior, maxLength, currentLength);
		const maxText = getCounterMaxText(maxLengthBehavior, maxLength, currentLength);
		let text = [ariaText, maxText].filter(Boolean).join(' ');

		if (forceReannounce) {
			// `aria-live` kündigt nur an, wenn sich der Inhalt gegenüber dem zuletzt vorgelesenen Text ändert.
			// Bei wiederholten Eingabeversuchen ist der Text identisch, sodass ein bloßes Neu-Setzen (auch nach
			// vorherigem Leeren) von Screenreadern nicht erneut vorgelesen wird. Daher wird abwechselnd ein
			// nicht sichtbares NBSP angehängt, damit sich der Textinhalt tatsächlich ändert und die Meldung
			// erneut angekündigt wird.
			this.reannounceToggle = !this.reannounceToggle;
			if (this.reannounceToggle) {
				text += REANNOUNCE_MARKER;
			}
		}

		this.ariaSpan.innerText = text;
	}

	/** Sofortiges Update des visuellen Spans, entprelltes Update des Aria-Spans (1 s). */
	update(currentLength: number, maxLength: number | undefined, maxLengthBehavior: MaxLengthBehaviorPropType): void {
		this.doUpdateVisual(currentLength, maxLength, maxLengthBehavior);
		clearTimeout(this.debounceTimer);
		this.debounceTimer = setTimeout(() => this.doUpdateAria(currentLength, maxLength, maxLengthBehavior), 1000);
	}

	/** Sofortiges Update beider Spans ohne Debounce (für initialles Render und programmatische Wertänderungen). */
	updateImmediate(currentLength: number, maxLength: number | undefined, maxLengthBehavior: MaxLengthBehaviorPropType): void {
		this.doUpdateVisual(currentLength, maxLength, maxLengthBehavior);
		clearTimeout(this.debounceTimer);
		this.doUpdateAria(currentLength, maxLength, maxLengthBehavior);
	}

	/**
	 * Tastendruck-Handler für die Live-Region beim Hard-Limit.
	 *
	 * Ist das Hard-Limit erreicht, blockiert das native `maxlength`-Attribut weitere Eingaben, ohne ein
	 * `input`-Event auszulösen. Span 2 (`aria-live`) bliebe damit unverändert und der Screenreader würde
	 * die „Zeichenlimit erreicht!"-Meldung bei weiteren Eingabeversuchen nicht erneut vorlesen.
	 *
	 * Dieser Handler triggert die Live-Region bei einem Eingabeversuch nach Erreichen des Limits
	 * **entprellt** (1 s) erneut, sodass die visuell versteckte Meldung zum Zeichenlimit wiederholt
	 * vorgelesen wird.
	 */
	readonly handleKeyDown = (event: KeyboardEvent, currentLength: number, maxLength: number | undefined, maxLengthBehavior: MaxLengthBehaviorPropType): void => {
		if (maxLengthBehavior !== 'hard' || typeof maxLength !== 'number' || currentLength < maxLength) return;
		if (!isCharacterInputKey(event)) return;
		this.retriggerAria(currentLength, maxLength, maxLengthBehavior);
	};

	/**
	 * Erzwingt – entprellt – eine erneute Ankündigung der Live-Region. `doUpdateAria` hängt dazu abwechselnd
	 * ein nicht sichtbares NBSP an, sodass der Screenreader die identische Meldung als Änderung erkennt.
	 */
	private retriggerAria(currentLength: number, maxLength: number | undefined, maxLengthBehavior: MaxLengthBehaviorPropType): void {
		if (!this.ariaSpan) return;
		clearTimeout(this.debounceTimer);
		this.debounceTimer = setTimeout(() => this.doUpdateAria(currentLength, maxLength, maxLengthBehavior, true), 1000);
	}

	destroy(): void {
		clearTimeout(this.debounceTimer);
	}
}
