import type { MaxLengthBehaviorPropType } from '../../../schema';
import { createRelatedUniqueId } from '../../../utils/dev.utils';
import { hasCounterProp, maxLengthBehaviorProp, maxLengthProp } from '../../props';
import { BaseBehavior } from '../base-behavior';
import type { FormFieldFCProps } from '../form-field/component';
import type { BehaviorInterface, ResolvedInputProps, StateAccess } from '../generic-types';
import type { CounterApi } from './api';
import { counterPropsConfig } from './api';
import { getCounterAriaText, getCounterMaxText, getCounterVisualText } from './texts';

/** A printable single character without Ctrl, Meta or Alt, i.e. a key press that inserts a character. */
const isCharacterInputKey = (event: KeyboardEvent): boolean => event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;

/** Invisible no-break space that makes an identical live region text differ, so it is announced again. */
const REANNOUNCE_MARKER = ' ';

const ARIA_DEBOUNCE_MS = 1000;

type CounterLimit = {
	maxLength?: number;
	maxLengthBehavior: MaxLengthBehaviorPropType;
};

/**
 * Character counter and character limit of a text field.
 *
 * It owns `hasCounter`, `maxLength` and `maxLengthBehavior` and writes the texts of the two counter
 * spans of `FormFieldFC` directly into the DOM, without a re-render: the visible span immediately,
 * the `aria-live` span debounced, so a screen reader does not announce every key stroke.
 */
export class CounterBehavior extends BaseBehavior<CounterApi> implements BehaviorInterface<CounterApi> {
	private visualSpan?: HTMLSpanElement;
	private ariaSpan?: HTMLSpanElement;
	private debounceTimer?: ReturnType<typeof setTimeout>;
	private reannounceToggle = false;

	public constructor(stateAccess: StateAccess<CounterApi>) {
		super(stateAccess, counterPropsConfig);
	}

	public componentWillLoad(props: ResolvedInputProps<CounterApi>): void {
		this.watchHasCounter(props.hasCounter);
		this.watchMaxLength(props.maxLength);
		this.watchMaxLengthBehavior(props.maxLengthBehavior);
	}

	public watchHasCounter(value?: boolean): void {
		hasCounterProp.apply(value, (v) => this.setRenderProp('hasCounter', v));
	}

	public watchMaxLength(value?: number): void {
		maxLengthProp.apply(value, (v) => this.setRenderProp('maxLength', v));
	}

	public watchMaxLengthBehavior(value?: MaxLengthBehaviorPropType): void {
		maxLengthBehaviorProp.apply(value, (v) => this.setRenderProp('maxLengthBehavior', v));
	}

	public readonly setVisualRef = (el?: HTMLSpanElement): void => {
		this.visualSpan = el;
	};

	public readonly setAriaRef = (el?: HTMLSpanElement): void => {
		this.ariaSpan = el;
	};

	public hasCounter(): boolean {
		return this.getRenderProp('hasCounter') === true;
	}

	/** A maximum with the behavior `'soft'`: the counter announces the exceeded limit instead of `maxlength` preventing it. */
	public hasSoftLimit(): boolean {
		const { maxLength, maxLengthBehavior } = this.getLimit();
		return typeof maxLength === 'number' && maxLengthBehavior === 'soft';
	}

	/** The native `maxlength` attribute: only a hard limit prevents longer input. */
	public getMaxLengthAttribute(): number | undefined {
		const { maxLength, maxLengthBehavior } = this.getLimit();
		return maxLengthBehavior === 'hard' ? maxLength : undefined;
	}

	/** The `counter` prop of `FormFieldFC`; the counter is only rendered with `hasCounter`. */
	public getCounterProps(): FormFieldFCProps['counter'] {
		if (!this.hasCounter()) {
			return undefined;
		}
		const { maxLength, maxLengthBehavior } = this.getLimit();
		return { maxLength, maxLengthBehavior, visualRef: this.setVisualRef, ariaRef: this.setAriaRef };
	}

	/**
	 * The ID of the hidden character limit hint, which the control references in `aria-describedby`.
	 * The hint only exists for a maximum without counter, because the counter announces the maximum itself.
	 */
	public getCharacterLimitHintId(id: string): string | undefined {
		return typeof this.getRenderProp('maxLength') === 'number' && !this.hasCounter() ? createRelatedUniqueId(id, 'character-limit-hint') : undefined;
	}

	/** Updates the visible span immediately and the `aria-live` span debounced. */
	public update(currentLength: number): void {
		const limit = this.getLimit();
		this.updateVisual(currentLength, limit);
		clearTimeout(this.debounceTimer);
		this.debounceTimer = setTimeout(() => this.updateAria(currentLength, limit), ARIA_DEBOUNCE_MS);
	}

	/** Updates both spans without debounce, e.g. after the first render or a programmatic change of the limit. */
	public updateImmediate(currentLength: number): void {
		const limit = this.getLimit();
		this.updateVisual(currentLength, limit);
		clearTimeout(this.debounceTimer);
		this.updateAria(currentLength, limit);
	}

	/**
	 * Announces the reached hard limit again on every further typing attempt. `maxlength` blocks the
	 * input without an `input` event, so the live region would otherwise stay silent.
	 */
	public readonly handleKeyDown = (event: KeyboardEvent, currentLength: number): void => {
		const { maxLength, maxLengthBehavior } = this.getLimit();
		if (maxLengthBehavior !== 'hard' || typeof maxLength !== 'number' || currentLength < maxLength) return;
		if (!isCharacterInputKey(event)) return;
		this.retriggerAria(currentLength);
	};

	/** Announces the `aria-live` span again, debounced, even if its text did not change. */
	public retriggerAria(currentLength: number): void {
		if (!this.ariaSpan) return;
		const limit = this.getLimit();
		clearTimeout(this.debounceTimer);
		this.debounceTimer = setTimeout(() => this.updateAria(currentLength, limit, true), ARIA_DEBOUNCE_MS);
	}

	public destroy(): void {
		clearTimeout(this.debounceTimer);
	}

	private getLimit(): CounterLimit {
		return { maxLength: this.getRenderProp('maxLength'), maxLengthBehavior: this.getRenderProp('maxLengthBehavior') };
	}

	private updateVisual(currentLength: number, { maxLength, maxLengthBehavior }: CounterLimit): void {
		if (!this.visualSpan) return;
		this.visualSpan.innerText = getCounterVisualText(maxLengthBehavior, maxLength, currentLength);
		this.visualSpan.classList.toggle(
			'kol-form-field__counter--exceeded',
			maxLengthBehavior === 'soft' && typeof maxLength === 'number' && currentLength > maxLength,
		);
	}

	private updateAria(currentLength: number, { maxLength, maxLengthBehavior }: CounterLimit, forceReannounce = false): void {
		if (!this.ariaSpan) return;
		let text = [getCounterAriaText(maxLengthBehavior, maxLength, currentLength), getCounterMaxText(maxLengthBehavior, maxLength, currentLength)]
			.filter(Boolean)
			.join(' ');

		if (forceReannounce) {
			// `aria-live` only announces a changed text. A repeated attempt produces the same text, so a
			// no-break space is appended on every other call to make it differ.
			this.reannounceToggle = !this.reannounceToggle;
			if (this.reannounceToggle) {
				text += REANNOUNCE_MARKER;
			}
		}

		this.ariaSpan.innerText = text;
	}
}
