#!/bin/bash

# Start the hydrate server in background
echo "🚀 Starting hydrate server..."
node -e "
import { createHydrateServer } from './dist/index.mjs';
const server = await createHydrateServer({ grpcHost: '127.0.0.1', grpcPort: 50051, logger: false });
await server.start();
console.log('📡 gRPC Server running on 127.0.0.1:50051');
console.log('Press Ctrl+C to stop...');
process.on('SIGINT', async () => { await server.stop(); process.exit(0); });
await new Promise(() => {});
" &

SERVER_PID=$!

# Wait for server to start
sleep 2

echo "🧪 Testing gRPC with grpcurl..."

# Test with grpcurl (if installed)
if command -v grpcurl &> /dev/null; then
    echo "📤 Sending gRPC request..."
    grpcurl -plaintext -d '{"html":"<kol-button _label=\"Test\"></kol-button>"}' \
        127.0.0.1:50051 publicui.hydrate.HydrateRenderer/renderHtml
else
    echo "❌ grpcurl not installed. Install with: brew install grpcurl"
    echo "Or use the Node.js client scripts instead."
fi

# Clean up
echo "🛑 Stopping server..."
kill $SERVER_PID 2>/dev/null || true
wait $SERVER_PID 2>/dev/null || true
echo "✅ Done!"
