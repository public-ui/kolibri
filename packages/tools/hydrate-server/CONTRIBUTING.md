# Contributing: Manual Testing Guide

This comprehensive guide explains how to perform manual tests against the KoliBri Hydrate Server using both REST and gRPC clients for development and debugging purposes.

## 🚀 Quick Start

### Prerequisites

```bash
# Build the package first
pnpm build

# Ensure all dependencies are installed
pnpm install
```

## 🔧 REST API Testing (Recommended)

REST is the fastest method for testing (1-2 seconds per component vs 30-120 seconds for gRPC).

### Start the Server

```bash
# Start with default ports
node dist/cli.mjs

# Or with custom ports
node dist/cli.mjs --rest-port 8080 --grpc-port 50051
```

**Default endpoints:**

- REST API: <http://localhost:3000/hydrate>
- gRPC API: `localhost:50051`

### REST Testing Methods

#### 1. Using curl (Terminal)

```bash
# Simple component
curl -X POST http://localhost:3000/hydrate \
  -H "Content-Type: text/html" \
  -d '<kol-button _label="Test Button"></kol-button>'

# Complex component with JSON payload
curl -X POST http://localhost:3000/hydrate \
  -H "Content-Type: application/json" \
  -d '{"html": "<kol-card><kol-heading _level=\"2\">Card</kol-heading></kol-card>"}'
```

#### 2. Using JavaScript/Node.js

```javascript
async function testComponent(html) {
	const response = await fetch('http://localhost:3000/hydrate', {
		method: 'POST',
		headers: { 'Content-Type': 'text/html' },
		body: html,
	});

	const result = await response.json();
	console.log('✅ Hydrated HTML:', result.html.length, 'chars');
	console.log('🔧 Components:', result.components);
	console.log('📋 Diagnostics:', result.diagnostics);
}

// Test it
testComponent('<kol-badge _label="New Feature"></kol-badge>');
```

## 📡 gRPC Testing (Advanced)

gRPC testing is slower but provides the same functionality. Use for specific gRPC-related testing.

### 1. Basic gRPC Client Test

For a simple one-component test:

```bash
node test-grpc-client.mjs
```

This will:

- Start a hydrate server on a random port
- Connect a gRPC client
- Test rendering a single component
- Show response details and timing
- Clean up automatically

**Example output:**

```text
🚀 Starting gRPC client test...
🚀 Starting gRPC client test...
📡 gRPC Server running at: 127.0.0.1:59671
✅ gRPC Client connected
📤 Sending request: <kol-button _label="Test Button"></kol-button>
📥 Response received in 94ms:
  HTML length: 7430
  Components: []
  Hydrated count: 2
  HTML preview: <!doctype html><html data-stencil-build="xq1grmid">...
  Diagnostics: 1 items
✅ gRPC test completed successfully!
```

### 2. Interactive Multi-Component Testing

For testing multiple components:

```bash
node test-grpc-interactive.mjs
```

Tests various component types:

- Simple components (button, badge)
- Complex components (alert, card)
- Multiple components in one request

### 3. External Tool Testing

Using `grpcurl` for low-level testing:

```bash
# Install grpcurl first (macOS)
brew install grpcurl

# Run the external test script
chmod +x test-grpc-external.sh
./test-grpc-external.sh
```

## Creating Custom Tests

### Basic Template

Create your own test file:

