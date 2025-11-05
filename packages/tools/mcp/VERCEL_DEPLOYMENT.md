# Vercel Deployment Guide for KoliBri MCP Server

This guide explains how to deploy the KoliBri MCP Server to Vercel using GitHub Actions for building.

## Prerequisites

- GitHub repository with proper access
- Vercel account connected to GitHub
- Vercel secrets configured in repository (VERCEL_MCP_TEAM_ID, VERCEL_MCP_PROJECT_ID, VERCEL_MCP_TOKEN)

## Architecture

The MCP Server uses a **GitHub Actions → Vercel** deployment pipeline:

1. **GitHub Actions** builds the project (`pnpm build`)
2. Generated `dist/` files are created with all data
3. Vercel deploys the **pre-built artifacts** (no build on Vercel)
4. API endpoints run as Vercel Serverless Functions

### Endpoints

- **GET /api/sse** - SSE endpoint for MCP protocol communication
- **POST /api/message** - Message endpoint (used internally by SSE transport)
- **GET /api/health** - Health check endpoint
- **GET /** - Landing page with API documentation

## Build Process

### GitHub Actions Workflow

The `.github/workflows/mcp-vercel.yml` workflow:

1. Checks out the repository
2. Sets up pnpm workspace
3. Builds the MCP package: `pnpm build`
4. Verifies built artifacts in `dist/`
5. Deploys to Vercel using `vercel` CLI

### Important: Pre-Built Artifacts

The deployment uses **pre-built JavaScript files** from `dist/`:

```typescript
// API files import from dist/ (built by GitHub Actions)
import { getAllEntries } from '../dist/data.mjs';
import { searchEntries } from '../dist/search.mjs';
```

**Why?** This ensures:

- ✅ Consistent builds (same Node.js version)
- ✅ All sample data is correctly generated
- ✅ Faster Vercel deployments (no build step)
- ✅ Better error detection (build fails in CI, not on Vercel)

## Configuration Files

### 1. vercel.json

```json
{
	"buildCommand": "echo 'Using pre-built artifacts from GitHub Actions'",
	"installCommand": "echo 'Dependencies already installed by GitHub Actions'",
	"functions": {
		"api/**/*.ts": {
			"runtime": "nodejs20.x"
		}
	}
}
```

**Key Points:**

- Build and install commands are no-ops (GitHub Actions handles this)
- TypeScript files in `api/` are still compiled by Vercel
- Pre-built `dist/` files are deployed as-is

### 2. .vercelignore

```
src/
test/
build.config.ts
tsconfig.json
# ... other development files
```

**Purpose:** Exclude source files and only deploy:

- `api/` - Serverless function definitions
- `dist/` - Pre-built JavaScript modules
- `public/` - Static assets
- `package.json` - Dependency information

### 3. tsconfig.json

For local development, TypeScript needs to compile API files:

```json
{
	"compilerOptions": {
		"target": "ES2022",
		"module": "ESNext",
		"moduleResolution": "bundler",
		"strict": false,
		"noImplicitAny": false
	},
	"include": ["src/**/*", "api/**/*"],
	"exclude": ["node_modules", "dist"]
}
```

**Note:** `strict: false` is required because API files import from `dist/` which has no TypeScript declarations. This is intentional and safe because GitHub Actions validates the build.

### 4. Type Declarations

The file `api/dist-types.d.ts` provides type information for built modules:

```typescript
declare module '../dist/data.mjs' {
	export function getAllEntries(): SampleEntry[];
	// ...
}
```

This allows TypeScript to understand imports from `dist/` during development.

## Deployment Process

### Automatic Deployment via GitHub Actions

**Production:** Pushing to `release/3` branch automatically deploys to production

```bash
git checkout release/3
git merge your-feature-branch
git push origin release/3
```

**Preview:** Opening a pull request automatically creates a preview deployment

```bash
git checkout -b feature/my-feature
git push origin feature/my-feature
# Create PR on GitHub
```

### Manual Deployment (Not Recommended)

If you need to deploy manually:

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
