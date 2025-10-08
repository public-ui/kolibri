# Agent Instructions

This package provides a simple Node.js-based REST API backend service for the Model Context Protocol (MCP). Through this, AI agents can retrieve structured information about KoliBri examples and get the original source code returned.

## Development

### Start Development Mode

```bash
pnpm --filter @public-ui/mcp dev
```

### Create Production Build

```bash
pnpm --filter @public-ui/mcp build
pnpm --filter @public-ui/mcp start
```

By default, the service listens on port `3030`. The endpoints are accessible both under `/api/mcp/...` and `/mcp/...`.

## Vercel Deployment

After deployment to Vercel, the API is available under the following URLs:

- **Landing Page:** `https://<project>.vercel.app/`
- **API Endpoints:** `https://<project>.vercel.app/mcp/...`

### Example URLs

- `https://<project>.vercel.app/mcp/health`
- `https://<project>.vercel.app/mcp/samples`
- `https://<project>.vercel.app/mcp/sample?id=sample/button/basic`
- `https://<project>.vercel.app/mcp/concepts`
- `https://<project>.vercel.app/mcp/concept?id=concept/README`

## Endpoints

- `GET /api/mcp/health` – returns the backend status and metadata about the current sample index.
- `GET /api/mcp/samples` – lists all available samples. Can optionally be filtered using the query parameter `q`.
- `GET /api/mcp/sample?id=sample/<component>/<sample>` – returns path and source code of a specific sample.
- `GET /api/mcp/concepts` – lists all available concept and documentation entries.
- `GET /api/mcp/concept?id=concept/<identifier>` – returns metadata and Markdown source of a specific concept.

Refresh requests are not available on deployed environments because the indexes are embedded during the build.

All responses are delivered as JSON and already contain the relative paths within the repository.

## How it works

At startup, all `routes.ts` files from the React sample project are analyzed. The component files referenced in them are resolved, read, and cached in an index. Based on this index, the server responds to requests from MCP-compatible clients.

## Build Process

The package uses a two-stage build process optimized for Vercel deployment:

1. **GitHub Actions**: Builds the complete package with all 136+ samples from the monorepo
2. **Vercel**: Skips the build process and uses pre-built artifacts

### GitHub Actions Build

```bash
pnpm build  # → node prebuild.js && unbuild → collects all samples
```

### Vercel Build Strategy

```bash
echo 'Skipping build - using pre-built artifacts'  # → uses existing dist/ and api/ files
```

This approach ensures that:

- GitHub Actions has access to the full monorepo and can collect all samples
- Vercel receives pre-built artifacts with embedded sample data
- No "0 samples" issues occur due to missing monorepo context

## Further Development

- Additional filters or full-text search can be implemented directly in the `SampleIndex`.
- For production environments, it is recommended to implement authentication in front of the MCP backend.
- The prebuild system can be extended to support additional sample sources beyond React samples.
