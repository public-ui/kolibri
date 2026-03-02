import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { ProgressApi } from '../../internal/functional-components/progress/api';
import { ProgressFC } from '../../internal/functional-components/progress/component';
import { ProgressController } from '../../internal/functional-components/progress/controller';
import type { ProgressVariantType } from '../../internal/props';

@Component({
	tag: 'kol-progress',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolProgress implements WebComponentInterface<ProgressApi> {
	private readonly ctrl = new ProgressController(this);

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop()
	public _label?: string;

	@Watch('_label')
	public watchLabel(value?: string): void {
		this.ctrl.watchLabel(value);
	}

	/**
	 * Defines the maximum value of the element.
	 */
	@Prop()
	public _max!: number;

	@Watch('_max')
	public watchMax(value?: number): void {
		this.ctrl.watchMax(value);
	}

	/**
	 * Defines the unit of the step values (not shown).
	 */
	@Prop()
	public _unit?: string;

	@Watch('_unit')
	public watchUnit(value?: string): void {
		this.ctrl.watchUnit(value);
	}

	/**
	 * Defines the value of the element.
	 */
	@Prop()
	public _value!: number;

	@Watch('_value')
	public watchValue(value?: number): void {
		this.ctrl.watchValue(value, this._max);
	}

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop()
	public _variant?: ProgressVariantType;

	@Watch('_variant')
	public watchVariant(value?: ProgressVariantType): void {
		this.ctrl.watchVariant(value);
	}

	@State()
	public unit: string = '%';

	@State()
	public variant: ProgressVariantType = 'bar';

	@State()
	public liveValue: number = 0;

	public componentWillLoad(): void {
		this.ctrl.componentWillLoad({
			label: this._label,
			max: this._max,
			unit: this._unit,
			value: this._value,
			variant: this._variant,
		});
	}

	public disconnectedCallback(): void {
		this.ctrl.destroy();
	}

	public render(): JSX.Element {
		const { label, max, unit, value, variant } = this.ctrl.getProps();
		const { liveValue } = this;
		return (
			<Host>
				<ProgressFC label={label} max={max} unit={unit} value={value} variant={variant} liveValue={liveValue} />
			</Host>
		);
	}
}
