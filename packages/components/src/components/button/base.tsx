import type { JSX } from '@stencil/core';
import { h } from '@stencil/core';

import { BaseButtonWebComponent as SharedButtonOrchestration } from '../../../internals/src/components/button/base';
import { ButtonFC } from '../../internal/functional-components/button/component';

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
