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
			`Die Komponente 'kol-input-adapter-leanup' ist umgezogen. Lesen Sie hier, wie Sie sie migrieren: https://public-ui.github.io/?path=/docs/backlog-und-changelog--page`
		);
	}
	public render(): JSX.Element {
		return (
			<Host>
				<kol-alert _type="warning">
					Die Komponente <code>kol-input-adapter-leanup</code> ist umgezogen. Lesen Sie hier, wie Sie sie migrieren:{' '}
					<kol-link
						_href="https://public-ui.github.io/?path=/docs/backlog-und-changelog--page"
						_label="https://public-ui.github.io/?path=/docs/backlog-und-changelog--page"
						_target="storybook"
					></kol-link>
				</kol-alert>
			</Host>
		);
	}
}
