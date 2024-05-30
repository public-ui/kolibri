import { mixMembers } from 'stencil-awesome-test';
import { showExpertSlot } from '../../../schema';

import type { TextareaProps, TextareaStates } from '../../../schema';
import { getRenderStates } from '../../input/controller';
import { nonce } from '../../../utils/dev.utils';
import { KolInputWcTag } from '../../../core/component-names';

export const getTextareaHtml = (props: TextareaProps): string => {
	const state = mixMembers<TextareaProps, TextareaStates>(
		{
			_adjustHeight: false,
			_currentLength: 0,
			_hasValue: false,
			_hideError: false,
			_id: `id-${nonce()}`,
			_label: '', // ⚠ required
			_resize: 'vertical',
		},
		props,
	);

	const hasExpertSlot = showExpertSlot(props._label);
	const { ariaDescribedBy } = getRenderStates(state);
	return `
<kol-textarea  _alert="" ${props._touched ? '_touched=""' : ''} class="${props._value ? 'has-value kol-textarea' : 'kol-textarea'}">
  <mock:shadow-root>
		<${KolInputWcTag} _alert=""
				_currentlength="${props._value ? `${props._value.length}` : '0'}"
				${props._disabled ? ' _disabled=""' : ''}
				_hint="${props._hint ? props._hint : ''}"
				_id="id-nonce"
				_label="${props._label ? props._label : ''}"
				${props._touched ? '_touched=""' : ''}
				_tooltipalign="top"
				class="textarea"
				role="presentation"
		>
			<span slot="label">
					${
						hasExpertSlot || !props._label
							? `<slot name="expert"></slot>`
							: typeof props._accessKey === 'string'
								? `<>
											<InternalUnderlinedAccessKey accessKey=${props._accessKey} label=${props._label} />{' '}
											<span class="access-key-hint" aria-hidden="true">
											${props._accessKey}
											</span>
									</>`
								: `<span>${props._label}</span>`
					}
			</span>
			<div slot="input">
				<textarea
						autocapitalize="off"
						autocorrect="off"
						${props._disabled ? ' disabled=""' : ''}
						id="id-nonce"
						spellcheck="false"
						${props._value ? `value="${props._value}"` : ''}
						${props._placeholder ? `placeholder="${props._placeholder}"` : ''}
						style="resize: vertical;"
						${ariaDescribedBy.length > 0 ? `aria-describedby= "${ariaDescribedBy.join(' ')}"` : ''}
				>
				</textarea>
			</div>
		</${KolInputWcTag}>
  </mock:shadow-root>
</kol-textarea>`;
};
