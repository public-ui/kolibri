import { KolIndentedTextWcTag } from '../../../core/component-names';
import type { IndentedTextProps } from '../../../schema';

export const getIndentedTextHtml = (
	props: IndentedTextProps,
	slots: {
		default?: string;
	} = {},
): string => {
	return `<kol-indented-text class="kol-indented-text">
	<mock:shadow-root>
	 <${KolIndentedTextWcTag} class="kol-indented-text-wc">
			<div>
				${typeof slots.default === 'undefined' ? '<slot />' : slots.default}
			</div>
		 </${KolIndentedTextWcTag}>
	</mock:shadow-root>
	${typeof slots.default === 'undefined' ? (Object.getOwnPropertyNames(props).length === 0 ? '' : '<slot />') : slots.default}
</kol-indented-text>`;
};
