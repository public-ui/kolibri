import type { InputCheckboxProps, InputCheckboxStates } from '@public-ui/schema';
import { mixMembers } from 'stencil-awesome-test';
import { nonce } from '../../../utils/dev.utils';
import { KolIconTag, KolInputTag } from '../../../core/component-names';
import { showExpertSlot } from '@public-ui/schema';
import { getRenderStates } from '../../input/controller';

export const getInputCheckboxHtml = (props: InputCheckboxProps): string => {
	const state = mixMembers<InputCheckboxProps, InputCheckboxStates>(
		{
			_checked: false,
			_hideError: false,
			_icons: {
				checked: 'codicon codicon-check',
				indeterminate: 'codicon codicon-remove',
				unchecked: 'codicon codicon-close',
			},
			_id: `id-${nonce()}`,
			_indeterminate: false,
			_label: '', // ⚠ required
			_value: true,
			_variant: 'default',
		},
		props,
	);
	const hasExpertSlot = showExpertSlot(state._label);
	const { ariaDescribedBy } = getRenderStates(state);

	return `
	<kol-input-checkbox class="kol-input-checkbox" ${state._touched ? `_touched=""` : ''} ${state._alert || state._alert === undefined ? `_alert=""` : ''} >
	   <mock:shadow-root>
	     <${KolInputTag}
					${state._disabled ? `_disabled=""` : ''}
					${state._hideLabel ? `_hideLabel=""` : ''}
					${state._touched ? `_touched=""` : ''}
					${state._required ? `_required=""` : ''}
					_hint=""
					_id="${state._id}"
					_label="${state._label ? `${state._label}` : ''}"
					_tooltipalign="top"
					class="checkbox ${state._hideLabel ? 'hide-label' : ''} default"
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
				<label slot="input" class="checkbox-container">
				<${KolIconTag}
					class="icon"
					_icons="${state._indeterminate ? state._icons.indeterminate : state._checked ? state._icons.checked : state._icons.unchecked}"
					_label=""
				> </${KolIconTag}>
				<input
					class="checkbox-input-element${state._variant === 'button' ? ' visually-hidden' : ''}"
					title=""
					${ariaDescribedBy.length > 0 ? `aria-describedby="${ariaDescribedBy.join(' ')}"` : ''}

					${state._hideLabel && typeof state._label === 'string' ? `aria-label="${state._label}"` : ''}
					id="${state._id}"
					type="checkbox"
					${state._disabled ? `disabled=""` : ''}
					${state._required ? `required=""` : ''}
					${state._name ? `name=""` : ''}
					${state._checked ? `checked=""` : ''}
					${state._indeterminate ? `indeterminate=""` : ''}
					${state._tabIndex ? `tabIndex=""` : ''}

				/>
			</label>
	     </${KolInputTag}>
	   </mock:shadow-root>
	</kol-input-checkbox>`;
};
