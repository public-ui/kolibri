export const ButtonVariants = {
	Primary: 'primary',
	Secondary: 'secondary',
	Danger: 'danger',
	Ghost: 'ghost',
	Normal: 'normal',
} as const;
export type ButtonVariant = (typeof ButtonVariants)[keyof typeof ButtonVariants];
