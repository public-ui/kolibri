import { mixMembers } from 'stencil-awesome-test';
import { Props } from '../component';

export const getExampleHtml = (props: Props, additionalAttrs = ''): string => {
	props = mixMembers(
		{
			_label: '',
		},
		props
	);
	return `
<my-example${additionalAttrs}>
  <mock:shadow-root>
    <span>${props._label}</span>
  </mock:shadow-root>
</my-example>`;
};
