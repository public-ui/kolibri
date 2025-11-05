# Vercel Deployment Guide for KoliBri MCP Server

This guide explains how to deploy the KoliBri MCP Server to Vercel.

## Prerequisites

- Vercel account
- Vercel CLI installed: `npm install -g vercel`
- Project built successfully: `pnpm build`

## Architecture

The MCP Server is deployed as Vercel Serverless Functions with SSE (Server-Sent Events) transport:

- **GET /api/sse** - SSE endpoint for MCP protocol communication
- **POST /api/message** - Message endpoint (used internally by SSE transport)
- **GET /api/health** - Health check endpoint
- **GET /** - Landing page with API documentation

## Important Configuration

### 1. TypeScript Files in api/

The `api/` directory contains TypeScript files that Vercel automatically compiles to serverless functions. These files **import directly from src/** to avoid issues with the build directory:

```typescript
// ✅ Correct - imports from src/
import { getAllEntries } from '../src/data.js';
import { searchEntries } from '../src/search.js';

// ❌ Wrong - dist/ is not available during Vercel build
import { getAllEntries } from '../dist/data.mjs';
```

### 2. vercel.json Configuration

```json
{
	"buildCommand": "pnpm build",
	"installCommand": "pnpm install",
	"functions": {
		"api/**/*.ts": {
			"runtime": "nodejs20.x"
		}
	}
}
```

### 3. tsconfig.json

Ensure TypeScript can compile both `src/` and `api/` directories:

```json
{
	"compilerOptions": {
		"target": "ES2022",
		"module": "ESNext",
		"moduleResolution": "bundler",
		"strict": true
	},
	"include": ["src/**/*", "api/**/*"],
	"exclude": ["node_modules", "dist"]
}
```

## Deployment Steps

### 1. First Deployment

```bash
# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 2. Subsequent Deployments

```bash
# Deploy to production
vercel --prod
```

### 3. Environment Variables (Optional)

If needed, set environment variables in Vercel dashboard or via CLI:

```bash
vercel env add VARIABLE_NAME
```

## Testing the Deployment

After deployment, test the endpoints:

### 1. Health Check

```bash
curl https://your-deployment-url.vercel.app/api/health
```

Expected response:

```json
{
	"status": "ok",
	"timestamp": "2025-11-05T16:00:00.000Z",
	"version": "1.0.0",
	"endpoints": ["/api/sse", "/api/message", "/api/health"]
}
```

### 2. SSE Connection (with MCP Client)

```javascript
// Example MCP client connection
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';

const transport = new SSEClientTransport(new URL('https://your-deployment-url.vercel.app/api/sse'));

const client = new Client(
	{
		name: 'test-client',
		version: '1.0.0',
	},
	{
		capabilities: {},
	},
);

await client.connect(transport);

// List available tools
const tools = await client.listTools();
console.log('Available tools:', tools);
```

### 3. Landing Page

Visit `https://your-deployment-url.vercel.app/` to see the API documentation.

## Troubleshooting

### 404 Error on /api/sse

**Problem**: SSE endpoint returns 404 Not Found

**Solutions**:

1. Ensure `api/sse.ts` has a default export named `handler`
2. Check that TypeScript files are being compiled (see `vercel.json` functions config)
3. Verify imports use `src/` not `dist/` paths
4. Check Vercel build logs for compilation errors

### TypeScript Compilation Errors

**Problem**: Build fails with TypeScript errors

**Solutions**:

1. Run `pnpm build` locally to check for errors
2. Ensure `tsconfig.json` includes both `src/` and `api/` directories
3. Check that all imports have correct file extensions (`.js` or `.ts`)

### Module Resolution Issues

**Problem**: Cannot find module errors during runtime

**Solutions**:

1. Use `.js` extensions in imports even for TypeScript files
2. Set `"moduleResolution": "bundler"` in `tsconfig.json`
3. Ensure all dependencies are in `dependencies`, not `devDependencies`

### SSE Connection Timeouts

**Problem**: SSE connection closes immediately or times out

**Solutions**:

1. Vercel has a 60-second timeout for serverless functions
2. SSE connections should be kept alive with periodic messages
3. Check that `SSEServerTransport` is properly configured

## Performance Considerations

1. **Cold Starts**: First request may be slower due to serverless cold start
2. **Timeouts**: Vercel limits function execution to 60 seconds (Pro: 300s)
3. **Memory**: Default is 1024 MB, can be increased in `vercel.json`
4. **Regions**: Deploy to regions closest to your users

## Security

1. **CORS**: Configured to allow all origins (`*`) - restrict in production
2. **Rate Limiting**: Consider adding rate limiting for production
3. **Authentication**: Add authentication if needed (e.g., Bearer tokens)

## Monitoring

Monitor your deployment in Vercel Dashboard:

- **Logs**: View function execution logs
- **Analytics**: Track request counts and performance
- **Errors**: Monitor error rates and stack traces

## Continuous Deployment

Connect your GitHub repository to Vercel for automatic deployments:

1. Link repository in Vercel Dashboard
2. Configure branch deployments (main → production)
3. Enable automatic deployments on push

## Cost Considerations

- **Free Tier**: 100GB bandwidth, 100GB-hrs compute time
- **Pro Tier**: Increased limits and features
- Monitor usage in Vercel Dashboard
