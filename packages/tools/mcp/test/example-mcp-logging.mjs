#!/usr/bin/env node
/**
 * Practical example showing what MCP calls get logged
 */

console.log('==========================================');
console.log('MCP Call Logging - Practical Example');
console.log('==========================================\n');

console.log('When MCP_LOGGING=true, you will see logs for:\n');

console.log('1️⃣  TOOL CALLS');
console.log('   When AI agents invoke tools like search or fetch:\n');
console.log('   Example: search tool');
console.log('   [2025-11-06T10:00:00.123Z] [TOOL] search called {');
console.log('     "query": "button",');
console.log('     "kind": "sample",');
console.log('     "limit": 10');
console.log('   }');
console.log('   [2025-11-06T10:00:00.145Z] [TOOL] search completed {');
console.log('     "query": "button",');
console.log('     "resultCount": 5,');
console.log('     "options": { "limit": 10, "kind": "sample" }');
console.log('   }\n');

console.log('   Example: fetch tool');
console.log('   [2025-11-06T10:00:01.234Z] [TOOL] fetch called {');
console.log('     "id": "sample/button/basic"');
console.log('   }');
console.log('   [2025-11-06T10:00:01.256Z] [TOOL] fetch completed {');
console.log('     "id": "sample/button/basic",');
console.log('     "kind": "sample"');
console.log('   }\n');

console.log('2️⃣  RESOURCE ACCESSES');
console.log('   When AI agents read resources:\n');
console.log('   [2025-11-06T10:00:02.123Z] [RESOURCE] info accessed {');
console.log('     "uri": "kolibri://info"');
console.log('   }');
console.log('   [2025-11-06T10:00:02.234Z] [RESOURCE] best-practices accessed {');
console.log('     "uri": "kolibri://best-practices"');
console.log('   }\n');

console.log('3️⃣  ERROR CONDITIONS');
console.log('   When something goes wrong:\n');
console.log('   [2025-11-06T10:00:03.123Z] [ERROR] search failed: empty query');
console.log('   [2025-11-06T10:00:03.234Z] [ERROR] fetch failed: entry not found {');
console.log('     "id": "non-existent"');
console.log('   }\n');

console.log('ℹ️  NOTE: HTTP layer requests are NOT logged');
console.log('   Only the actual MCP tool and resource calls matter!\n');

console.log('==========================================');
console.log('To see these logs in action:');
console.log('MCP_LOGGING=true node dist/mcp.cjs');
console.log('==========================================\n');
