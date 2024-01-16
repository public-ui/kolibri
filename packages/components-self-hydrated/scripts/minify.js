const { minify } = require('terser');
const fs = require('fs');
const path = require('path');

var options = {};

function minifyFiles(dir) {
	const dirItems = fs.readdirSync(dir);
	dirItems.forEach((dirItem) => {
		const dirItemPath = path.resolve(dir, dirItem);
		const stats = fs.lstatSync(dirItemPath);
		if (stats.isFile()) {
			let code = fs.readFileSync(dirItemPath, { encoding: 'utf-8' });
			code = code.replace(/Stencil/g, 'KoliBri');
			minify(code, options)
				.then((result) => {
					fs.writeFileSync(dirItemPath, result.code, { encoding: 'utf-8' });
				})
				.catch(() => {});
		} else if (stats.isDirectory()) {
			minifyFiles(dirItemPath);
		}
	});
}

minifyFiles(path.resolve(__dirname, '../dist'));
