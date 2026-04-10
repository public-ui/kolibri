export async function fetchVariantData(theme: string, variant: string): Promise<string[]> {
	return fetch('/assets/variants/inject-variants_' + theme + '.json')
		.then((response) => {
			if (response.status === 404) {
				// No variants file for this theme is an expected state.
				return [];
			}
			if (!response.ok) {
				console.info('Error fetching variants: HTTP ' + response.status);
				return [];
			}
			return response.json();
		})
		.then((json) => {
			console.log(json);
			if (!json) {
				return [];
			}
			const data = (json as Record<string, unknown>)[variant];
			if (Array.isArray(data)) {
				const variants = data.filter((item): item is string => typeof item === 'string');
				return variants;
			} else {
				return [];
			}
		})
		.catch((error) => {
			console.info('No theme variant file found or file could not be parsed', error);
			return [];
		});
}
