import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const resolveProtoPath = () => {
	const candidates = ['./proto/render.proto', '../proto/render.proto'];

	for (const candidate of candidates) {
		const url = new URL(candidate, import.meta.url);
		const path = fileURLToPath(url);

		if (existsSync(path)) {
			return path;
		}
	}

	const fallbackUrl = new URL('./proto/render.proto', import.meta.url);
	return fileURLToPath(fallbackUrl);
};

export const hydrateProtoPath = resolveProtoPath();
