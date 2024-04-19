import type { InputProps } from '@public-ui/schema';
import { showExpertSlot } from '@public-ui/schema';
import { KolIconTag, KolTooltipWcTag, KolButtonWcTag } from '../../../core/component-names';
import { translate } from '../../../i18n';
import type { W3CInputValue, KoliBriCustomIcon } from '@public-ui/schema';
export const getInputHtml = (props: InputProps): string => {
	const isMessageValidError = Boolean(props._msg?._type === 'error' && props._msg._description && props._msg._description?.length > 0);
	const hasError = !props._readOnly && isMessageValidError && props._touched === true;
	const showFormFieldMsg = Boolean(hasError || (props._msg?._type !== 'error' && props._msg?._description));
	const hasExpertSlot = showExpertSlot(props._label);
	const hasHint = typeof props._hint === 'string' && props._hint.length > 0;
	const useTooltopInsteadOfLabel = !hasExpertSlot && props._hideLabel;
	return `
	<kol-input class="kol-input ${props._readOnly ? 'read-only' : ''} ${props._disabled ? 'disabled' : ''}" >
		<label class="input-label" ${props._id ? `htmlfor="${props._id}"` : ''} id="${!useTooltopInsteadOfLabel ? `${props._id}-label` : ''}" ${useTooltopInsteadOfLabel ? `hidden=""` : ''}>
			<span class="input-label-span"></span>
		</label>

		${
			hasHint
				? `
				<span class="hint" id="${props._id}-hint">
				${props._hint}
					</span>`
				: ''
		}
		<div class="input">
		${props._icons?.left ? `<${KolIconTag} _label="" _icons=${(props._icons?.left as KoliBriCustomIcon).icon} ></${KolIconTag}>` : ''}
		<div class="input-slot" id="input"></div>
		${
			typeof props._smartButton === 'object' && props._smartButton !== null
				? `<${KolButtonWcTag}
				${props._smartButton._customClass ? `_customClass="${props._smartButton._customClass}"` : ''}
				${props._smartButton._disabled ? `_disabled=""` : ''}
				${props._smartButton._hideLabel ? `_hideLabel=""` : ''}
				${props._smartButton._id ? `_id="${props._smartButton._id}"` : ''}
				${props._smartButton._label ? `_label="${props._smartButton._label}"` : ''}
				${props._smartButton._tooltipAlign ? `_tooltipAlign="${props._smartButton._tooltipAlign}"` : ''}
				${props._smartButton._variant ? `_variant="${props._smartButton._variant}"` : ''}
			></${KolButtonWcTag}>`
				: ''
		}
		</div>
		${
			useTooltopInsteadOfLabel
				? `<${KolTooltipWcTag}
				aria-hidden="true"
				class="input-tooltip"
				_align="top"
				_id="${props._hideLabel ? `${props._id}-label` : ''}"
				${props._label ? `_label="${props._label}"` : ''}
			></${KolTooltipWcTag}>`
				: ''
		}
		${showFormFieldMsg ? `<FormFieldMsg _alert={props._alert} _hideError={props._hideError} _msg={props._msg} _id={props._id} />` : ''}
				${
					Array.isArray(props._suggestions) && props._suggestions.length > 0
						? `<datalist id="${props._id}-list">
						${props._suggestions.map((option: W3CInputValue) => `<option value=${option} />`)}
					</datalist>`
						: ''
				}
				${
					props._hasCounter
						? `<span class="counter" aria-atomic="true" aria-live="polite">
						${props._currentLength}
						${
							props._maxLength
								? `<>
								<span aria-label="${translate('kol-of')}" role="img">

								</span>
								{props._maxLength}
							</>`
								: ''
						}{' '}
						<span>${translate('kol-characters')}</span>
					</span>`
						: ''
				}
	</kol-input>`;
};
