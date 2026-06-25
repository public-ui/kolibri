import { getCounterAriaText, getCounterMaxText, getCounterVisualText } from '../functional-components/FormField/counter-utils';
import type { MaxLengthBehaviorPropType } from '../schema';

export class CounterDomUpdater {
	private visualSpan?: HTMLSpanElement;
	private ariaSpan?: HTMLSpanElement;
	private debounceTimer?: ReturnType<typeof setTimeout>;

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

	private doUpdateAria(currentLength: number, maxLength: number | undefined, maxLengthBehavior: MaxLengthBehaviorPropType): void {
		if (!this.ariaSpan) return;
		const ariaText = getCounterAriaText(maxLengthBehavior, maxLength, currentLength);
		const maxText = getCounterMaxText(maxLengthBehavior, maxLength, currentLength);
		this.ariaSpan.innerText = [ariaText, maxText].filter(Boolean).join(' ');
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

	destroy(): void {
		clearTimeout(this.debounceTimer);
	}
}
