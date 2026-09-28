import { BaseWebComponent } from '../internal/functional-components/base-web-component';
import { CounterBehavior } from '../internal/functional-components/counter/behavior';
import type { MaxLengthBehaviorPropType } from '../schema';

/**
 * Adapter of the legacy text fields onto `CounterBehavior`. The legacy fields pass the limit with
 * every call; it is applied to the behavior before the call is forwarded.
 */
export class CounterDomUpdater {
	private readonly behavior = new CounterBehavior(BaseWebComponent.stateLess);

	readonly setVisualRef = this.behavior.setVisualRef;

	readonly setAriaRef = this.behavior.setAriaRef;

	private applyLimit(maxLength: number | undefined, maxLengthBehavior: MaxLengthBehaviorPropType): void {
		this.behavior.watchMaxLength(maxLength);
		this.behavior.watchMaxLengthBehavior(maxLengthBehavior);
	}

	update(currentLength: number, maxLength: number | undefined, maxLengthBehavior: MaxLengthBehaviorPropType): void {
		this.applyLimit(maxLength, maxLengthBehavior);
		this.behavior.update(currentLength);
	}

	updateImmediate(currentLength: number, maxLength: number | undefined, maxLengthBehavior: MaxLengthBehaviorPropType): void {
		this.applyLimit(maxLength, maxLengthBehavior);
		this.behavior.updateImmediate(currentLength);
	}

	readonly handleKeyDown = (event: KeyboardEvent, currentLength: number, maxLength: number | undefined, maxLengthBehavior: MaxLengthBehaviorPropType): void => {
		this.applyLimit(maxLength, maxLengthBehavior);
		this.behavior.handleKeyDown(event, currentLength);
	};

	public retriggerAria(currentLength: number, maxLength: number | undefined, maxLengthBehavior: MaxLengthBehaviorPropType): void {
		this.applyLimit(maxLength, maxLengthBehavior);
		this.behavior.retriggerAria(currentLength);
	}

	destroy(): void {
		this.behavior.destroy();
	}
}
