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
		},
		props
	);
	return `
		<kol-heading-wc _level="${props._level as unknown as string}"${additionalAttrs}>
			<h${props._level || 1}>
				${slots.default !== undefined ? slots.default : '<slot></slot>'}
			</h${props._level || 1}>
		</kol-heading-wc>`;
};

export const getHeadingHtml = (
	props: Props,
	slots: {
		default?: string;
	} = {},
	additionalAttrs = ''
): string => {
	props = mixMembers(
		{
			_label: 'Untitled',
		},
		props
	);
	return `
	<kol-heading _level="${props._level as unknown as string}"${additionalAttrs}>
		<mock:shadow-root>
			${getHeadingWcHtml(props)}
		</mock:shadow-root>
		${slots.default !== undefined ? slots.default : ''}
	</kol-heading>`;
};
