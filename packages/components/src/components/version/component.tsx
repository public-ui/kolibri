import { Component, h, JSX, Prop, State, Watch } from '@stencil/core';
import { Farbspektrum } from '../../enums/color';

import { KoliBriVersionAPI, KoliBriVersionStates } from './types';
import { watchString } from '../../utils/prop.validators';

@Component({
	tag: 'kol-version',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolVersion implements KoliBriVersionAPI {
	public render(): JSX.Element {
		return <kol-badge _color={Farbspektrum.Hellgrau} _icon="codicon codicon-versions" _label={`v${this.state._version}`} />;
	}

	/**
	 * Gibt die Versionsnummer als Text an.
	 */
	@Prop() public _version!: string;

	@State() public state: KoliBriVersionStates = {
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
