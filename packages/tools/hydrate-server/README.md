# KoliBri Hydrate Server

The **KoliBri Hydrate Server** exposes the experimental [`@public-ui/hydrate`](https://www.npmjs.com/package/@public-ui/hydrate) renderer via
high-performance REST and gRPC interfaces. Send a snippet of HTML containing KoliBri web components and receive fully hydrated markup that can be
embedded into any server-side workflow.

> ⚠️ Hydration currently requires the `@public-ui/components` workspace package to be built. Run `pnpm --filter @public-ui/components build` before
> starting the server if the hydration adapter has not been generated yet.

## Features

- 🚀 Fast HTTP API powered by [Fastify](https://www.fastify.io/)
- 🔌 gRPC endpoint with a published `render.proto` contract
- 🧱 Shareable core that can be embedded into other Node.js applications
- 🧪 Designed for integration testing thanks to injectable renderers

## Installation

```bash
pnpm add @public-ui/hydrate-server
```

The package ships with both an embeddable API and a CLI (`kolibri-hydrate-server`).

## CLI Usage

```bash
kolibri-hydrate-server [options]
```

### Options

| Option                 | Description                                             | Default   |
| ---------------------- | ------------------------------------------------------- | --------- |
| `--rest-port <number>` | Port for the REST API                                   | `3000`    |
| `--rest-host <host>`   | Hostname for the REST API                               | `0.0.0.0` |
| `--route <path>`       | REST endpoint path                                      | `/render` |
| `--grpc-port <number>` | Port for the gRPC server                                | `50051`   |
| `--grpc-host <host>`   | Hostname for the gRPC server                            | `0.0.0.0` |
| `--host <host>`        | Convenience flag to apply the same host to both servers | –         |
| `--log-level <level>`  | Fastify logger level (`info`, `warn`, …)                | `info`    |
| `--quiet`              | Disable the Fastify logger                              | `false`   |
| `--help`               | Show CLI help                                           | –         |
| `--version`            | Display version number                                  | –         |

Environment variables can also be used:

- `KOLIBRI_HYDRATE_REST_PORT`
- `KOLIBRI_HYDRATE_REST_HOST`
- `KOLIBRI_HYDRATE_GRPC_PORT`
- `KOLIBRI_HYDRATE_GRPC_HOST`
- `KOLIBRI_HYDRATE_ROUTE`
- `KOLIBRI_HYDRATE_LOG_LEVEL`
- `KOLIBRI_HYDRATE_QUIET`

### REST Example

```bash
curl -X POST \
     -H 'Content-Type: application/json' \
     -d '{"html":"<kol-button _label=\"Server Rendered\"></kol-button>"}' \
     http://localhost:3000/render
```

Response:

```json
{
	"html": "<kol-button class=\"hydrated\" _label=\"Server Rendered\"></kol-button>",
	"components": ["kol-button"],
	"hydratedCount": 1,
	"diagnostics": []
}
```

### gRPC Example

```bash
grpcurl -plaintext -d '{"html":"<kol-alert _heading=\"Hydrate\">Demo</kol-alert>"}' \
  localhost:50051 publicui.hydrate.HydrateRenderer/RenderHtml
```

The `render.proto` definition is published via the package export `@public-ui/hydrate-server/proto/render.proto`.

## Embedding the Server

```ts
import { createHydrateServer } from '@public-ui/hydrate-server';

const server = await createHydrateServer({
	restPort: 8080,
	grpcPort: 50052,
});

await server.start();
console.log('REST:', server.getRestUrl());
console.log('gRPC:', server.getGrpcEndpoint());
```

Call `await server.stop()` to gracefully shut down both transports.

## Testing

The package exposes utility helpers to make integration testing straightforward:

```ts
import { createHydrateServer } from '@public-ui/hydrate-server';

const server = await createHydrateServer({
	renderer: async (html) => ({
		html: `<hydrated>${html}</hydrated>`,
		components: ['kol-demo'],
		hydratedCount: 1,
		diagnostics: [],
	}),
});
```

## License

EUPL-1.2 © Informationstechnikzentrum Bund
