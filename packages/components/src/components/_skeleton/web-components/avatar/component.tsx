import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { ColorPair } from '../../../../schema';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { AvatarApi } from '../../internal/functional-components/avatar/api';
import { AvatarController } from '../../internal/functional-components/avatar/controller';
import { AvatarFC } from '../../internal/functional-components/avatar/component';

@Component({
	tag: 'kol-avatar2',
	shadow: true,
})
export class KolAvatar2 implements WebComponentInterface<AvatarApi> {
	private readonly ctrl = new AvatarController(this);

	/**
	 * Sets the color(s) of the avatar
	 */
	@Prop()
	public _color!: string | ColorPair;

	@Watch('_color')
	public watchColor(value?: string | ColorPair): void {
		this.ctrl.watchColor(value);
	}

	/**
	 * Sets the label of the avatar component.
	 */
	@Prop()
	public _label!: string;

	@Watch('_label')
	public watchLabel(value?: string): void {
		this.ctrl.watchLabel(value);
	}

	/**
	 * Sets the source of the avatar component.
	 */
	@Prop()
	public _src?: string;

	@Watch('_src')
	public watchSrc(value?: string): void {
		this.ctrl.watchSrc(value);
	}

	@State()
	public initials: string = '';

	public componentWillLoad(): void {
		this.watchColor(this._color);
		this.watchLabel(this._label);
		this.watchSrc(this._src);
		this.ctrl.componentWillLoad({
			color: this._color,
			label: this._label,
			src: this._src,
		});
	}

	public render(): JSX.Element {
		const { color, label, src } = this.ctrl.getProps();
		const { initials } = this;
		return (
			<Host>
				<AvatarFC
					color={color}
					label={label}
					src={src}
					initials={initials}
				/>
			</Host>
		);
	}
}
