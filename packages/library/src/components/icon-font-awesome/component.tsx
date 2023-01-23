import { Component, h, JSX, Prop } from '@stencil/core';
import { FontAwesome, FontAwesomeOssPrefix } from '../../enums/font-awesome';

import { Generic } from '@a11y-ui/core';
import { AriaLabel } from '../../types/aria-label';

/**
 * API
 */
type RequiredProps = AriaLabel & {
	icon: FontAwesome;
	prefix: FontAwesomeOssPrefix;
};
type OptionalProps = {
	part: string;
};
// type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

/**
 * @deprecated Wir empfehlen die flexiblere KolIcon-Komponente zu verwenden.
 */
@Component({
	tag: 'kol-icon-font-awesome',
	styleUrls: {
		default: '../style.sass',
	},
	shadow: false,
})
export class KolIconFontAwesome implements Generic.Element.Members<RequiredProps, OptionalProps> {
	public render(): JSX.Element {
		return (
			<kol-icon
				exportparts={`icon${typeof this._part === 'string' ? `,${this._part}` : ''}`}
				_ariaLabel={this._ariaLabel}
				_icon={typeof this._prefix === 'string' && typeof this._icon === 'string' ? `${this._prefix} fa-${this._icon}` : (undefined as unknown as string)}
				_part={this._part}
			/>
		);
	}

	/**
	 * Gibt das Aria-Label am Icon an.
	 */
	@Prop() public _ariaLabel!: string;

	/**
	 * Gibt einen Identifier eines Font Awesome Icons an. (https://fontawesome.com/v5.15/icons)
	 */
	@Prop() public _icon!: FontAwesome;

	/**
	 * Gibt den Prefix der Font Awesome Icons an. (https://fontawesome.com/v5.15/how-to-use/on-the-web/referencing-icons/basic-use)
	 */
	@Prop() public _prefix!: FontAwesomeOssPrefix;

	/**
	 * Gibt den Identifier für den CSS-Part an, um das Icon von Außen ändern zu können. (https://meowni.ca/posts/part-theme-explainer/)
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	@Prop() public _part?: string;
}