```javascript
#!/usr/bin/env node
import { credentials, loadPackageDefinition } from '@grpc/grpc-js';
import { load } from '@grpc/proto-loader';
import { createHydrateServer, hydrateProtoPath } from './dist/index.mjs';

async function customTest() {
	// 1. Start server
	const server = await createHydrateServer({
		grpcHost: '127.0.0.1',
		grpcPort: 0, // Use 0 for random port
		logger: false,
	});

	await server.start();
	const grpcEndpoint = server.getGrpcEndpoint();
	console.log(`Server running at: ${grpcEndpoint}`);

	try {
		// 2. Create client
		const packageDefinition = await load(hydrateProtoPath, {
			keepCase: false,
			longs: String,
			enums: String,
			defaults: true,
			oneofs: true,
		});

		const proto = loadPackageDefinition(packageDefinition);
		const client = new proto.publicui.hydrate.HydrateRenderer(grpcEndpoint, credentials.createInsecure());

		// 3. Your custom test here
		const testHtml = '<your-component-html>';

		const response = await new Promise((resolve, reject) => {
			client.renderHtml({ html: testHtml }, (error, response) => {
				if (error) reject(error);
				else resolve(response);
			});
		});

		console.log('Response:', response);

		// 4. Clean up
		client.close();
	} finally {
		await server.stop();
	}
}

customTest().catch(console.error);
```

### Advanced Test Scenarios

#### Performance Testing

```javascript
// Test multiple requests for performance
const testCases = [
	'<kol-button _label="Test 1"></kol-button>',
	'<kol-badge _label="Test 2"></kol-badge>',
	// ... more test cases
];

for (const html of testCases) {
	const start = Date.now();
	const response = await client.renderHtml({ html });
	const duration = Date.now() - start;
	console.log(`${html}: ${duration}ms`);
}
```

#### Error Testing

```javascript
// Test error handling
try {
	await client.renderHtml({ html: '<invalid-component>' });
} catch (error) {
	console.log('Expected error:', error.message);
}
```

#### Complex Component Testing

```javascript
// Test complex nested components
const complexHtml = `
<kol-card>
    <kol-heading _level="2">Card Title</kol-heading>
    <p>Some content</p>
    <kol-button _label="Action" _variant="primary"></kol-button>
</kol-card>
`;

const response = await client.renderHtml({ html: complexHtml });
console.log('Hydrated components:', response.hydratedCount);
console.log('Diagnostics:', JSON.parse(response.diagnosticsJson));
```

## Using with External Tools

### grpcurl Examples

```bash
# Simple request
grpcurl -plaintext -d '{"html":"<kol-button _label=\"Test\"></kol-button>"}' \
    127.0.0.1:50051 publicui.hydrate.HydrateRenderer/renderHtml

# Complex request with multiple components
grpcurl -plaintext -d '{
    "html": "<kol-card><kol-heading _level=\"1\">Title</kol-heading></kol-card>"
}' 127.0.0.1:50051 publicui.hydrate.HydrateRenderer/renderHtml
```

### Postman/Insomnia

You can also use GUI tools like Postman with gRPC support:

1. Import the proto file: `src/proto/render.proto`
2. Connect to `127.0.0.1:50051` (or your server port)
3. Use the `renderHtml` method with JSON payload:

   ```json
   {
   	"html": "<kol-button _label=\"Test\"></kol-button>"
   }
   ```

## Troubleshooting

### Common Issues

1. **Server not starting**: Check if port is already in use
2. **Proto file not found**: Ensure the project is built (`pnpm build`)
3. **Connection refused**: Verify the server is running and port is correct
4. **Slow responses**: This is expected - gRPC is slower than REST for this server

### Debug Mode

Enable logging for more details:

```javascript
const server = await createHydrateServer({
	grpcHost: '127.0.0.1',
	grpcPort: 0,
	logger: { level: 'debug' }, // Enable debug logging
});
```

### Performance Tips

- Use random ports (`grpcPort: 0`) for parallel testing
- Clean up clients with `client.close()`
- Stop servers with `await server.stop()`
- Test simple components first before complex ones

## Integration with Development Workflow

### Pre-commit Testing

Add to your development script:

```bash
#!/bin/bash
echo "Testing hydrate server..."
node test-grpc-client.mjs
if [ $? -eq 0 ]; then
    echo "✅ gRPC tests passed"
else
    echo "❌ gRPC tests failed"
    exit 1
fi
```

### Component Development

When developing new components:

1. Add your component HTML to a test file
2. Run the gRPC client test
3. Check the hydrated output
4. Verify diagnostics for issues

