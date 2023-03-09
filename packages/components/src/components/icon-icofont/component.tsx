import { Component, h, JSX, Prop } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { AriaLabel } from '../../types/aria-label';
import { Icofont } from '../../types/icofont';

/**
 * API
 */
type RequiredProps = AriaLabel & {
	icon: Icofont;
};
type OptionalProps = {
	part: string;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

/**
 * @deprecated Wir empfehlen die flexiblere KolIcon-Komponente zu verwenden.
 */
@Component({
	tag: 'kol-icon-icofont',
	shadow: false,
})
export class KolIconIcofont implements Generic.Element.Members<RequiredProps, OptionalProps> {
	public render(): JSX.Element {
		return (
			<kol-icon
				exportparts={`icon${typeof this._part === 'string' ? `,${this._part}` : ''}`}
				_ariaLabel={this._ariaLabel}
				_icon={typeof this._icon === 'string' ? `icofont-${this._icon}` : (undefined as unknown as string)}
				_part={this._part}
			/>
		);
	}

	/**
	 * Gibt das Aria-Label am Icon an.
	 */
	@Prop() public _ariaLabel!: string;

	/**
	 * Gibt einen Identifier eines Icofont Icons an. (https://icofont.com/icons)
	 */
	@Prop() public _icon!: Icofont;

	/**
	 * Gibt den Identifier für den CSS-Part an, um das Icon von Außen ändern zu können. (https://meowni.ca/posts/part-theme-explainer/)
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	@Prop() public _part?: string;
}
