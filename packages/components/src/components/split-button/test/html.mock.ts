import type { SkipNavProps, SkipNavStates } from '@public-ui/schema';
import { mixMembers } from 'stencil-awesome-test';
import { KolButtonWcTag } from '../../../core/component-names';

export const getSplitButtonHtml = (props: SkipNavProps): string => {
	let state = mixMembers<SkipNavProps, SkipNavStates>(
		{
			_show: false,
		},
		props,
	);
	const variant = typeof state._variant === 'string' ? state._variant : 'normal';

	return `
<kol-split-button  class="kol-split-button">
  <mock:shadow-root>
  <${KolButtonWcTag}
		${state._disabled ? `_disabled=""` : ''}
		${typeof state._name === 'string' ? `_name="${state._name}"` : ''}
		${state._hideLabel ? `_hidelabel=""` : ''}
		${state._icons ? `_icons="${state._icons}"` : ''}
		${typeof state._label === 'string' ? `_label="${state._label}"` : ''}
		_tooltipalign="top"
		_type="button"
		_variant= ${variant}
		class="button main-button ${variant}"
	>
	</${KolButtonWcTag}>
    <div class="horizontal-line"></div>
    <${KolButtonWcTag}
			${state._disabled ? `_disabled=""` : ''}
			_hidelabel=""
			_icons="codicon codicon-triangle-down"
			_label="dropdown öffnen"
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
