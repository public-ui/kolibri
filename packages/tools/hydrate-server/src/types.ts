import type { Server as GrpcServer } from '@grpc/grpc-js';
import type { FastifyInstance, FastifyServerOptions } from 'fastify';

export interface RenderRequestPayload {
	html: string;
	options?: Record<string, unknown>;
}

export interface RenderResponsePayload {
	html: string;
	components: string[];
	hydratedCount: number;
	diagnostics: unknown[];
}

export interface HydrateRendererResult {
	html: string;
	components?: string[];
	hydratedCount?: number;
	diagnostics?: unknown;
}

export type HydrateRenderer = (html: string, options?: Record<string, unknown>) => Promise<HydrateRendererResult>;

export interface HydrateServerOptions {
	host?: string;
	restHost?: string;
	restPort?: number;
	restRoute?: string;
	grpcHost?: string;
	grpcPort?: number;
	logger?: FastifyServerOptions['logger'];
	renderer?: HydrateRenderer;
}

export interface HydrateServer {
	readonly rest: FastifyInstance;
	readonly grpc: GrpcServer;
	start(): Promise<void>;
	stop(): Promise<void>;
	isStarted(): boolean;
	getRestUrl(): string | null;
	getGrpcEndpoint(): string | null;
}
