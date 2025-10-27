import { createRequire } from 'node:module';

import { loadPackageDefinition, Server, ServerCredentials, status, type handleUnaryCall } from '@grpc/grpc-js';
import { load } from '@grpc/proto-loader';
import type { FastifyInstance } from 'fastify';
import Fastify from 'fastify';

import { hydrateProtoPath } from './proto-path.js';
import { cleanupGlobalRenderer, hydrateFragmentForServer, isPlainObject } from './renderer.js';
import type { HydrateRenderer, HydrateRendererOptions, HydrateServer, HydrateServerOptions } from './types.js';

interface GrpcRenderRequest {
	html?: string;
	optionsJson?: string;
}

interface GrpcRenderResponse {
	html: string;
	components: string[];
	hydratedCount: number;
	diagnosticsJson: string;
}

interface HydrateProtoModule {
	publicui: {
		hydrate: {
			HydrateRenderer: {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				service: any;
			};
		};
	};
}

const DEFAULT_HOST = '0.0.0.0';
const DEFAULT_ROUTE = '/render';
const DEFAULT_REST_PORT = 3000;
const DEFAULT_GRPC_PORT = 50051;

const loadGrpcDefinition = async () => {
	const definition = await load(hydrateProtoPath, {
		keepCase: false,
		longs: String,
		enums: String,
		defaults: true,
		oneofs: true,
	});

	const grpcModule = loadPackageDefinition(definition) as unknown as HydrateProtoModule;

	const service = grpcModule?.publicui?.hydrate?.HydrateRenderer?.service;

	if (!service) {
		throw new Error('Unable to load hydrate renderer service definition');
	}

	return service;
};

const normalizeOptionsInput = (input: unknown) => {
	if (typeof input === 'string') {
		try {
			return JSON.parse(input);
		} catch (error) {
			throw new TypeError('options must be a plain object or a JSON string');
		}
	}

	return input;
};

const require = createRequire(import.meta.url);

const isHydrateRenderer = (value: unknown): value is HydrateRenderer => typeof value === 'function';

const isResolutionError = (error: unknown, codes: string[]): error is NodeJS.ErrnoException => {
	if (!error || !(error instanceof Error)) {
		return false;
	}

	const candidateCode = (error as Partial<NodeJS.ErrnoException>).code;

	return typeof candidateCode === 'string' && codes.includes(candidateCode);
};

const extractRenderer = (module: unknown): HydrateRenderer | null => {
	if (!module) {
		return null;
	}

	const asRecord = module as Record<string, unknown>;
	const directExport = asRecord.renderToString;
	if (isHydrateRenderer(directExport)) {
		return directExport;
	}

	const defaultExport = asRecord.default;

	if (isHydrateRenderer(defaultExport)) {
		return defaultExport;
	}

	if (defaultExport && typeof defaultExport === 'object') {
		const nestedExport = (defaultExport as Record<string, unknown>).renderToString;

		if (isHydrateRenderer(nestedExport)) {
			return nestedExport;
		}
	}

	return null;
};

const loadHydrateRenderer = async (): Promise<HydrateRenderer> => {
	try {
		const hydrate = await import('@public-ui/hydrate');
		const renderer = extractRenderer(hydrate);

		if (renderer) {
			return renderer;
		}
	} catch (error) {
		if (!isResolutionError(error, ['ERR_MODULE_NOT_FOUND', 'ERR_PACKAGE_PATH_NOT_EXPORTED'])) {
			throw error;
		}
	}

	try {
		const hydrate = require('@public-ui/hydrate');
		const renderer = extractRenderer(hydrate);

		if (renderer) {
			return renderer;
		}
	} catch (error) {
		if (!isResolutionError(error, ['MODULE_NOT_FOUND', 'ERR_PACKAGE_PATH_NOT_EXPORTED'])) {
			throw error;
		}
	}

	throw new Error('Unable to resolve renderToString from @public-ui/hydrate. Ensure the package is installed and built before starting the hydrate server.');
};

const resolveRenderer = async (renderer?: HydrateRenderer): Promise<HydrateRenderer> => {
	if (renderer) {
		return renderer;
	}

	return loadHydrateRenderer();
};

const createRestHandler =
	(renderer: HydrateRenderer, baseOptions?: HydrateRendererOptions) =>
	async (request: { body: unknown; log: FastifyInstance['log'] }, reply: { code: (statusCode: number) => void }) => {
		let html: string | undefined;
		let options: unknown;

		const { body } = request;

		if (typeof body === 'string') {
			html = body;
		} else if (isPlainObject(body)) {
			if (typeof body.html === 'string') {
				html = body.html;
			}

			options = body.options;
		}

		if (typeof html !== 'string' || html.trim().length === 0) {
			reply.code(400);
			return {
				error: 'Body must contain an "html" string',
			};
		}

		try {
			const normalizedOptions = normalizeOptionsInput(options);
			return await hydrateFragmentForServer(renderer, html, normalizedOptions, baseOptions);
		} catch (error) {
			request.log.error({ err: error }, 'Hydration failed');
			reply.code(500);

			return {
				error: 'Hydration failed',
				message: error instanceof Error ? error.message : 'Unknown error',
			};
		}
	};

