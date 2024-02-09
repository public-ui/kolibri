import type { ButtonAPI, ButtonStates } from '@public-ui/library-schema';
import { Component, h, type JSX } from '@stencil/core';

/**
 * @internal
 */
@Component({
	tag: 'demo-button-wc',
	shadow: false,
})
export class DemoButtonWc implements ButtonAPI {
	public state: ButtonStates = {};

	public render(): JSX.Element {
		return (
			<kol-button
				_label="Test"
				_on={{
					onClick: console.log,
				}}
			></kol-button>
		);
	}
}
