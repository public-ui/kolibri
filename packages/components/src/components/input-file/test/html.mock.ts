import type { InputFileProps, InputFileStates } from '../../../schema';
import { mixMembers } from 'stencil-awesome-test';
import { nonce } from '../../../utils/dev.utils';
import { KolInputWcTag } from '../../../core/component-names';
import { showExpertSlot } from '../../../schema';
import { getRenderStates } from '../../input/controller';

export const getInputFileHtml = (props: InputFileProps): string => {
	const state = mixMembers<InputFileProps, InputFileStates>(
		{
			_hideError: false,
			_id: `id-${nonce()}`,
			_label: '', // ⚠ required
		},
		props,
	);
	const hasExpertSlot = showExpertSlot(state._label);
	const { ariaDescribedBy } = getRenderStates(state);
	return `
	<kol-input-file class="kol-input-file" ${state._touched ? `_touched=""` : ''} ${state._alert || state._alert === undefined ? `_alert=""` : ''} >
	   <mock:shadow-root>
	     <${KolInputWcTag}
					${state._disabled ? `_disabled=""` : ''}
					${state._hideLabel ? `_hideLabel=""` : ''}
					${state._required ? `_required=""` : ''}
					${state._touched ? `_touched=""` : ''}
					_hint=""
					_id="${state._id}"
					_label="${state._label !== null ? `${state._label}` : ''}"
					_tooltipalign="top"
					class="file ${state._hideLabel ? `hide-label` : ''}"
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
							autocorrect="off"
							id="${state._id}"
							spellcheck="false"
							type="file"
							${state._required ? `required=""` : ''}
							${ariaDescribedBy.length > 0 ? `aria-describedby="${ariaDescribedBy.join(' ')}"` : ''}
						>
	       </div>
	     </${KolInputWcTag}>
	   </mock:shadow-root>
	</kol-input-file>`;
};
