import type { InputDateProps, InputDateStates } from '../../../schema';
import { mixMembers } from 'stencil-awesome-test';
import { nonce } from '../../../utils/dev.utils';
import { KolInputWcTag } from '../../../core/component-names';
import { showExpertSlot } from '../../../schema';
import { getRenderStates } from '../../input/controller';

export const getInputDateHtml = (props: InputDateProps): string => {
	const state = mixMembers<InputDateProps, InputDateStates>(
		{
			_autoComplete: 'off',
			_hasValue: false,
			_hideError: false,
			_id: `id-${nonce()}`,
			_label: '', // ⚠ required
			_suggestions: [],
			_type: 'datetime-local',
		},
		props,
	);
	const hasExpertSlot = showExpertSlot(state._label);
	const { ariaDescribedBy } = getRenderStates(state);
	return `
	<kol-input-date class="kol-input-date" ${state._touched ? `_touched=""` : ''} ${state._alert || state._alert === undefined ? `_alert=""` : ''} >
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
					class="date ${state._hideLabel ? `hide-label` : ''}"
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
							max=${state._max ? state._max : '9999-12-31'}
							spellcheck="false"
							type="date"
							${state._readOnly ? `readonly=""` : ''}
							${state._required ? `required=""` : ''}
							${ariaDescribedBy.length > 0 ? `aria-describedby="${ariaDescribedBy.join(' ')}"` : ''}
						>
	       </div>
	     </${KolInputWcTag}>
	   </mock:shadow-root>
	</kol-input-date>`;
};
