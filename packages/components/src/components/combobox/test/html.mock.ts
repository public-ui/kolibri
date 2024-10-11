import { mixMembers } from 'stencil-awesome-test';
import { nonce } from '../../../utils/dev.utils';

import { showExpertSlot, type ComboboxProps, type ComboboxStates } from '../../../schema';
import { KolInputWcTag } from '../../../core/component-names';
import clsx from 'clsx';

interface ExtendedComboboxStates extends ComboboxStates {
	_isOpen?: boolean;
	blockSuggestionMouseOver?: boolean;
}

export const getComboboxHtml = (props: ComboboxProps): string => {
	const state = mixMembers<ComboboxProps, ExtendedComboboxStates>(
		{
			_hasValue: true,
			_hideError: false,
			_id: `id-${nonce()}`,
			_label: '', // ⚠ required
			_suggestions: [],
			_value: '',
			_isOpen: false,
			blockSuggestionMouseOver: false,
		},
		props,
	);
	const hasExpertSlot = showExpertSlot(state._label);

	return `
<kol-combobox
	${state._alert ? `_alert=""` : ''}
	${state._hideError ? '_hide-error=""' : ''}
	class="kol-combobox"
	${state._touched ? ' _touched=""' : ''}
>
	<mock:shadow-root>
	<div class=${clsx('combobox', state._disabled && 'combobox--disabled')}>
		<${KolInputWcTag}
			${state._hideError ? '_hideerror=""' : ''}
			_hint=""
			_id="id-nonce"
			_label="${typeof state._label === 'string' ? state._label : ''}"
			_tooltipalign="top"
			role="presentation"
			${state._required ? ' _required=""' : ''}
			${state._touched ? ' _touched=""' : ''}
			${(state._alert === undefined && state._touched) || state._alert ? `_alert=""` : ''}
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
      	<div class="combobox__group">
          <input aria-autocomplete="both" aria-controls="listbox" aria-expanded="false" aria-labelledby="id-nonce" autocapitalize="off" autocorrect="off" class="combobox__input" id="id-nonce" ${state._required ? ' required=""' : ''} role="combobox" spellcheck="false" type="text" value="">
            <button class="combobox__icon" tabindex="-1">
                <kol-icon _icons="codicon codicon-triangle-down" _label="kol-dropdown"></kol-icon>
            </button>

        </div>
				 ${
						state._isOpen && !(state._disabled === true)
							? `<ul role="listbox" class="combobox__listbox"> ${
									Array.isArray(state._suggestions) &&
									state._suggestions.length > 0 &&
									state._suggestions
										.map((option, index) => {
											return `<li id="option-${index}" role="option" aria-selected="${state._value === option}" class="combobox__item" > ${option} </li>`;
										})
										.join('')
								} </ul>`
							: ''
					}
      </div>
		</${KolInputWcTag}t>
		</div>
	</mock:shadow-root>
</kol-combobox>`;
};
