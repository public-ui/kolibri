import type { LinkButtonProps } from '../../../schema';
import { KolLinkWcTag } from '../../../core/component-names';

export const getLinkButtonHtml = (props: LinkButtonProps): string => {
	return `
<kol-link-button  class="kol-link-button">
  <mock:shadow-root>
	<${KolLinkWcTag}
			${props._href != null ? `_href="${props._href}"` : ''}
			${props._label != null ? `_label="${props._label}"` : ''}
			${typeof props._icons === 'string' ? `_icons="${props._icons}"` : ''}
			${props._target != null ? `_target="${props._target}"` : ''}
			${typeof props._download === 'string' ? ` _download="${props._download}"` : ''}
			${props._hideLabel ? `_hidelabel=""` : ''}
			${props._tooltipAlign != null ? `_tooltipalign="${props._tooltipAlign}"` : '_tooltipalign="right"'}
			${props._disabled ? `_disabled=""` : ''}
			_role="button"
			class="button normal"
		>
	       <slot name="expert" slot="expert"></slot>
	</${KolLinkWcTag}>
  </mock:shadow-root>
</kol-link-button>`;
};
