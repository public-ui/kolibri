import type { JSX } from '@stencil/core';
import { h } from '@stencil/core';

import { ButtonFC } from '../../../fc/src/button/component';
import { BaseButtonWebComponent as SharedButtonOrchestration } from '../../../internals/src/components/button/base';

/**
 * Stencil render shim for the shared button orchestration: adds the `ButtonFC` render call, the
 * only part of the button web component that is bound to the Stencil vdom. Everything else —
 * prop application, behaviors, event handling — lives in the framework-free internals base.
 */
export abstract class BaseButtonWebComponent extends SharedButtonOrchestration {
	/** Renders `ButtonFC` from the current render props and state. */
	protected renderButtonFC(): JSX.Element {
		return <ButtonFC {...this.getButtonFCProps()} />;
	}
}
