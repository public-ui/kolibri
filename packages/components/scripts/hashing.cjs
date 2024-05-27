#!/usr/bin/env node

// https://github.com/deckgo/deckdeckgo/blob/96d33cbd906223b32dd65702f9502c9b90589a72/studio/scripts/config.index.js#L35
/**
 * Add to npm scripts like
 *
 *  "build": "stenicl build ... && node hashing.cjs"
 */

const fs = require('fs');
const path = require('path');

const crypto = require('crypto');

function genSha(text, methode = 'sha512') {
	return crypto.createHash(methode).update(text).digest('base64');
}

function genShaAsHash(text, methode = 'sha512') {
	return `${methode}-${genSha(text, methode)}`;
}

function genShaAsHashAndApostrophe(text, methode = 'sha512') {
	return `'${genShaAsHash(text, methode)}'`;
}

function updateCSP(filename) {
	fs.readFile(`${filename}`, 'utf8', function (err, data) {
		if (err) {
			return console.log(err);
		}

		data = data.replace(/("default\-src 'self'[^"]+)/, `"default-src 'self' *.jsdelivr.net ${Array.from(CSP_HASHES).join(' ')}`);

		fs.writeFile(`${filename}`, data, 'utf8', function (err) {
			if (err) return console.log(err);
		});
	});
}

function findSWHash(data) {
	const sw = /(<.?script data-build.*?>)([\s\S]*?)(<\/script>)/gm;

	let m;
	while ((m = sw.exec(data))) {
		if (m && m.length >= 3 && m[2].indexOf('serviceWorker') > -1) {
			return `'sha256-${crypto.createHash('sha256').update(m[2]).digest('base64')}'`;
		}
	}

	return undefined;
}

function findPreloadModuleLinksHash(data) {
	const preload = /(<.?link (rel=\"modulepreload\"|rel=modulepreload).*?>)/gm;

	const shas = [];

	let m;
	while ((m = preload.exec(data))) {
		console.log(m[0], `'sha256-${crypto.createHash('sha256').update(m[0]).digest('base64')}'`);
		shas.push(`'sha256-${crypto.createHash('sha256').update(m[0]).digest('base64')}'`);
	}

	return shas && shas.length > 0 ? shas.join(' ') : undefined;
}

function genHyndradHash(dir) {
	fs.readdirSync(dir).forEach((file) => {
		const fullPath = path.join(dir, file);
		if (fs.lstatSync(fullPath).isDirectory()) {
			genHyndradHash(fullPath);
		} else if (/esm.js$/.test(file)) {
			let code = fs.readFileSync(fullPath, 'utf-8');
			let list = null;
			if (/bootstrapLazy\(/.test(code)) {
				code = code.replace(/(.*\n)*.*bootstrapLazy\(/, '');
				code = code.replace(/, options\)(.*\n)*/, '');
				list = JSON.parse(code);
				if (Array.isArray(list)) {
					for (let i = 0; i < list.length; i++) {
						list[i] = list[i][0];
					}
				}
			} else {
				code = code.replace(/( |\n)/g, '');
				code = code.replace(/.*\((\[\['p\-)/, '$1');
				code = code.replace(/[^\]]+$/, '');
				code = code.replace(/,\]/g, ']');
				list = code.match(/p\-[a-z0-9]+("|'),\[\[1,("|')[^("|')]+/g);
				if (Array.isArray(list)) {
					for (let i = 0; i < list.length; i++) {
						list[i] = list[i].replace(/^([^"]+")+/, '');
					}
				}
			}
			if (Array.isArray(list)) {
				const css = `${list.join(',')}{visibility:hidden}.hydrated{visibility:inherit}`;
				sha = genShaAsHashAndApostrophe(css);
				// console.log(css, list, list.length, sha);
				CSP_HASHES.add(sha);
			}
		}
	});
}

function genArtifactHashes(dir) {
	fs.readdirSync(dir).forEach((file) => {
		const fullPath = path.join(dir, file);
		if (fs.lstatSync(fullPath).isDirectory()) {
			genArtifactHashes(fullPath);
		} else if (path.extname(fullPath) === '.js') {
			let code = fs.readFileSync(fullPath, 'utf-8');
			let css = null;
			if (/Css ?= ?"([^"])/.test(code)) {
				code = code.replace(/(.*\n.*)*Css ?= ?"/, '');
				let matches = code.match(/[^\n]+/);
				if (matches !== null) {
					css = matches[0];
				}
				// } else if (/\.style='/.test(code)) {
				//   css = code.replace(/.*\.style='/, '');
				//   css = css.replace(/';export.*/, '');
			}
			if (typeof css === 'string') {
				css = css
					.replace(/";$/, '')
					.replace(/\\"/g, '"')
					.replace(/\\\\/g, `\\`)
					.replace(
						/\\n/g,
						`
  `
					);
				sha = genShaAsHashAndApostrophe(css);
				console.log(css, sha);
				fs.writeFileSync(fullPath.replace(/.js$/, '.css'), css, 'utf-8');
				CSP_HASHES.add(`${sha}`);
			}
		}
	});
}

let htmlFiles = ['./src/index.html', './www/index.html'];
let expects = [];
const test = new Set();
expects.forEach((cspHash) => {
	test.add(`'${cspHash}'`);
});
const CSP_HASHES = new Set();

const genCSPHashes = () => {
	genHyndradHash(path.resolve('./www/build'));
	genArtifactHashes(path.resolve('./www/build'));
	console.log(CSP_HASHES);

	for (const file of htmlFiles) {
		updateCSP(`./${file}`);
	}
};

genCSPHashes();

module.exports = genCSPHashes;
