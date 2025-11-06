#!/bin/bash
# Test script to demonstrate MCP logging functionality

echo "=========================================="
echo "Testing KoliBri MCP Server Logging"
echo "=========================================="
echo ""

# Test 1: Without logging (default)
echo "1️⃣  Test WITHOUT logging (MCP_LOGGING not set):"
echo "-------------------------------------------"
timeout 5s node dist/mcp.cjs &
SERVER_PID=$!
sleep 2

echo ""
echo "Sending test request to search for 'button'..."
curl -s -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"search","arguments":{"query":"button","limit":2}}}' \
  > /dev/null

sleep 1
kill $SERVER_PID 2>/dev/null
wait $SERVER_PID 2>/dev/null

echo ""
echo "-------------------------------------------"
echo ""
sleep 2

# Test 2: With logging enabled
echo "2️⃣  Test WITH logging enabled (MCP_LOGGING=true):"
echo "-------------------------------------------"
MCP_LOGGING=true timeout 5s node dist/mcp.cjs &
SERVER_PID=$!
sleep 2

echo ""
echo "Sending test request to search for 'button'..."
curl -s -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"search","arguments":{"query":"button","limit":2}}}' \
  > /dev/null

sleep 1

echo ""
echo "Sending test request to get_entry..."
curl -s -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"get_entry","arguments":{"id":"sample/button/basic"}}}' \
  > /dev/null

sleep 1
kill $SERVER_PID 2>/dev/null
wait $SERVER_PID 2>/dev/null

echo ""
echo "=========================================="
echo "✅ Logging test completed!"
echo ""
echo "To enable logging, set: MCP_LOGGING=true"
echo "=========================================="
