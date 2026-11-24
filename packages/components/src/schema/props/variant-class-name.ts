export type VariantClassNamePropType = string | string[];

export type PropVariantClassName = {
	variant: VariantClassNamePropType;
};

export const classNameFromVariant = (variants: VariantClassNamePropType | undefined, componentName: string): string => {
	let className = '';

	if (Array.isArray(variants)) {
		variants.forEach((variant) => {
			className += 'kol-' + componentName + '--' + variant + ' ';
		});
	}
	return className;
};
