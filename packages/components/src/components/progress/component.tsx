import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { ProgressApi } from '../../internal/functional-components/progress/api';
import { progressPropsConfig } from '../../internal/functional-components/progress/api';
import { ProgressFC } from '../../internal/functional-components/progress/component';
import { clampedNumberValueProp, labelProp, maxProp, unitProp, variantProgressProp, type ProgressVariantType } from '../../internal/props';

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
	private interval?: ReturnType<typeof setInterval>;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop()
	public _label?: string;

	@Watch('_label')
	public watchLabel(value?: string): void {
		labelProp.apply(value, (v) => this.setRenderProp('label', v));
	}

	/**
	 * Defines the maximum value of the element.
	 */
	@Prop()
	public _max!: number;

	@Watch('_max')
	public watchMax(value?: number): void {
		maxProp.apply(value, (v) => {
			this.setRenderProp('max', v);
			this.watchValue(this.getRawProp('value'));
		});
	}

	/**
	 * Defines the unit of the step values (not shown).
	 */
	@Prop()
	public _unit?: string;

	@Watch('_unit')
	public watchUnit(value?: string): void {
		unitProp.apply(value, (v) => this.setRenderProp('unit', v));
	}

	/**
	 * Defines the value of the element.
	 */
	@Prop()
	public _value!: number;

	@Watch('_value')
	public watchValue(value?: number): void {
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
	public _variant?: ProgressVariantType;

	@Watch('_variant')
	public watchVariant(value?: ProgressVariantType): void {
		variantProgressProp.apply(value, (v) => this.setRenderProp('variant', v));
	}

	/**
	 * A11y: Aria live value
	 */
	@State()
	public liveValue: number = 0;

	public componentWillLoad(): void {
		this.initRenderProps(progressPropsConfig);

		labelProp.apply(this._label, (v) => this.setRenderProp('label', v));
		maxProp.apply(this._max, (v) => {
			this.setRenderProp('max', v);
			this.watchValue(this.getRawProp('value'));
		});
		unitProp.apply(this._unit, (v) => this.setRenderProp('unit', v));
		this.watchValue(this._value);
		variantProgressProp.apply(this._variant, (v) => this.setRenderProp('variant', v));

		this.setState('liveValue', this.getRenderProp('value'));
		this.startLiveValueInterval();
	}

	public disconnectedCallback(): void {
		if (this.interval) {
			clearInterval(this.interval);
			this.interval = undefined;
		}
	}

	// a11y: says the value of the component every 5s
	private startLiveValueInterval(): void {
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
