import { h, Host, JSX, State } from '@stencil/core';
import { Bundesministerium } from '../../../enums/bund';

import { Generic } from '@public-ui/core';

/**
 * API
 */
type RequiredProps = unknown;
type OptionalProps = unknown;
// type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps & OptionalProps;
type OptionalStates = OptionalProps;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

// @Component({
//   tag: 'kol-all',
// })
// ts-prune-ignore-next
export class KolAll implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {};

	public render(): JSX.Element {
		return (
			<Host>
				<kol-input-adapter-leanup>
					<kol-input-text _id="id"></kol-input-text>
				</kol-input-adapter-leanup>
				<kol-input-adapter-leanup>
					<kol-input-text _id="id"></kol-input-text>
				</kol-input-adapter-leanup>
				<kol-abbr _title=""></kol-abbr>
				<kol-accordion _heading=""></kol-accordion>
				<kol-alert></kol-alert>
				<kol-badge _label=""></kol-badge>
				<kol-breadcrumb _ariaLabel="" _links={[]}></kol-breadcrumb>
				<kol-button _ariaLabel="Label" _label="Label" _on={{}}></kol-button>
				<kol-button-group></kol-button-group>
				<kol-card _heading=""></kol-card>
				<kol-details _summary=""></kol-details>
				<kol-form _on={{}}></kol-form>
				<kol-heading></kol-heading>
				<kol-icon _ariaLabel="" _icon="fa-solid house"></kol-icon>
				<kol-icon-font-awesome _ariaLabel="" _icon="500px" _prefix="fab"></kol-icon-font-awesome>
				<kol-icon-icofont _ariaLabel="" _icon="home"></kol-icon-icofont>
				<kol-indented-text></kol-indented-text>
				<kol-input-checkbox _id="id"></kol-input-checkbox>
				<kol-input-color _id="id"></kol-input-color>
				<kol-input-email _id="id"></kol-input-email>
				<kol-input-file _id="id"></kol-input-file>
				<kol-input-number _id="id"></kol-input-number>
				<kol-input-password _id="id"></kol-input-password>
				<kol-input-radio _id="id" _list={[]}></kol-input-radio>
				<kol-input-range _id="id"></kol-input-range>
				<kol-input-text _id="id"></kol-input-text>
				<kol-link _ariaLabel="Label"></kol-link>
				<kol-link-group _ariaLabel="" _links={[]}></kol-link-group>
				<kol-logo _org={Bundesministerium['Auswärtiges Amt']}></kol-logo>
				<kol-modal _ariaLabel=""></kol-modal>
				<kol-nav _ariaLabel="" _links={[]}></kol-nav>
				<kol-pagination _on={{}} _page={1} _total={11}></kol-pagination>
				<kol-progress _max={10} _value={5}></kol-progress>
				<kol-select _id="id" _list={[]}></kol-select>
				<kol-skip-nav _ariaLabel="" _links={[]}></kol-skip-nav>
				<kol-spin></kol-spin>
				<kol-table _caption="" _data={[]} _headers={{}}></kol-table>
				<kol-tabs _ariaLabel="" _tabs={[]}></kol-tabs>
				<kol-textarea _id="id"></kol-textarea>
				<kol-tooltip _label=""></kol-tooltip>
				<kol-version _version=""></kol-version>
			</Host>
		);
	}
}
