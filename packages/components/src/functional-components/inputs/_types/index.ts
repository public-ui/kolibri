export type DefaultInputProps<T> = Omit<T, 'title' | 'autoCapitalize' | 'autoCorrect' | 'spellcheck'> & {
	id: string;
	ariaDescribedBy?: string[];
	hideLabel?: boolean;
	label?: string;
};
