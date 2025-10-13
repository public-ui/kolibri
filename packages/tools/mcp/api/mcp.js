const AI_HINTS_KEY = 'ai-hints';
const AI_HINTS_MESSAGES = Object.freeze([
	'Always register KoliBri Web Components in the browser runtime before rendering them.',
	'Choose the integration guide that matches your project setup to load and bundle the components correctly.',
	'Bundle the KoliBri icon font assets (for example codicon.css and codicon.ttf) so kol-icon glyphs can render.',
	'Wrap input elements with <kol-form> and feed its _errorList to surface validation issues via the generated error summary.',
]);

const normalizeHints = (value) => {
	if (Array.isArray(value)) {
		return value.length > 0 ? value : AI_HINTS_MESSAGES;
	}

	if (typeof value === 'string') {
		const trimmed = value.trim();
		return trimmed ? [trimmed] : AI_HINTS_MESSAGES;
	}

	return AI_HINTS_MESSAGES;
};

const withAiHints = (body = {}) => ({ ...body, [AI_HINTS_KEY]: normalizeHints(body[AI_HINTS_KEY]) });

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
		// Importiere die benötigten Funktionen aus dem gebauten Modul
		const { handleApiRequest, SampleIndex } = await import('../dist/index.mjs');

		// Lade die eingebetteten Sample-Daten
		const { samplesData } = await import('./samples.mjs');
		console.log('[api/mcp] ✅ Using embedded samples:', samplesData.entries.length);

		// Erstelle einen SampleIndex aus den eingebetteten Daten
		const index = new SampleIndex(samplesData.entries, new Date(samplesData.generatedAt), samplesData.buildMode);

		// URL für API Handler vorbereiten
		const baseUrl = `https://${request.headers.host}`;
		const fullUrl = new URL(request.url, baseUrl);

		// Verwende den API Handler
		const getIndex = async () => index;
		const result = await handleApiRequest({
			method: request.method || 'GET',
			url: fullUrl.toString(),
			getIndex,
		});

		// Response senden
		response.status(result.statusCode);
		Object.entries(result.headers).forEach(([key, value]) => {
			response.setHeader(key, value);
		});

		const responseBody = result.body ?? {};
		if (fullUrl.pathname === '/' || fullUrl.pathname === '/api/mcp' || fullUrl.pathname === '/mcp') {
			response.json(responseBody[AI_HINTS_KEY] ? responseBody : withAiHints(responseBody));
		} else {
			response.json(responseBody);
		}
	} catch (error) {
		console.error('[api/mcp] Handler error:', error);
		console.error('[api/mcp] Error stack:', error.stack);
		console.error('[api/mcp] Request URL:', request.url);
		console.error('[api/mcp] Request method:', request.method);

		// Fallback Error Response
		response.status(500);
		response.setHeader('Content-Type', 'application/json');
		response.json(
			withAiHints({
				error: 'Internal server error',
				message: error.message,
				stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
				timestamp: new Date().toISOString(),
			}),
		);
	}
}
