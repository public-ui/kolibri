import type { InputTextProps, InputTextStates } from '../../../schema';
import { mixMembers } from 'stencil-awesome-test';
import { nonce } from '../../../utils/dev.utils';
import { KolInputWcTag } from '../../../core/component-names';
import { showExpertSlot } from '../../../schema';
import { getRenderStates } from '../../input/controller';

export const getInpuTextHtml = (props: InputTextProps): string => {
	const state = mixMembers<InputTextProps, InputTextStates>(
		{
			_autoComplete: 'off',
			_currentLength: 0,
			_hasValue: false,
			_hideError: false,
			_id: `id-${nonce()}`,
			_label: '', // ⚠ required
			_suggestions: [],
			_type: 'text',
		},
		props,
	);
	const hasExpertSlot = showExpertSlot(state._label);
	const { ariaDescribedBy } = getRenderStates(state);

	return `
	<kol-input-text
		class="kol-input-text"
		${state._touched ? `_touched=""` : ''}
		${state._alert || state._alert === undefined ? `_alert=""` : ''}
	>
	   <mock:shadow-root>
	     <${KolInputWcTag}
					${state._disabled ? `_disabled=""` : ''}
					${state._hideLabel ? `_hideLabel=""` : ''}
					${state._touched ? `_touched=""` : ''}
					${state._accessKey != null ? `_accessKey="${state._accessKey}"` : ''}
					_hint=""
					_id="${state._id}"
					_label="${state._label != null && state._label !== '' ? `${state._label}` : ''}"
					_tooltipalign="top"
					class="${state._type} ${state._hideLabel ? 'hide-label' : ''} "
					role="presentation"
					_currentlength="0"
					${state._readOnly ? `_readonly=""` : ''}
					${state._required ? `_required=""` : ''}
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
				}</span>
	       <div slot="input">
	        	<input
							${state._disabled ? `disabled=""` : ''}
							${state._hideLabel && typeof state._label === 'string' ? `aria-label="${state._label}"` : ''}
							autocapitalize="off"
							autocomplete="off"
							autocorrect="off"
							id="${state._id}"
							spellcheck="false"
							type="${state._type}"
							${state._readOnly ? `readonly=""` : ''}
							${state._placeholder != null ? `placeholder="${state._placeholder}"` : ''}
							${ariaDescribedBy.length > 0 ? `aria-describedby="${ariaDescribedBy.join(' ')}"` : ''}
							${state._required ? `required=""` : ''}
							${state._accessKey != null ? `accessKey="${state._accessKey}"` : ''}
							>
	       </div>
	     </${KolInputWcTag}>
	   </mock:shadow-root>
	</kol-input-text>`;
};
