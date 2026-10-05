import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import type { AvatarApi } from '../../internal/functional-components/avatar/api';
import { avatarPropsConfig } from '../../internal/functional-components/avatar/api';
import { AvatarFC } from '../../internal/functional-components/avatar/component';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import { colorProp, labelProp, srcProp } from '../../internal/props';
import type { ColorPair } from '../../schema';

/**
 * Formats a single name as an initial by taking the first character and converting it to uppercase.
 * @param name The name to format as an initial
 * @returns The uppercase first character, or empty string if name is empty
 */
const formatNameAsInitial = (name: string): string => {
	if (name.length === 0) {
		return '';
	}

	return name[0].toUpperCase();
};

/**
 * Normalizes the initials from a full name or label.
 * If the name contains multiple words, returns the first letters of the first and last words.
 * Otherwise, returns the first letter of the entire input.
 * @param value The input value to normalize as initials
 * @returns The normalized initials string
 */
const normalizeInitials = (value: string): string => {
	const names = value.trim().split(/\s+/); // split by any whitespace characters
	const first = names[0];
	const last = names[names.length - 1];

	// names might consist of only one word
	if (names.length >= 2 && first && last) {
		return `${formatNameAsInitial(first)}${formatNameAsInitial(last)}`;
	}

	return formatNameAsInitial(value);
};

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
	/**
	 * Defines the backgroundColor and foregroundColor.
	 */
	@Prop()
	public _color?: string | ColorPair;

	@Watch('_color')
	public watchColor(value?: string | ColorPair): void {
		colorProp.apply(value, (v) => this.setRenderProp('color', v));
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop()
	public _label!: string;

	@Watch('_label')
	public watchLabel(value?: string): void {
		labelProp.apply(value, (v) => {
			this.setRenderProp('label', v);
			this.setState('initials', normalizeInitials(v));
		});
	}

	/**
	 * Sets the image `src` attribute to the given string.
	 */
	@Prop()
	public _src?: string;

	@Watch('_src')
	public watchSrc(value?: string): void {
		srcProp.apply(value, (v) => this.setRenderProp('src', v));
	}

	@State()
	public initials: string = '';

	public componentWillLoad(): void {
		this.initRenderProps(avatarPropsConfig);

		colorProp.apply(this._color, (v) => this.setRenderProp('color', v));
		labelProp.apply(this._label, (v) => {
			this.setRenderProp('label', v);
			this.setState('initials', normalizeInitials(v));
		});
		srcProp.apply(this._src, (v) => this.setRenderProp('src', v));
	}

	public render(): JSX.Element {
		return (
			<Host>
				<AvatarFC color={this.getRenderProp('color')} label={this.getRenderProp('label')} src={this.getRenderProp('src')} initials={this.initials} />
			</Host>
		);
	}
}
