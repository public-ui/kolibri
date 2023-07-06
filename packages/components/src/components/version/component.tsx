import { Component, h, JSX, Prop, State, Watch } from '@stencil/core';

import { Farbspektrum } from '../../enums/color';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { KoliBriVersionAPI, KoliBriVersionStates } from './types';

@Component({
	tag: 'kol-version',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolVersion implements KoliBriVersionAPI {
	public render(): JSX.Element {
		return <kol-badge _color={Farbspektrum.Hellgrau} _icon="codicon codicon-versions" _label={`v${this.state._label}`} />;
	}

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 */
	@Prop() public _label?: LabelPropType; // TODO: required in v2

	/**
	 * Gibt die Versionsnummer als Text an.
	 * @deprecated use _label instead
	 */
	@Prop() public _version?: string;

	@State() public state: KoliBriVersionStates = {
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
