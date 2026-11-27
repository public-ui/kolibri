import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { PropsConfigShape, WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { ProgressApi } from '../../internal/functional-components/progress/api';
import { progressPropsConfig } from '../../internal/functional-components/progress/api';
import { ProgressFC } from '../../internal/functional-components/progress/component';
import { clampedNumberValueProp, labelLangSegmentsProp, maxProp, unitProp, variantProgressProp, type ProgressVariantType } from '../../internal/props';
import type { ClampedNumberValuePropType, LabelLangSegmentsPropType, MaxPropType, UnitPropType } from '../../schema';

/**
 * The **Progress** component visualizes the completion status of a task or process. It supports both determinate (percentage-based) and indeterminate variants.
 */
@Component({
	tag: 'kol-progress',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolProgress extends BaseWebComponent<ProgressApi> implements WebComponentInterface<ProgressApi> {
	/**
	 * A11y: Aria live value
	 */
	@State()
	public liveValue: number = 0;

	private interval?: ReturnType<typeof setInterval>;

	protected readonly propsConfig: PropsConfigShape = progressPropsConfig;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop()
	public _label?: LabelLangSegmentsPropType = undefined;

	@Watch('_label')
	public watchLabel(value?: LabelLangSegmentsPropType): void {
		this.applyProp(labelLangSegmentsProp, value);
	}

	/**
	 * Defines the maximum value of the element.
	 */
	@Prop()
	public _max!: MaxPropType;

	@Watch('_max')
	public watchMax(value?: MaxPropType): void {
		this.applyProp(maxProp, value, (v) => {
			this.setRenderProp('max', v);
			this.watchValue(this.getRawProp('value'));
		});
	}

	/**
	 * Defines the unit of the step values (not shown).
	 */
	@Prop()
	public _unit?: UnitPropType = undefined;

	@Watch('_unit')
	public watchUnit(value?: UnitPropType): void {
		this.applyProp(unitProp, value);
	}

	/**
	 * Defines the value of the element.
	 */
	@Prop()
	public _value!: ClampedNumberValuePropType;

	@Watch('_value')
	public watchValue(value?: ClampedNumberValuePropType): void {
		this.setRawProp('value', value);
		clampedNumberValueProp.apply(
			value,
			(v) => {
				this.setRenderProp('value', v);
			},
			{ min: 0, max: this.getRenderProp('max') },
		);
	}

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop()
	public _variant?: ProgressVariantType = undefined;

	@Watch('_variant')
	public watchVariant(value?: ProgressVariantType): void {
		this.applyProp(variantProgressProp, value);
	}

	/** Runs on every (re)insertion into the DOM, so a moved element keeps announcing its value. */
	public connectedCallback(): void {
		this.startLiveValueInterval();
	}

	public componentWillLoad(): void {
		this.watchLabel(this._label);
		this.watchMax(this._max);
		this.watchUnit(this._unit);
		this.watchValue(this._value);
		this.watchVariant(this._variant);
		this.setState('liveValue', this.getRenderProp('value'));
	}

	public disconnectedCallback(): void {
		if (this.interval) {
			clearInterval(this.interval);
			this.interval = undefined;
		}
	}

	// a11y: says the value of the component every 5s
	private startLiveValueInterval(): void {
		clearInterval(this.interval);
		this.interval = setInterval(() => {
			const value = this.getRenderProp('value');
			this.setState('liveValue', value);
		}, 5000);
	}

	public render(): JSX.Element {
		return (
			<Host>
				<ProgressFC
					label={this.getRenderProp('label')}
					max={this.getRenderProp('max')}
					unit={this.getRenderProp('unit')}
					value={this.getRenderProp('value')}
					variant={this.getRenderProp('variant')}
					liveValue={this.liveValue}
				/>
			</Host>
		);
	}
}
