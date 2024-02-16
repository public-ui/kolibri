import type { Generic } from 'adopted-style-sheets';
import type { JSX } from '@stencil/core';
import { h, Host, State } from '@stencil/core';

import { Bundesministerium } from '../../../enums/bund';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = NonNullable<unknown>;
// type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps & OptionalProps; // Linter: "Type 'RequiredProps' does not satisfy the constraint 'object'."
type OptionalStates = OptionalProps;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

// @Component({
//   tag: 'kol-all',
// })
// ts-prune-ignore-next
export class KolAll implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	@State() public state: States = {};

	public render(): JSX.Element {
		return (
			<Host>
				<kol-abbr _label=""></kol-abbr>
				<kol-accordion _label=""></kol-accordion>
				<kol-alert></kol-alert>
				<kol-badge _label="Label"></kol-badge>
				<kol-breadcrumb _label="" _links={[]}></kol-breadcrumb>
				<kol-button _label="Label" _on={{}}></kol-button>
				<kol-button-group></kol-button-group>
				<kol-card _label=""></kol-card>
				<kol-details _label=""></kol-details>
				<kol-form _on={{}}></kol-form>
				<kol-heading _label=""></kol-heading>
				<kol-icon _label="" _icons="codicon codicon-home"></kol-icon>
				<kol-icon-font-awesome _ariaLabel="" _icon="500px" _prefix="fab"></kol-icon-font-awesome>
				<kol-icon-icofont _ariaLabel="" _icon="home"></kol-icon-icofont>
				<kol-indented-text></kol-indented-text>
				<kol-input-checkbox _label="" _value="test"></kol-input-checkbox>
				<kol-input-color _label=""></kol-input-color>
				<kol-input-email _label=""></kol-input-email>
				<kol-input-file _label=""></kol-input-file>
				<kol-input-number _label=""></kol-input-number>
				<kol-input-password _label=""></kol-input-password>
				<kol-input-radio _label="" _options={[]}></kol-input-radio>
				<kol-input-range _label=""></kol-input-range>
				<kol-input-text _label=""></kol-input-text>
				<kol-link _href="" _label="Label"></kol-link>
				<kol-link-group _label="" _links={[]}></kol-link-group>
				<kol-logo _org={Bundesministerium['Auswärtiges Amt']}></kol-logo>
				<kol-modal _label=""></kol-modal>
				<kol-nav _label="" _links={[]}></kol-nav>
				<kol-pagination _on={{}} _page={1} _max={11}></kol-pagination>
				<kol-progress _max={10} _value={5}></kol-progress>
				<kol-select _label="" _options={[]}></kol-select>
				<kol-skip-nav _label="" _links={[]}></kol-skip-nav>
				<kol-spin></kol-spin>
				<kol-table _label="" _data={[]} _headers={{}}></kol-table>
				<kol-tabs _label="" _tabs={[]}></kol-tabs>
				<kol-textarea _label=""></kol-textarea>
				<kol-tooltip-wc _label="Label"></kol-tooltip-wc>
				<kol-version _label=""></kol-version>
			</Host>
		);
	}
}
