import { Component, h, Host, JSX } from '@stencil/core';

import { deprecatedHint } from '../../utils/a11y.tipps';

/**
 * @deprecated Use the separated lean-input-adapter from the `@leanup/kolibri-components` package.
 */
@Component({
	tag: 'kol-input-adapter-leanup',
	shadow: true,
})
export class KolInputAdapterLeanup {
	public componentWillLoad() {
		deprecatedHint(
			`Die Komponente 'kol-input-adapter-leanup' mit dem Release v1.1.7 umgezogen. Lesen Sie hier, wie Sie sie migrieren: https://public-ui.github.io/docs/changelog/#117---30092022`
		);
	}
	public render(): JSX.Element {
		return (
			<Host>
				<kol-alert _type="warning" class="kol-alert-wc">
					Die Komponente <code>kol-input-adapter-leanup</code> ist umgezogen. Lesen Sie hier, wie Sie sie migrieren:{' '}
					<kol-link
						_href="https://public-ui.github.io/docs/changelog#118---07102022"
						_label="https://public-ui.github.io/docs/changelog#118---07102022"
						_target="documentation"
						class="kol-link"
					></kol-link>
				</kol-alert>
			</Host>
		);
	}
}
