import type { InputEmailProps, InputEmailStates } from '../../../schema';
import { mixMembers } from 'stencil-awesome-test';
import { nonce } from '../../../utils/dev.utils';
import { KolInputWcTag } from '../../../core/component-names';
import { showExpertSlot } from '../../../schema';
import { getRenderStates } from '../../input/controller';

export const getInputEmailHtml = (props: InputEmailProps): string => {
	const state = mixMembers<InputEmailProps, InputEmailStates>(
		{
			_autoComplete: 'off',
			_currentLength: 0,
			_hasValue: false,
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
	<kol-input-email class="kol-input-email"  ${state._touched ? `_touched=""` : ''} ${state._alert || state._alert === undefined ? `_alert=""` : ''} >
	   <mock:shadow-root>
	     <${KolInputWcTag}
					${state._disabled ? `_disabled=""` : ''}
					${state._hideLabel ? `_hideLabel=""` : ''}
					${state._required ? `_required=""` : ''}
					${state._readOnly ? `_readonly=""` : ''}
					${state._touched ? `_touched=""` : ''}
					_hint=""
					_id="${state._id}"
					_label="${state._label ? `${state._label}` : ''}"
					_tooltipalign="top"
					class="email ${state._hideLabel ? `hide-label` : ''}"
					role="presentation"
					_currentlength="0"
					${state._alert || state._alert === undefined ? `_alert=""` : ''}
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
							spellcheck="false"
							type="email"
							${state._readOnly ? `readonly=""` : ''}
							${state._required ? `required=""` : ''}
							${ariaDescribedBy.length > 0 ? `aria-describedby="${ariaDescribedBy.join(' ')}"` : ''}
						>
	       </div>
	     </${KolInputWcTag}>
	   </mock:shadow-root>
	</kol-input-email>`;
};
