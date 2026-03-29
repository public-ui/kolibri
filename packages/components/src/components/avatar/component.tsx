import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import type { AvatarApi } from '../../internal/functional-components/avatar/api';
import { AvatarFC } from '../../internal/functional-components/avatar/component';
import { AvatarController } from '../../internal/functional-components/avatar/controller';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { ColorPair } from '../../schema';

/**
 * The **Avatar** component displays either a small image of the user or their initials if no image is available.
 */
@Component({
	tag: 'kol-avatar',
	shadow: true,
	styleUrls: {
		default: './style.scss',
	},
})
export class KolAvatar extends BaseWebComponent<AvatarApi> implements WebComponentInterface<AvatarApi> {
	private readonly ctrl = new AvatarController(this.setState, this.getState);

	/**
	 * Defines the backgroundColor and foregroundColor.
	 */
	@Prop()
	public _color?: string | ColorPair;

	@Watch('_color')
	public watchColor(value?: string | ColorPair): void {
		this.ctrl.watchColor(value);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop()
	public _label!: string;

	@Watch('_label')
	public watchLabel(value?: string): void {
		this.ctrl.watchLabel(value);
	}

	/**
	 * Sets the image `src` attribute to the given string.
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
		this.ctrl.componentWillLoad({
			color: this._color,
			label: this._label,
			src: this._src,
		});
	}

	public render(): JSX.Element {
		return (
			<Host>
				<AvatarFC
					color={this.ctrl.getRenderProp('color')}
					label={this.ctrl.getRenderProp('label')}
					src={this.ctrl.getRenderProp('src')}
					initials={this.initials}
				/>
			</Host>
		);
	}
}
