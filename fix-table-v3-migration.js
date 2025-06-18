#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Find all files that need fixing
const filesToFix = [
  'packages/samples/react/src/components/handout/basic.tsx',
  'packages/samples/react/src/components/button/short-key.tsx',
  'packages/samples/react/src/components/table/stateful-with-single-selection.tsx',
  'packages/samples/react/src/components/table/render-cell.tsx',
  'packages/samples/react/src/components/table/stateful-with-selection.tsx',
  'packages/samples/react/src/components/table/sort-data.tsx',
  'packages/samples/react/src/components/table/pagination-position.tsx',
  'packages/samples/react/src/components/table/with-footer.tsx',
  'packages/samples/react/src/components/table/stateless.tsx',
  'packages/samples/react/src/components/table/stateless-with-selection.tsx',
  'packages/samples/react/src/components/table/with-pagination.tsx',
  'packages/samples/react/src/components/table/predefined-settings.tsx',
  'packages/samples/react/src/components/table/stateless-with-single-selection.tsx',
  'packages/samples/react/src/components/table/multi-sort.tsx',
  'packages/samples/react/src/components/table/horizontal-scrollbar.tsx',
  'packages/scenarios/horizontal-scrollbar-advanced/TableHorizontalScrollbarAdvanced.tsx'
];

function fixTableFile(filePath) {
  try {
    console.log(`Fixing ${filePath}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove _minWidth props from table components
    content = content.replace(/_minWidth="[^"]*"/g, '');
    content = content.replace(/_minWidth={[^}]*}/g, '');
    content = content.replace(/\s*_minWidth\s*=\s*"[^"]*"\s*/g, ' ');
    content = content.replace(/\s*_minWidth\s*=\s*{[^}]*}\s*/g, ' ');
    
    // Replace width: with minWidth: in header objects
    content = content.replace(/(\{[^}]*)\bwidth:\s*'([^']+)'([^}]*\})/g, '$1minWidth: \'$2\'$3');
    content = content.replace(/(\{[^}]*)\bwidth:\s*"([^"]+)"([^}]*\})/g, '$1minWidth: "$2"$3');
    
    // Add minWidth to header cells that don't have it
    content = content.replace(
      /(\{\s*(?:label|key)[^}]*),(\s*\})/g,
      '$1, minWidth: \'100px\'$2'
    );
    
    // More specific patterns for different header types
    content = content.replace(
      /(\{\s*label:\s*'[^']*',\s*key:\s*'[^']*')(\s*\})/g,
      '$1, minWidth: \'100px\'$2'
    );
    
    content = content.replace(
      /(\{\s*label:\s*"[^"]*",\s*key:\s*"[^"]*")(\s*\})/g,
      '$1, minWidth: "100px"$2'
    );
    
    // Fix specific patterns with textAlign
    content = content.replace(
      /(\{\s*(?:label|key):\s*[^,]+,\s*(?:key|label):\s*[^,]+,\s*textAlign:\s*[^,]+)(\s*\})/g,
      '$1, minWidth: \'100px\'$2'
    );
    
    // Fix render functions
    content = content.replace(
      /(\{\s*(?:label|key):\s*[^,]+,\s*(?:key|label):\s*[^,]+,\s*textAlign:\s*[^,]+,\s*render:\s*[^,}]+)(\s*\})/g,
      '$1, minWidth: \'120px\'$2'
    );
    
    // Clean up multiple commas
    content = content.replace(/,\s*,/g, ',');
    
    // Clean up spaces
    content = content.replace(/\s+/g, ' ');
    content = content.replace(/(\n\s*)\s+/g, '$1');
    
    fs.writeFileSync(filePath, content);
    console.log(`✓ Fixed ${filePath}`);
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

// Run the fixes
console.log('Starting V3 table migration fixes...\n');

filesToFix.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    fixTableFile(fullPath);
  } else {
    console.log(`⚠ File not found: ${fullPath}`);
  }
});

console.log('\n✅ V3 table migration fixes completed!');

