/* Courtesy of https://dev.to/sanderand/running-multiple-versions-of-a-stencil-design-system-without-conflicts-2f46 */
export const transformTagName = (
	tagNameToBeTransformed: string,
	knownUntransformedTagName: string,
	knownUntransformedTagNameElementReference: HTMLElement
): string => {
	const actualCurrentTag = knownUntransformedTagNameElementReference.tagName.toLowerCase();
	const [prefix, suffix] = actualCurrentTag.split(knownUntransformedTagName);
	return prefix + tagNameToBeTransformed + suffix;
};
