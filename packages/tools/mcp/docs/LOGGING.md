# MCP Request Logging - Implementation Summary

## Overview

Added comprehensive request logging functionality to the KoliBri MCP server for debugging and monitoring purposes.

## Implementation Details

### Environment Variable

- **Variable**: `MCP_LOGGING`
- **Values**: `"true"` or `"1"` to enable logging
- **Default**: Disabled (no logging overhead when not needed)

### Log Function

Added a centralized `log()` function in `src/mcp.ts`:

```typescript
function log(type: 'info' | 'tool' | 'resource' | 'error', message: string, data?: any): void;
```

- Logs to `stderr` to avoid interfering with stdio transport
- Includes ISO timestamp
- Pretty-prints JSON data when provided
- Only logs when `MCP_LOGGING` is enabled

### Log Types

1. **[INFO]** - HTTP server events
   - Request received (with method and params)
   - Request completed
   - Connection closed

2. **[TOOL]** - Tool invocations
   - `search` called/completed (with query, kind, limit, result count)
   - `fetch` called/completed (with ID, kind)

3. **[RESOURCE]** - Resource accesses
   - `info` accessed
   - `best-practices` accessed

4. **[ERROR]** - Error conditions
   - Empty queries
   - Missing parameters
   - Entry not found

### Log Format

```
[ISO_TIMESTAMP] [TYPE] message {optional_json_data}
```

**Example:**

```
[2025-11-06T09:45:23.456Z] [TOOL] search called {
  "query": "button",
  "kind": "sample",
  "limit": 10
}
```

## Usage Examples

### HTTP Server with Logging

```bash
MCP_LOGGING=true node dist/mcp.cjs
# or
MCP_LOGGING=true PORT=8080 node dist/mcp.cjs
```

### stdio Mode with Logging

```bash
MCP_LOGGING=true npx @public-ui/mcp
```

### Programmatic Usage

```typescript
// Set before creating server
process.env.MCP_LOGGING = 'true';

const server = createKolibriMcpServer();
```

## What Gets Logged

### Search Tool Example

```
[2025-11-06T09:45:23.456Z] [TOOL] search called {
  "query": "button",
  "kind": "sample",
  "limit": 10
}
[2025-11-06T09:45:23.478Z] [TOOL] search completed {
  "query": "button",
  "resultCount": 5,
  "options": { "limit": 10, "kind": "sample" }
}
```

### fetch Tool Example

```
[2025-11-06T09:45:24.123Z] [TOOL] fetch called {
  "id": "sample/button/basic"
}
[2025-11-06T09:45:24.145Z] [TOOL] fetch completed {
  "id": "sample/button/basic",
  "kind": "sample"
}
```

### HTTP Request Example

```
[2025-11-06T09:45:23.400Z] [INFO] HTTP request received {
  "requestId": 1,
  "method": "tools/call",
  "params": { "name": "search", "arguments": { "query": "button" } }
}
[2025-11-06T09:45:23.500Z] [INFO] HTTP request completed {
  "requestId": 1,
  "method": "tools/call"
}
```

### Error Example

```
[2025-11-06T09:45:25.789Z] [ERROR] fetch failed: entry not found {
  "id": "non-existent-id"
}
```

## Files Changed

- `src/mcp.ts`: Added logging function and log calls throughout
- `README.md`: Added "Logging" section with documentation
- `test/demo-logging.mjs`: Demo script showing logging configuration
- `test/test-logging.sh`: Shell script for testing logging (optional)

## Testing

All existing tests continue to pass (11/11 tests).

Run demo script to see logging status:

```bash
node test/demo-logging.mjs                    # Without logging
MCP_LOGGING=true node test/demo-logging.mjs   # With logging
```

## Performance Impact

- **Zero overhead when disabled** (default)
- Minimal overhead when enabled (single environment variable check per log call)
- Logs written to stderr, doesn't interfere with stdio transport
- JSON serialization only when logging is enabled

## Benefits

1. **Debugging**: See exactly what requests are being made and their parameters
2. **Monitoring**: Track usage patterns and identify issues
3. **Development**: Understand MCP protocol flow
4. **Optional**: No performance impact when disabled
5. **Comprehensive**: Covers all tools, resources, and HTTP endpoints
