/**
 * Attributes every native form control of a field gets: no title tooltip, no autocapitalization or
 * autocorrection, the `aria-describedby` references and, with a hidden label, the label as
 * `aria-label`.
 */
export function getDefaultInputProps({ ariaDescribedBy, hideLabel, label }: { ariaDescribedBy?: string[]; hideLabel?: boolean; label?: string }): {
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

/** Props of a native form control FC: the native attributes plus the field's label and descriptions. */
export type DefaultInputProps<T> = Omit<
	{
		// `aria${string}` is declared in the Stencil HTML types and collides with these props.
		[K in keyof T as K extends `aria${string}` ? never : K]: T[K];
	},
	'title' | 'autoCapitalize' | 'autoCorrect' | 'spellcheck'
> & {
	/** Omitted by a secondary control the label does not reference, e.g. the range input of `kol-input-range`. */
	id?: string;
	ariaDescribedBy?: string[];
	hideLabel?: boolean;
	label?: string;
};
