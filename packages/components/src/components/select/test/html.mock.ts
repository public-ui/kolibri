import { mixMembers } from 'stencil-awesome-test';
import { nonce } from '../../../utils/dev.utils';

import { type SelectProps, type SelectStates, showExpertSlot, type W3CInputValue, type Option } from '../../../schema';
import { KolInputTag } from '../../../core/component-names';

export const getSelectHtml = (props: SelectProps): string => {
	const state = mixMembers<SelectProps, SelectStates>(
		{
			_hasValue: true,
			_hideError: false,
			_id: `id-${nonce()}`,
			_label: '', // ⚠ required
			_multiple: false,
			_options: [],
			_value: [],
		},
		props,
	);

	const hasExpertSlot = showExpertSlot(state._label);
	const isSelected = (valueList: unknown[] | null, optionValue: unknown): boolean => {
		return Array.isArray(valueList) && valueList.includes(optionValue);
	};
	return `
<kol-select _alert="" ${state._hideError ? '_hide-error=""' : ''} class="${state._hasValue ? 'has-value kol-select' : 'kol-select'}" ${state._touched ? ' _touched=""' : ''}>
	<mock:shadow-root>
		<${KolInputTag}
					${state._hideError ? '_hideerror=""' : ''}
					_hint=""
					_id="id-nonce"
					_label="${typeof state._label === 'string' ? state._label : ''}"
					_tooltipalign="top"
					class="select"
					role="presentation"
					${state._required ? ' _required=""' : ''}
					${state._touched ? ' _touched=""' : ''}
		>
			<span slot="label">
				${
					hasExpertSlot
						? `<slot name="expert"></slot>`
						: typeof state._accessKey === 'string'
							? `<>
						<InternalUnderlinedAccessKey accessKey="${state._accessKey}" label="${state._label}" />{' '}
						<span class="access-key-hint" aria-hidden="true">
							${state._accessKey}
						</span>
					</>`
							: `<span>${state._label}</span>`
				}
			</span>
			<div slot="input">
			<form>
			<input type="submit" hidden="" />
				<select ${state._required ? ' required=""' : ''} ${state._multiple ? ' multiple=""' : ''} autocapitalize="off" autocorrect="off" id="id-nonce" spellcheck="false">
						${state._options
							.map((option, index) => {
								const key = `-${index}`;
								return `
								<option
									${option.disabled ? 'disabled=""' : ''}
									value="${key}"
									${isSelected(state._value, (option as unknown as Option<W3CInputValue>).value) || (state._multiple === false && index === 0) ? 'selected=""' : ''}
								>
									${option.label}
								</option>`;
							})
							.join('')}
					</select>
				<form>
			</div>
		</${KolInputTag}t>
	</mock:shadow-root>
</kol-select>`;
};