This workflow helps ensure your components work correctly in SSR environments.

## 🧪 Practical Test Scenarios

### Testing Component Variants

```bash
# Test different button variants
curl -X POST http://localhost:3000/hydrate -H "Content-Type: text/html" \
  -d '<kol-button _label="Primary" _variant="primary"></kol-button>'

curl -X POST http://localhost:3000/hydrate -H "Content-Type: text/html" \
  -d '<kol-button _label="Secondary" _variant="secondary"></kol-button>'
```

### Testing Complex Layouts

```bash
# Test card with multiple nested components
curl -X POST http://localhost:3000/hydrate -H "Content-Type: application/json" -d '{
  "html": "<kol-card><kol-heading _level=\"2\">Product Card</kol-heading><p>Description text</p><kol-button _label=\"Buy Now\" _variant=\"primary\"></kol-button></kol-card>"
}'
```

### Testing Navigation Components

```bash
# Test breadcrumb navigation
curl -X POST http://localhost:3000/hydrate -H "Content-Type: text/html" -d '
<kol-breadcrumb>
  <kol-link _href="/" _label="Home"></kol-link>
  <kol-link _href="/products" _label="Products"></kol-link>
  <span>Current Page</span>
</kol-breadcrumb>'
```

### Performance Comparison

```javascript
// performance-test.mjs
async function comparePerformance() {
	const testHtml = '<kol-button _label="Test"></kol-button>';

	// REST API test
	const restStart = Date.now();
	await fetch('http://localhost:3000/hydrate', {
		method: 'POST',
		headers: { 'Content-Type': 'text/html' },
		body: testHtml,
	});
	const restTime = Date.now() - restStart;

	console.log(`REST: ${restTime}ms`);
	console.log("💡 Use REST for development - it's much faster!");
}
```

## ⚠️ Known Limitations

### Excluded Components

These components are currently excluded from tests due to memory issues:

- **Input components**: `kol-input-*` (debounced timers cause memory leaks)
- **Timer-heavy components**: `kol-tooltip`, `kol-progress` (setTimeout without cleanup)
- **Memory-intensive components**: `kol-version` (uses 260MB+ memory)

See `PROBLEMATIC_COMPONENTS` in `test/node/server.test.mjs` for the complete list.

### Performance Guidelines

- **REST API**: ✅ Fast (1-2 seconds per component)
- **gRPC API**: ⚠️ Slow (30-120 seconds per component)
- **Recommendation**: Use REST for development, gRPC only when specifically testing gRPC functionality

## 🚀 Quick Reference

### Health Check

```bash
curl http://localhost:3000/health
```

### Most Common Test Commands

```bash
# Quick component test
curl -X POST localhost:3000/hydrate -H "Content-Type: text/html" -d '<kol-badge _label="Test"></kol-badge>'

# JSON format test
curl -X POST localhost:3000/hydrate -H "Content-Type: application/json" -d '{"html": "<kol-icon _label=\"Home\"></kol-icon>"}'

# gRPC quick test
node test-grpc-client.mjs
```

## 🤝 Contributing Your Tests

When contributing test cases:

1. **Document your test scenario** with expected behavior
2. **Include component HTML** and expected output
3. **Note performance characteristics** (memory usage, timing)
4. **Test both REST and gRPC** if relevant
5. **Add test to appropriate category** (simple, complex, navigation, etc.)

Example contribution format:

````markdown
### Testing New Feature: kol-my-component

**Component:** `<kol-my-component _prop="value">Content</kol-my-component>`
**Expected:** Should render with proper accessibility attributes
**Memory:** ~5MB heap usage
**Performance:** REST: 50ms, gRPC: 30s
**Issues:** None known

**Test command:**

```bash
curl -X POST localhost:3000/hydrate -H "Content-Type: text/html" \
  -d '<kol-my-component _prop="test">Test content</kol-my-component>'
```
````

````

```

```
````
