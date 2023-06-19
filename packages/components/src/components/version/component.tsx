import { Component, h, JSX, Prop, State, Watch } from '@stencil/core';
import { Farbspektrum } from '../../enums/color';

import { Generic } from '@a11y-ui/core';
import { validateLabel } from '../../types/props';

type RequiredProps = unknown;
type OptionalProps = {
	label: string;
	/**
	 * @deprecated
	 */
	version: string;
};
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
		return <kol-badge _color={Farbspektrum.Hellgrau} _icon="codicon codicon-versions" _label={`v${this.state._label}`} />;
	}

	/**
	 * Gibt die Versionsnummer als Text an.
	 */
	@Prop() public _label?: string;

	/**
	 * Gibt die Versionsnummer als Text an.
	 * @deprecated
	 */
	@Prop() public _version?: string;

	@State() public state: States = {
		_label: '0.0.0-alpha.0',
	};

	@Watch('_label')
	public validateLabel(value?: string): void {
		validateLabel(this, value);
	}

	@Watch('_version')
	public validateVersion(value?: string): void {
		if (!this._label) {
			this.validateLabel(value);
		}
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
		this.validateVersion(this._version);
	}
}