const createGrpcHandler = (renderer: HydrateRenderer, baseOptions?: HydrateRendererOptions): handleUnaryCall<GrpcRenderRequest, GrpcRenderResponse> => {
	return async (call, callback) => {
		const { html, optionsJson } = call.request;

		if (typeof html !== 'string' || html.trim().length === 0) {
			callback({
				code: status.INVALID_ARGUMENT,
				message: 'html must be a non-empty string',
			});
			return;
		}

		let parsedOptions: unknown;

		try {
			parsedOptions = optionsJson ? JSON.parse(optionsJson) : undefined;
		} catch (error) {
			callback({
				code: status.INVALID_ARGUMENT,
				message: 'options_json must be valid JSON',
			});
			return;
		}

		try {
			const result = await hydrateFragmentForServer(renderer, html, parsedOptions, baseOptions);

			const response: GrpcRenderResponse = {
				html: result.html,
				components: result.components,
				hydratedCount: result.hydratedCount,
				diagnosticsJson: JSON.stringify(result.diagnostics),
			};

			callback(null, response);
		} catch (error) {
			callback({
				code: status.INTERNAL,
				message: error instanceof Error ? error.message : 'Hydration failed',
			});
		}
	};
};

export const createHydrateServer = async (options: HydrateServerOptions = {}): Promise<HydrateServer> => {
	const renderer = await resolveRenderer(options.renderer);
	const defaultRendererOptions = isPlainObject(options.defaultRendererOptions) ? (options.defaultRendererOptions as HydrateRendererOptions) : undefined;
	const restHost = options.restHost ?? options.host ?? DEFAULT_HOST;
	const grpcHost = options.grpcHost ?? options.host ?? DEFAULT_HOST;
	const restRoute = options.restRoute ?? DEFAULT_ROUTE;
	const restPort = options.restPort ?? DEFAULT_REST_PORT;
	const grpcPort = options.grpcPort ?? DEFAULT_GRPC_PORT;

	const rest = Fastify({
		logger: options.logger === undefined ? { level: 'info' } : options.logger,
	});

	rest.addContentTypeParser('text/plain', { parseAs: 'string' }, (_request, body, done) => done(null, body));
	rest.addContentTypeParser('text/html', { parseAs: 'string' }, (_request, body, done) => done(null, body));

	let started = false;
	let restUrl: string | null = null;
	let grpcEndpoint: string | null = null;
	let boundRestPort = restPort;
	let boundGrpcPort = grpcPort;

	rest.post(restRoute, createRestHandler(renderer, defaultRendererOptions));
	rest.get('/health', () => ({
		status: started ? 'ready' : 'initializing',
		rest: {
			route: restRoute,
			host: restHost,
			port: boundRestPort,
			url: restUrl ? `${restUrl}${restRoute}` : null,
		},
		grpc: {
			host: grpcHost,
			port: boundGrpcPort,
			endpoint: grpcEndpoint,
			started,
		},
	}));

	const grpcServer = new Server();
	const grpcServiceDefinition = await loadGrpcDefinition();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	grpcServer.addService(grpcServiceDefinition as any, { renderHtml: createGrpcHandler(renderer, defaultRendererOptions) });

	const start = async () => {
		if (started) {
			return;
		}

		const address = await rest.listen({ host: restHost, port: restPort });
		const url = new URL(address);

		restUrl = url.origin;
		boundRestPort = Number.parseInt(url.port, 10) || restPort;

		await new Promise<void>((resolve, reject) => {
			grpcServer.bindAsync(`${grpcHost}:${grpcPort}`, ServerCredentials.createInsecure(), (error, boundPort) => {
				if (error) {
					reject(error);
					return;
				}

				boundGrpcPort = boundPort;
				grpcEndpoint = `${grpcHost}:${boundPort}`;
				grpcServer.start();
				resolve();
			});
		});

		started = true;
	};

	const stop = async () => {
		if (!started) {
			return;
		}

		// Clean up global renderer resources
		await cleanupGlobalRenderer();

		await rest.close();

		await new Promise<void>((resolve) => {
			grpcServer.tryShutdown((error) => {
				if (error) {
					grpcServer.forceShutdown();
				}

				resolve();
			});
		});

		started = false;
	};

	const getRestUrl = () => (restUrl ? `${restUrl}${restRoute}` : null);
	const getGrpcEndpoint = () => grpcEndpoint;

	return {
		rest,
		grpc: grpcServer,
		start,
		stop,
		isStarted: () => started,
		getRestUrl,
		getGrpcEndpoint,
	};
};

export { hydrateProtoPath } from './proto-path.js';
