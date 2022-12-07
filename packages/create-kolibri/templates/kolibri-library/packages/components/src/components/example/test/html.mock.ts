import { mixMembers } from 'stencil-awesome-test';
import { Props } from '../schema';

export const getExampleWcHtml = (props: Props, additionalAttrs = ''): string => {
	props = mixMembers(
		{
			_label: '',
		},
		props
	);
	return `
<my-example-wc${additionalAttrs}>
  <span>${props._label}</span>
</my-example-wc>`;
};

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
		${getExampleWcHtml(props)}
  </mock:shadow-root>
</my-example>`;
};
