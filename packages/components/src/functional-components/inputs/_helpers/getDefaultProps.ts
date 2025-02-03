export function getDefaultProps({ ariaDescribedBy, hideLabel, label }: { ariaDescribedBy?: string[]; hideLabel?: boolean; label?: string }): {
	title: string;
	autoCapitalize: string;
	autoCorrect: string;
	'aria-describedby'?: string;
	'aria-label'?: string;
} {
	return {
		title: '',
		autoCapitalize: 'off',
		autoCorrect: 'off',
		'aria-describedby': ariaDescribedBy?.length ? ariaDescribedBy.join(' ') : undefined,
		'aria-label': hideLabel && label ? label : undefined,
	};
}
