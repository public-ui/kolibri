import type { InputColorProps, InputColorStates } from '@public-ui/schema';
import { mixMembers } from 'stencil-awesome-test';
import { nonce } from '../../../utils/dev.utils';
import { KolInputTag } from '../../../core/component-names';
import { showExpertSlot } from '@public-ui/schema';
import { getRenderStates } from '../../input/controller';

export const getInputColorHtml = (props: InputColorProps): string => {
	const state = mixMembers<InputColorProps, InputColorStates>(
		{
			_autoComplete: 'off',
			_hideError: false,
			_id: `id-${nonce()}`,
			_label: '', // ⚠ required
			_suggestions: [],
		},
		props,
	);
	const hasExpertSlot = showExpertSlot(state._label);
	const { ariaDescribedBy } = getRenderStates(state);

	return `
	<kol-input-color class="kol-input-color" ${state._required ? `_required=""` : ''} ${state._touched ? `_touched=""` : ''} ${state._alert || state._alert === undefined ? `_alert=""` : ''} ${state._readOnly ? `_readonly=""` : ''}>
	   <mock:shadow-root>
	     <${KolInputTag}
					${state._disabled ? `_disabled=""` : ''}
					${state._hideLabel ? `_hideLabel=""` : ''}
					${state._touched ? `_touched=""` : ''}
					_hint=""
					_id="${state._id}"
					_label="${state._label ? `${state._label}` : ''}"
					_tooltipalign="top"
					class="color ${state._hideLabel ? 'hide-label' : ''} "
					role="presentation"
			 >
			 <span slot="label"> ${
					hasExpertSlot
						? `<slot name="expert"></slot> `
						: typeof state._accessKey === 'string'
							? `
						 ${state._label}
						 <span class="access-key-hint" aria-hidden="true">
						 ${state._accessKey}
						 </span>
					  `
							: ` <span>${state._label}</span> `
				}
				</span>
	       <div slot="input">
	        	<input
							${state._disabled ? `disabled=""` : ''}
							${state._hideLabel && typeof state._label === 'string' ? `aria-label="${state._label}"` : ''}
							autocapitalize="off"
							autocomplete="off"
							autocorrect="off"
							id="${state._id}"
							slot="input"
							spellcheck="false"
							type="color"
							${ariaDescribedBy.length > 0 ? `aria-describedby="${ariaDescribedBy.join(' ')}"` : ''}
						>
	       </div>
	     </${KolInputTag}>
	   </mock:shadow-root>
	</kol-input-color>`;
};
