import { Props } from '../component';

export const getIndentedTextHtml = (
	props: Props,
	slots: {
		default?: string;
	} = {}
): string => {
	return `<kol-indented-text>
	<mock:shadow-root>
		<blockquote>
			${typeof slots.default === 'undefined' ? '<slot />' : slots.default}
		</blockquote>
	</mock:shadow-root>
	${typeof slots.default === 'undefined' ? (Object.getOwnPropertyNames(props).length === 0 ? '' : '<slot />') : slots.default}
</kol-indented-text>`;
};
