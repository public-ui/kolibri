export type DefaultInputProps<T> = Omit<
	{
		[K in keyof T as K extends `aria${string}` ? never : K]: T[K]; // `aria${string}` is defined in the Stencil HTML types and colliding with our props, hence we remove it.
	},
	'title' | 'autoCapitalize' | 'autoCorrect' | 'spellcheck'
> & {
	id: string;
	ariaDescribedBy?: string[];
	hideLabel?: boolean;
	label?: string;
};
