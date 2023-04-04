import { Component, h, JSX, Prop, State, Watch } from '@stencil/core';
import { Farbspektrum } from '../../enums/color';

import { Generic } from '@a11y-ui/core';
import { watchString } from '../../utils/prop.validators';

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
		return <kol-badge _color={Farbspektrum.Hellgrau} _icon="codicon codicon-versions" _label={`v${this.state._version}`} />;
	}

	/**
	 * Gibt die Versionsnummer als Text an.
	 */
	@Prop() public _version!: string;

	@State() public state: States = {
		_version: '0.0.0-alpha.0',
	};

	@Watch('_version')
	public validateVersion(value?: string): void {
		watchString(this, '_version', value, {
			required: true,
		});
	}

	public componentWillLoad(): void {
		this.validateVersion(this._version);
	}
}
