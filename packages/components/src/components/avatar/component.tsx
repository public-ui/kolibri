import {Component, h, Host, JSX, Prop, State, Watch} from '@stencil/core';

import {API, States} from './types';
import {LabelPropType, validateLabel} from '../../types/props/label';
import {ImageSourcePropType, validateImageSource} from '../../types/props/image-source';
import {nonce} from '../../utils/dev.utils';

function formatNameAsInitial(name: string): string {
	return name[0].toUpperCase();
}

export function formatLabelAsInitials(label: string): string {
	const names = label.split(/\s+/) // split by any whitespace characters
	const first = names.at(0)
	const last = names.at(-1)

	if (names.length >= 2 && first && last) { // names might consist of only one word
		return `${formatNameAsInitial(first)} ${formatNameAsInitial(last)}`
	}

	return formatNameAsInitial(label)
}

@Component({
	tag: 'kol-avatar-wc',
	shadow: false,
})
export class KolAvatarWc implements API {
	private readonly nonce = nonce();

	public render(): JSX.Element {
		return (
			<Host>
				<div aria-labelledby={this.nonce} class="container">
					{this.state._src ? (
						<kol-image
							_alt={`Avatar-Bild von ${this.state._label}`}
							_src={this.state._src}
							class="image"
						></kol-image>
					) : (
						<span
							aria-hidden="true"
							class="initials"
						>
							{formatLabelAsInitials(this.state._label)}
						</span>
					)}
				</div>
				<kol-tooltip _label={this.state._label} _id={this.nonce}></kol-tooltip>
			</Host>
		);
	}

	/**
	 * Defines the image source to render
	 */
	@Prop() public _src?: ImageSourcePropType;

	/**
	 * Defines the label, usually the name of the person, to render as alt text and to compute initials from
	 */
	@Prop() public _label!: LabelPropType;

	@State() public state: States = {
		_src: ``,
		_label: ``, // ⚠ required
	};

	@Watch('_src')
	public validateSrc(value?: ImageSourcePropType): void {
		validateImageSource(this, value)
	}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value)
	}

	public componentWillLoad(): void {
		this.validateSrc(this._src);
		this.validateLabel(this._label);
	}
}
