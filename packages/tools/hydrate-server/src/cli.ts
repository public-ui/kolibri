#!/usr/bin/env node
import process from 'node:process';

import { Command, CommanderError } from 'commander';

import packageJson from '../package.json' assert { type: 'json' };
import { createHydrateServer } from './server.js';
import type { HydrateServerOptions } from './types.js';

const DEFAULT_REST_PORT = 3000;
const DEFAULT_GRPC_PORT = 50051;
const DEFAULT_ROUTE = '/render';
const DEFAULT_HOST = '0.0.0.0';

type CliOptions = {
	restPort?: number;
	restHost?: string;
	grpcPort?: number;
	grpcHost?: string;
	host?: string;
	route?: string;
	logLevel?: string;
	quiet?: boolean;
};

const parsePort = (
	value: string,
	flag: string,
	errorFactory: (message: string) => Error = (message) => new CommanderError(1, 'InvalidOptionArgument', message),
): number => {
	const port = Number.parseInt(value, 10);

	if (!Number.isInteger(port) || port < 0 || port > 65535) {
		throw errorFactory(`Invalid value for ${flag}: ${value}`);
	}

	return port;
};

const readEnvPort = (key: string): number | undefined => {
	const value = process.env[key];

	if (!value) {
		return undefined;
	}

	return parsePort(value, key, (message) => new Error(message));
};

const program = new Command();

program
	.name('kolibri-hydrate-server')
	.description('High-performance REST and gRPC server for hydrating KoliBri components')
	.version(packageJson.version as string, '-v, --version', 'Display version number')
	.helpOption('-h, --help', 'Show this help text')
	.showHelpAfterError()
	.allowExcessArguments(false)
	.option('--host <host>', 'Hostname for both REST and gRPC servers')
	.option('--rest-host <host>', `Hostname for the REST server (default: ${DEFAULT_HOST})`)
	.option('--rest-port <port>', `Port for the REST server (default: ${DEFAULT_REST_PORT})`, (value) => parsePort(value, '--rest-port'))
	.option('--grpc-host <host>', `Hostname for the gRPC server (default: ${DEFAULT_HOST})`)
	.option('--grpc-port <port>', `Port for the gRPC server (default: ${DEFAULT_GRPC_PORT})`, (value) => parsePort(value, '--grpc-port'))
	.option('--route <path>', `REST endpoint path (default: ${DEFAULT_ROUTE})`)
	.option('--log-level <lvl>', 'Set Fastify logger level')
	.option('--quiet', 'Disable the Fastify logger');

program.exitOverride();

const main = async () => {
	let parsedArgs: CliOptions;

	try {
		program.parse(process.argv);
		parsedArgs = program.opts<CliOptions>();
	} catch (error) {
		if (error instanceof CommanderError) {
			if (error.code === 'commander.helpDisplayed' || error.code === 'commander.version') {
				return;
			}

			process.exitCode = error.exitCode;
			return;
		}

		throw error;
	}

	if (parsedArgs.host) {
		parsedArgs.restHost = parsedArgs.restHost ?? parsedArgs.host;
		parsedArgs.grpcHost = parsedArgs.grpcHost ?? parsedArgs.host;
	}

	let envRestPort: number | undefined;
	let envGrpcPort: number | undefined;

	try {
		envRestPort = readEnvPort('KOLIBRI_HYDRATE_REST_PORT');
		envGrpcPort = readEnvPort('KOLIBRI_HYDRATE_GRPC_PORT');
	} catch (error) {
		console.error(error instanceof Error ? error.message : String(error));
		process.exitCode = 1;
		return;
	}

	const envRestHost = process.env.KOLIBRI_HYDRATE_REST_HOST;
	const envGrpcHost = process.env.KOLIBRI_HYDRATE_GRPC_HOST;
	const envRoute = process.env.KOLIBRI_HYDRATE_ROUTE;
	const normalizedEnvRoute = envRoute ? (envRoute.startsWith('/') ? envRoute : `/${envRoute}`) : undefined;

	const options: HydrateServerOptions = {
		restHost: parsedArgs.restHost ?? envRestHost ?? DEFAULT_HOST,
		restPort: parsedArgs.restPort ?? envRestPort ?? DEFAULT_REST_PORT,
		restRoute:
			(parsedArgs.route?.startsWith('/') ? parsedArgs.route : parsedArgs.route ? `/${parsedArgs.route}` : undefined) ?? normalizedEnvRoute ?? DEFAULT_ROUTE,
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
