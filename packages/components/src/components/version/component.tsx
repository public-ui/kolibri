import { Component, h, JSX, Prop, State, Watch } from '@stencil/core';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { API, States } from './types';

@Component({
	tag: 'kol-version',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolVersion implements API {
	public render(): JSX.Element {
		return <kol-badge _color="#bec5c9" _icons="codicon codicon-versions" _label={`v${this.state._label}`} />;
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: LabelPropType; // TODO: required in v2

	/**
	 * Deprecated: Gibt die Versionsnummer als Text an.
	 * @deprecated use _label instead
	 */
	@Prop() public _version?: string;

	@State() public state: States = {
		_label: '0.0.0-alpha.0',
	};

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value);
	}

	@Watch('_version')
	public validateVersion(value?: string): void {
		this.validateLabel(value);
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label || this._version);
	}
}
