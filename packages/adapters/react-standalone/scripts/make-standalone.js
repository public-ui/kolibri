#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

let code = fs
	.readFileSync('dist/index.mjs', 'utf-8')
	.replace(/import React, \{ createElement \} from 'react';\n+/, '')
	.replace(/return createElement\(/g, 'return React.createElement(');

const pattern = /export \{ (Kol[^,]+),/g;
while (pattern.test(code)) {
	code = code.replace(/export \{ (Kol[^,]+),/g, 'window.$1 = $1;\nexport {');
}

code = code.replace(/export \{ (Kol[^ ]+) }/g, 'window.$1 = $1');

fs.writeFileSync('dist/index.mjs', code, 'utf-8');
