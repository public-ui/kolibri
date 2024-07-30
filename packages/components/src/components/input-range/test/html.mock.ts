import type { InputRangeStates, InputRangeProps } from '../../../schema';
import { mixMembers } from 'stencil-awesome-test';
import { nonce } from '../../../utils/dev.utils';
import { KolInputWcTag } from '../../../core/component-names';
import { showExpertSlot } from '../../../schema';
import { getRenderStates } from '../../input/controller';

export const getInpuRangeHtml = (props: InputRangeProps): string => {
	const state = mixMembers<InputRangeProps, InputRangeStates>(
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
	<kol-input-range
	 	class="kol-input-range"
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
					_label="${state._label != null ? `${state._label}` : ''}"
					_tooltipalign="top"
					class="range ${state._hideLabel ? 'hide-label' : ''} "

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
				 <div
							class="inputs-wrapper"
							${state._max != null ? `style="--kolibri-input-range--input-number--width: ${`${state._max}`.length + 0.5 + 'em'}"` : "style='--kolibri-input-range--input-number--width: 9.5em;'"}
						>
	        	<input
							${state._disabled ? `disabled=""` : ''}
							${state._hideLabel && typeof state._label === 'string' ? `aria-label="${state._label}"` : ''}
							autocapitalize="off"
							autocomplete="off"
							autocorrect="off"
							spellcheck="false"
							${state._max != null ? `max="${state._max}"` : ''}
							${state._min != null ? `min="${state._min}"` : ''}
							aria-hidden="true"
							${ariaDescribedBy.length > 0 ? `aria-describedby="${ariaDescribedBy.join(' ')}"` : ''}
							${state._accessKey != null ? `accessKey="${state._accessKey}"` : ''}
							tabindex="-1" type="range"
							>
							<input
							${state._disabled ? `disabled=""` : ''}
							${state._hideLabel && typeof state._label === 'string' ? `aria-label="${state._label}"` : ''}
							autocapitalize="off"
							autocomplete="off"
							autocorrect="off"
							${state._max != null ? `max="${state._max}"` : ''}
							${state._min != null ? `min="${state._min}"` : ''}
							${ariaDescribedBy.length > 0 ? `aria-describedby="${ariaDescribedBy.join(' ')}"` : ''}
							${state._accessKey != null ? `accessKey="${state._accessKey}"` : ''}
							type="number"
							id="${state._id}"
							>
	       </div>
				 </div>
	     </${KolInputWcTag}>
	   </mock:shadow-root>
	</kol-input-range>`;
};
