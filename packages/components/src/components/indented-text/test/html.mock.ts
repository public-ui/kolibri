import type { IndentedTextProps } from '../../../schema';

export const getIndentedTextHtml = (
	props: IndentedTextProps,
	slots: {
		default?: string;
	} = {},
): string => {
	return `<kol-indented-text class="kol-indented-text-wc">
	<mock:shadow-root>
		<div>
			${typeof slots.default === 'undefined' ? '<slot />' : slots.default}
		</div>
	</mock:shadow-root>
	${typeof slots.default === 'undefined' ? (Object.getOwnPropertyNames(props).length === 0 ? '' : '<slot />') : slots.default}
</kol-indented-text>`;
};
