import { mixMembers } from 'stencil-awesome-test';

import { getIndentedTextHtml } from '../../indented-text/test/html.mock';

import type { FormProps } from '@public-ui/schema';
export const getFormHtml = (props: FormProps): string => {
	props = mixMembers({ ...props }, props);
	return `<kol-form>
	<mock:shadow-root>
		<form autocomplete="off" method="post" novalidate="">
			<p>
				${getIndentedTextHtml(
					{},
					{
						default:
							typeof props._requiredText === 'string'
								? props._requiredText
								: 'Formular-Felder, die mit einem Sternchen (*) gekennzeichnet sind, sind Pflichtangaben.',
					}
				)}
			</p>
			<slot />
		</form>
  </mock:shadow-root>
</kol-form>`;
};
