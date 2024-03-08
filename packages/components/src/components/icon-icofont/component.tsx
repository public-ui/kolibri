import type { Generic } from 'adopted-style-sheets';
import { Component, h, Host, JSX, Prop } from '@stencil/core';

import { Icofont } from '../../types/icofont';
import { PropAriaLabel } from '../../types/props/aria-label';

type RequiredProps = PropAriaLabel & {
	icon: Icofont;
};
type OptionalProps = {
	part: string;
};
// type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

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
			<Host class="kol-icon-icofont">
				<kol-icon
					exportparts={`icon${typeof this._part === 'string' ? `,${this._part}` : ''}`}
					_ariaLabel={this._ariaLabel}
					_icon={typeof this._icon === 'string' ? `icofont-${this._icon}` : (undefined as unknown as string)}
				/>
			</Host>
		);
	}

	/**
	 * Setzt die semantische Beschriftung der Komponente.
	 */
	@Prop() public _ariaLabel!: string;

	/**
	 * Gibt einen Identifier eines Icofont Icons an. (https://icofont.com/icons)
	 */
	@Prop() public _icon!: Icofont;

	/**
	 * Deprecated: Gibt den Identifier für den CSS-Part an, um das Icon von Außen ändern zu können. (https://meowni.ca/posts/part-theme-explainer/)
	 *
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	@Prop() public _part?: string;
}
