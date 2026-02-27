import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { SpinApi } from '../../internal/functional-components/spin/api';
import { SpinFC } from '../../internal/functional-components/spin/component';
import { SpinController } from '../../internal/functional-components/spin/controller';
import type { SpinVariantPropType } from '../../schema';

@Component({
	tag: 'kol-spin',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolSpin implements WebComponentInterface<SpinApi> {
	private readonly ctrl = new SpinController(this);

	/**
	 * Makes the element show up.
	 * @TODO: Change type back to `ShowPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _show?: boolean = false;

	@Watch('_show')
	public watchShow(value?: boolean): void {
		this.ctrl.watchShow(value);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: string;

	@Watch('_label')
	public watchLabel(value?: string): void {
		this.ctrl.watchLabel(value);
	}

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: SpinVariantPropType = 'dot';

	@Watch('_variant')
	public watchVariant(value?: SpinVariantPropType): void {
		this.ctrl.watchVariant(value);
	}

	@State()
	public showToggled: boolean = false;

	public componentWillLoad(): void {
		this.ctrl.componentWillLoad({
			label: this._label,
			show: this._show,
			variant: this._variant,
		});
	}

	public render(): JSX.Element {
		const { label, show, variant } = this.ctrl.getProps();
		const { showToggled } = this;
		return (
			<Host class="kol-spin">
				<SpinFC label={label} show={show} showToggled={showToggled} variant={variant} />
			</Host>
		);
	}
}
