import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { SpinApi } from '../../internal/functional-components/spin/api';
import { SpinFC } from '../../internal/functional-components/spin/component';
import { SpinController } from '../../internal/functional-components/spin/controller';
import type { SpinVariantType } from '../../internal/props/variant-spin';

@Component({
	tag: 'kol-spin',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolSpin extends BaseWebComponent<SpinApi> implements WebComponentInterface<SpinApi> {
	private readonly ctrl = new SpinController(this.stateAccess);

	/**
	 * Makes the element show up.
	 */
	@Prop()
	public _show?: boolean;

	@Watch('_show')
	public watchShow(value?: boolean): void {
		this.ctrl.watchShow(value);
	}

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
	 * Defines which variant should be used for presentation.
	 */
	@Prop()
	public _variant?: SpinVariantType;

	@Watch('_variant')
	public watchVariant(value?: SpinVariantType): void {
		this.ctrl.watchVariant(value);
	}

	@State()
	public showToggled: boolean = false;

	public componentWillLoad(): void {
		this.ctrl.componentWillLoad({
			show: this._show,
			label: this._label,
			variant: this._variant,
		});
	}

	public render(): JSX.Element {
		return (
			<Host>
				<SpinFC
					show={this.ctrl.getRenderProp('show')}
					label={this.ctrl.getRenderProp('label')}
					variant={this.ctrl.getRenderProp('variant')}
					showToggled={this.showToggled}
					handleGetTranslateActionRunning={this.ctrl.handleGetTranslateActionRunning}
					handleGetTranslateActionDone={this.ctrl.handleGetTranslateActionDone}
				/>
			</Host>
		);
	}
}
