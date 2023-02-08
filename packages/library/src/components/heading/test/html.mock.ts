import { mixMembers } from 'stencil-awesome-test';
import { Props } from '../component';

export const getHeadingWcHtml = (
	props: Props,
	slots: {
		default?: string;
	} = {},
	additionalAttrs = ''
): string => {
	props = mixMembers(
		{
			_label: 'Untitled',
			_level: 1,
		},
		props
	);
	return `
		<kol-heading-wc${additionalAttrs}>
			<h${props._level || 1} class="headline">
				${props._label}
				${typeof slots.default === 'string' ? slots.default : `<slot />`}
			</h${props._level || 1}>
		</kol-heading-wc>`;
};

export const getHeadingHtml = (
	props: Props,
	slots: {
		default?: string;
	} = {}
): string => {
	props = mixMembers(
		{
			_label: 'Untitled',
			_level: 1,
		},
		props
	);
	return `
<kol-heading>
	<mock:shadow-root>
		${getHeadingWcHtml(props)}
	</mock:shadow-root>
	${slots.default !== undefined ? slots.default : ''}
</kol-heading>`;
};
