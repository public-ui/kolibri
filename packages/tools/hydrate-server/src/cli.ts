#!/usr/bin/env node
import process from 'node:process';

import { createHydrateServer } from './server.js';
import type { HydrateServerOptions } from './types.js';

const DEFAULT_REST_PORT = 3000;
const DEFAULT_GRPC_PORT = 50051;
const DEFAULT_ROUTE = '/render';
const DEFAULT_HOST = '0.0.0.0';

type ParsedArgs = {
	restPort?: number;
	restHost?: string;
	grpcPort?: number;
	grpcHost?: string;
	route?: string;
	logLevel?: string;
	quiet?: boolean;
	help?: boolean;
};

const parsePort = (value: string, flag: string): number => {
	const port = Number.parseInt(value, 10);

	if (!Number.isInteger(port) || port < 0 || port > 65535) {
		throw new Error(`Invalid value for ${flag}: ${value}`);
	}

	return port;
};

const parseArgs = (argv: string[]): ParsedArgs => {
	const parsed: ParsedArgs = {};

	for (let index = 0; index < argv.length; index += 1) {
		const arg = argv[index];

		switch (arg) {
			case '--help':
			case '-h': {
				parsed.help = true;
				break;
			}
			case '--rest-port': {
				const value = argv[++index];
				if (!value) {
					throw new Error('--rest-port requires a value');
				}

				parsed.restPort = parsePort(value, '--rest-port');
				break;
			}
			case '--grpc-port': {
				const value = argv[++index];
				if (!value) {
					throw new Error('--grpc-port requires a value');
				}

				parsed.grpcPort = parsePort(value, '--grpc-port');
				break;
			}
			case '--rest-host': {
				const value = argv[++index];
				if (!value) {
					throw new Error('--rest-host requires a value');
				}

				parsed.restHost = value;
				break;
			}
			case '--grpc-host': {
				const value = argv[++index];
				if (!value) {
					throw new Error('--grpc-host requires a value');
				}

				parsed.grpcHost = value;
				break;
			}
			case '--host': {
				const value = argv[++index];
				if (!value) {
					throw new Error('--host requires a value');
				}

				parsed.restHost = parsed.restHost ?? value;
				parsed.grpcHost = parsed.grpcHost ?? value;
				break;
			}
			case '--route': {
				const value = argv[++index];
				if (!value) {
					throw new Error('--route requires a value');
				}

				parsed.route = value.startsWith('/') ? value : `/${value}`;
				break;
			}
			case '--log-level': {
				const value = argv[++index];
				if (!value) {
					throw new Error('--log-level requires a value');
				}

				parsed.logLevel = value;
				break;
			}
			case '--quiet': {
				parsed.quiet = true;
				break;
			}
			default: {
				if (arg.startsWith('-')) {
					throw new Error(`Unknown option: ${arg}`);
				}
				break;
			}
		}
	}

	return parsed;
};

const readEnvPort = (key: string): number | undefined => {
	const value = process.env[key];
	return value ? parsePort(value, key) : undefined;
};

const printHelp = () => {
	const helpMessage = `Usage: kolibri-hydrate-server [options]

Options:
  -h, --help             Show this help text
      --host <host>      Hostname for both REST and gRPC servers
      --rest-host <host> Hostname for the REST server (default: ${DEFAULT_HOST})
      --rest-port <port> Port for the REST server (default: ${DEFAULT_REST_PORT})
      --grpc-host <host> Hostname for the gRPC server (default: ${DEFAULT_HOST})
      --grpc-port <port> Port for the gRPC server (default: ${DEFAULT_GRPC_PORT})
      --route <path>      REST endpoint path (default: ${DEFAULT_ROUTE})
      --log-level <lvl>  Set Fastify logger level
      --quiet            Disable the Fastify logger`;

	console.log(helpMessage);
};

const main = async () => {
	let parsedArgs: ParsedArgs;

	try {
		parsedArgs = parseArgs(process.argv.slice(2));
	} catch (error) {
		console.error(error instanceof Error ? error.message : String(error));
		process.exitCode = 1;
		return;
	}

	if (parsedArgs.help) {
		printHelp();
		return;
	}

	const envRestPort = readEnvPort('KOLIBRI_HYDRATE_REST_PORT');
	const envGrpcPort = readEnvPort('KOLIBRI_HYDRATE_GRPC_PORT');
	const envRestHost = process.env.KOLIBRI_HYDRATE_REST_HOST;
	const envGrpcHost = process.env.KOLIBRI_HYDRATE_GRPC_HOST;
	const envRoute = process.env.KOLIBRI_HYDRATE_ROUTE;

	const options: HydrateServerOptions = {
		restHost: parsedArgs.restHost ?? envRestHost ?? DEFAULT_HOST,
		restPort: parsedArgs.restPort ?? envRestPort ?? DEFAULT_REST_PORT,
		restRoute: parsedArgs.route ?? envRoute ?? DEFAULT_ROUTE,
		grpcHost: parsedArgs.grpcHost ?? envGrpcHost ?? DEFAULT_HOST,
		grpcPort: parsedArgs.grpcPort ?? envGrpcPort ?? DEFAULT_GRPC_PORT,
	};

	if (parsedArgs.quiet ?? process.env.KOLIBRI_HYDRATE_QUIET === 'true') {
		options.logger = false;
	} else if (parsedArgs.logLevel ?? process.env.KOLIBRI_HYDRATE_LOG_LEVEL) {
		options.logger = { level: parsedArgs.logLevel ?? process.env.KOLIBRI_HYDRATE_LOG_LEVEL };
	}

	const server = await createHydrateServer(options);

	try {
		await server.start();
	} catch (error) {
		console.error('Failed to start the hydrate server:', error instanceof Error ? error.message : String(error));
		process.exitCode = 1;
		return;
	}

	const restUrl = server.getRestUrl();
	const grpcEndpoint = server.getGrpcEndpoint();

	console.log(`REST endpoint ready on ${restUrl ?? `${options.restHost}:${options.restPort}${options.restRoute}`}`);
	console.log(`gRPC server ready on ${grpcEndpoint ?? `${options.grpcHost}:${options.grpcPort}`}`);

	let shuttingDown = false;

	const shutdown = async () => {
		if (shuttingDown) {
			return;
		}

		shuttingDown = true;
		console.log('\nShutting down hydrate server...');
		await server.stop();
		process.exit(0);
	};

	process.on('SIGINT', () => {
		void shutdown();
	});
	process.on('SIGTERM', () => {
		void shutdown();
	});
};

void main();
