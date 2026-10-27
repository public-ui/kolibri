import type { HasCreateButtonPropType } from '../../schema/props/has-create-button';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Renders a create button after the tabs. Clicking it invokes `_on.onCreate` and dispatches the
 * `create` DOM event — adding the new tab is up to the consumer.
 */
export type HasCreateButtonProp = SimpleProp<'hasCreateButton', HasCreateButtonPropType>;
export const hasCreateButtonProp = createPropDefinition<HasCreateButtonProp>('hasCreateButton', false, normalizeBoolean);
