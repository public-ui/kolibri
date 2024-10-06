export function useFieldIdBuilder({ namespace = 'field', separator = '-' }: { namespace?: string; separator?: string } = {}): {
	buildFieldId: (fieldName: string) => string;
	buildFieldIdSelector: (fieldName: string) => string;
} {
	const buildFieldId = (fieldName: string) => {
		return [namespace, fieldName].join(separator);
	};

	return {
		buildFieldId,
		buildFieldIdSelector: (fieldName: string) => `#${buildFieldId(fieldName)}`,
	};
}
