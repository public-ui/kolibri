// Vercel Serverless Function für /api/mcp/*
export default async function handler(request, response) {
	// CORS Headers setzen
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	// OPTIONS Request für CORS Preflight
	if (request.method === 'OPTIONS') {
		response.status(204).end();
		return;
	}

	try {
		// Versuche eingebettete Sample-Daten zu laden (optimiert für Vercel)
		let samplesData;
		let useEmbeddedData = false;

		try {
			const samplesModule = await import('./samples.mjs');
			samplesData = samplesModule.samplesData;
			useEmbeddedData = true;
			console.log('[api/mcp] ✅ Using embedded samples:', samplesData.entries.length);
		} catch (samplesError) {
			console.log('[api/mcp] ⚠️ Could not load embedded samples:', samplesError.message);
			console.log('[api/mcp] Falling back to build artifacts...');
		}

		// URL für API Handler vorbereiten
		const baseUrl = `https://${request.headers.host}`;
		const fullUrl = new URL(request.url, baseUrl);

		if (useEmbeddedData) {
			// Verwende eingebettete Sample-Daten (schneller und zuverlässiger)
			const { handleApiRequest } = await import('../dist/index.mjs');

			// Erstelle Mock-Index mit eingebetteten Daten
			const mockIndex = {
				entries: samplesData.entries,
				map: new Map(samplesData.entries.map((entry) => [entry.id, entry])),
				generatedAt: new Date(samplesData.generatedAt),
				buildMode: samplesData.buildMode,
				list: function (query) {
					if (!query) return this.entries;
					const normalized = query.trim().toLowerCase();
					return this.entries.filter(
						(entry) =>
							entry.id.toLowerCase().includes(normalized) || entry.group.toLowerCase().includes(normalized) || entry.name.toLowerCase().includes(normalized),
					);
				},
				get: function (id) {
					return this.map.get(id);
				},
			};

			// Index-Funktionen mit eingebetteten Daten
			const getIndex = async () => mockIndex;
			const refresh = async () => mockIndex;

			// API Handler aufrufen
			const result = await handleApiRequest({
				method: request.method || 'GET',
				url: fullUrl.toString(),
				getIndex,
				refresh,
			});

			// Response senden
			response.status(result.statusCode);
			Object.entries(result.headers).forEach(([key, value]) => {
				response.setHeader(key, value);
			});
			response.json(result.body || {});
		} else {
			// Fallback: Verwende Build-Artefakte (kann auf Vercel problematisch sein)
			const { handleApiRequest } = await import('../dist/index.mjs');
			const { buildSampleIndex } = await import('../dist/index.mjs');

			// Index-Funktionen definieren (mit Runtime Discovery)
			let cachedIndex = null;
			const getIndex = async () => {
				if (!cachedIndex) {
					cachedIndex = await buildSampleIndex();
				}
				return cachedIndex;
			};

			const refresh = async () => {
				cachedIndex = await buildSampleIndex();
				return cachedIndex;
			};

			// API Handler aufrufen
			const result = await handleApiRequest({
				method: request.method || 'GET',
				url: fullUrl.toString(),
				getIndex,
				refresh,
			});

			// Response senden
			response.status(result.statusCode);
			Object.entries(result.headers).forEach(([key, value]) => {
				response.setHeader(key, value);
			});
			response.json(result.body || {});
		}
	} catch (error) {
		console.error('[api/mcp] Handler error:', error);

		// Fallback Error Response
		response.status(500);
		response.setHeader('Content-Type', 'application/json');
		response.json({
			error: 'Internal server error',
			message: error.message,
			timestamp: new Date().toISOString(),
		});
	}
}
