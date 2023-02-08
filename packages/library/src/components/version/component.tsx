import { Component, h, JSX, Prop, State, Watch } from '@stencil/core';
import { Farbspektrum } from '../../enums/color';

import { Generic } from '@a11y-ui/core';
import { watchString } from '../../utils/prop.validators';

/**
 * API
 */
type RequiredProps = {
	version: string;
};
type OptionalProps = unknown;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

@Component({
	tag: 'kol-version',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolVersion implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	public render(): JSX.Element {
		return <kol-badge _color={Farbspektrum.Hellgrau} _icon="fa-solid fa-infinity" _label={`v${this.state._version}`} />;
	}

	/**
	 * Gibt die Versionsnummer als Text an.
	 */
	@Prop() public _version!: string;

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {
		_version: '0.0.0-alpha.0',
	};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_version')
	public validateVersion(value?: string): void {
		watchString(this, '_version', value, {
			required: true,
		});
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateVersion(this._version);
	}
}
