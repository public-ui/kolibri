import { Component, h, Host, JSX } from '@stencil/core';

import { deprecatedHint } from '../../utils/a11y.tipps';
import { KolAlertTag, KolLinkTag } from '../../core/component-names';

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
			`Die Komponente 'kol-input-adapter-leanup' mit dem Release v1.1.7 umgezogen. Lesen Sie hier, wie Sie sie migrieren: https://public-ui.github.io/docs/changelog/#117---30092022`,
		);
	}
	public render(): JSX.Element {
		return (
			<Host class="kol-input-adapter-leanup">
				<KolAlertTag _type="warning">
					Die Komponente <code>kol-input-adapter-leanup</code> ist umgezogen. Lesen Sie hier, wie Sie sie migrieren:{' '}
					<KolLinkTag
						_href="https://public-ui.github.io/docs/changelog#118---07102022"
						_label="https://public-ui.github.io/docs/changelog#118---07102022"
						_target="documentation"
					></KolLinkTag>
				</KolAlertTag>
			</Host>
		);
	}
}
