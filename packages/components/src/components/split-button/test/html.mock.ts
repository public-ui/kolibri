import type { SplitButtonProps, SplitButtonStates } from '@public-ui/schema';
import { mixMembers } from 'stencil-awesome-test';
import { KolButtonWcTag } from '../../../core/component-names';

export const getSplitButtonHtml = (props: SplitButtonProps): string => {
	const state = mixMembers<SplitButtonProps, SplitButtonStates>(
		{
			_show: false,
		},
		props,
	);

	const variant = typeof props._variant === 'string' ? props._variant : 'normal';

	return `
<kol-split-button  class="kol-split-button">
  <mock:shadow-root>
  <${KolButtonWcTag}
		${props._disabled ? `_disabled=""` : ''}
		${typeof props._name === 'string' ? `_name="${props._name}"` : ''}
		${props._hideLabel ? `_hidelabel=""` : ''}
		${props._icons ? `_icons="${props._icons}"` : ''}
		${typeof props._label === 'string' ? `_label="${props._label}"` : ''}
		_tooltipalign="top"
		_type="button"
		_variant= ${variant}
		class="button main-button ${variant}"
	>
	</${KolButtonWcTag}>
    <div class="horizontal-line"></div>
    <${KolButtonWcTag}
			${props._disabled ? `_disabled=""` : ''}
			_hidelabel=""
			_icons="codicon codicon-triangle-down"
			_label="dropdown ${state._show ? 'schließen' : 'öffnen'}"
			class="secondary-button"
		>
		</${KolButtonWcTag}>
    <div class="popover">
      <div class="popover-content">
        <slot></slot>
      </div>
  	</div>
  </mock:shadow-root>
</kol-split-button>`;
};
