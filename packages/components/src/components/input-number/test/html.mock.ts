import type { InputNumberProps, InputNumberStates } from '../../../schema';
import { mixMembers } from 'stencil-awesome-test';
import { nonce } from '../../../utils/dev.utils';
import { KolInputTag } from '../../../core/component-names';
import { showExpertSlot } from '../../../schema';
import { getRenderStates } from '../../input/controller';

export const getInputNumberHtml = (props: InputNumberProps): string => {
	const state = mixMembers<InputNumberProps, InputNumberStates>(
		{
			_autoComplete: 'off',
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
	<kol-input-number
		class="kol-input-number"
		${state._touched ? `_touched=""` : ''}
		${state._alert ? `_alert=""` : ''}
	>
	   <mock:shadow-root>
	     <${KolInputTag}
					${state._disabled ? `_disabled=""` : ''}
					${state._hideLabel ? `_hideLabel=""` : ''}
					${state._touched ? `_touched=""` : ''}
					${(state._alert === undefined && state._touched) || state._alert ? `_alert=""` : ''}
					_hint=""
					_id="${state._id}"
					_label="${state._label ? `${state._label}` : ''}"
					_tooltipalign="top"
					class="number ${state._hideLabel ? 'hide-label' : ''} "
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
							type="number"
							value=""
							max="${state._max ? state._max : ''}"
							min="${state._min ? state._min : ''}"
							${state._step ? `step="${state._step}"` : ''}
							${state._readOnly ? `readonly=""` : ''}
							${ariaDescribedBy.length > 0 ? `aria-describedby="${ariaDescribedBy.join(' ')}"` : ''}
							${state._required ? `required=""` : ''}
						>
	       </div>
	     </${KolInputTag}>
	   </mock:shadow-root>
	</kol-input-number>`;
};
