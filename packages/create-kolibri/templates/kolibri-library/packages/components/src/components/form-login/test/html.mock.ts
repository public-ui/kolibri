import { mixMembers } from 'stencil-awesome-test';
import { Props } from '../schema';

export const getFormLoginWcHtml = (props: Props, additionalAttrs = ''): string => {
	props = mixMembers(
		{
			_heading: '',
		},
		props
	);
	return `
<my-form-login-wc${additionalAttrs}>
  <span>${props._heading}</span>
</my-form-login-wc>`;
};

export const getFormLoginHtml = (props: Props, additionalAttrs = ''): string => {
	props = mixMembers(
		{
			_heading: '',
		},
		props
	);
	return `
<my-form-login${additionalAttrs}>
  <mock:shadow-root>
		${getFormLoginWcHtml(props)}
  </mock:shadow-root>
</my-form-login>`;
};
