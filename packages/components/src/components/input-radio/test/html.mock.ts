import type { InputRadioProps, InputRadioStates } from '@public-ui/schema';
import { mixMembers } from 'stencil-awesome-test';
import { nonce } from '../../../utils/dev.utils';
import { KolInputTag } from '../../../core/component-names';
import { showExpertSlot } from '@public-ui/schema';
import { getRenderStates } from '../../input/controller';
import { InternalUnderlinedAccessKey } from '../../span/InternalUnderlinedAccessKey';

export const getInputRadioHtml = (props: InputRadioProps): string => {
	const state = mixMembers<InputRadioProps, InputRadioStates>(
		{
			_hideError: false,
			_id: `id-${nonce()}`,
			_label: '', // ⚠ required
			_options: [],
			_orientation: 'vertical',
		},
		props,
	);
	const hasExpertSlot = showExpertSlot(state._label);
	const { ariaDescribedBy, hasError } = getRenderStates(state);

	return `
	<kol-input-radio class="kol-input-radio"  ${state._touched ? `_touched=""` : ''} ${state._alert || state._alert === undefined ? `_alert=""` : ''} >
	  <mock:shadow-root>
			<fieldset class="${state._required ? 'required' : ''}  ${state._disabled ? 'disabled' : ''} ${hasError ? 'error' : ''}   ${state._hideError ? 'hidden-error' : ''} fieldset vertical">
				<legend class="block w-full mb-1 leading-normal">
					<span>
						<span slot="label">
							${
								hasExpertSlot
									? `<slot name="expert"></slot> `
									: typeof state._accessKey === 'string'
										? `
											<${InternalUnderlinedAccessKey} accessKey="${state._accessKey}" label="${state._label}" > </${InternalUnderlinedAccessKey}>
										</span>
										`
										: ` ${state._label}`
							}
						</span>
					</span>
				</legend>

				${state._options
					.map((option, index) => {
						const customId = `${state._id}-${index}`;
						const slotName = `radio-${index}`;
						const selected = state._value === option.value;
						return `<${KolInputTag}
							class=" radio ${Boolean(state._disabled || option.disabled) ? 'disabled' : ''} "
							${state._disabled || option.disabled ? "_disabled=''" : ''}
							${state._hideLabel ? "_hideLabel=''" : ''}
							${state._touched ? "_touched=''" : ''}
							${state._hint ? `_hint="${state._hint}"` : "_hint=''"}
							_id="${customId}"
							${(option.label as string) ? `_label="${option.label}"` : ''}
							_renderNoLabel=""
							${state._required ? "_required=''" : ''}
							_slotName="${slotName}"
							_tooltipAlign="${props._tooltipAlign ? props._tooltipAlign : 'top'}"
						>
							<div slot="${slotName}" class="radio-input-wrapper">
								<input
									title=""
									${ariaDescribedBy.length > 0 ? `aria-describedby="${ariaDescribedBy.join(' ')}"` : ''}
									${state._hideLabel && typeof option.label === 'string' ? `aria-label="${option.label}"` : ''}
									type="radio"
									id="${customId}"
									name="${state._name || state._id}"
									${state._disabled || option.disabled ? "disabled=''" : ''}
									${state._required ? "required=''" : ''}
									${state._tabIndex ? `tabIndex="${state._tabIndex}"` : ''}
									${selected ? `checked=""` : ''}

									value="-${index}"
								/>
								<label
									class="radio-label"
									htmlFor="${customId}"
									style="{
										 ${state._hideLabel ? 'height:0 ' : ''},
										${state._hideLabel ? 'margin:0' : ''},
										 ${state._hideLabel ? 'padding:0' : ''},
										${state._hideLabel ? 'visibility: hidden' : ''},
									}"
								>
									<span>
										<span class="radio-label-span-inner">${option.label}</span>
									</span>
								</label>
							</div>
						</${KolInputTag}>`;
					})
					.join(' ')}
				${hasError ? `<FormFieldMsg _alert={state._alert} _hideError={state._hideError} _msg={state._msg} _id={state._id} />` : ''}


	    </fieldset>
	  </mock:shadow-root>
	</kol-input-radio>`;
};
