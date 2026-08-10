#!/usr/bin/env tsx
/**
 * i18n Linter - Prüft i18n-Keys auf Vollständigkeit und Verwendung
 *
 * Checks:
 * 1. Locale-Completeness: Alle locale-keys müssen in de.ts und en.ts gleichermaßen existieren
 * 2. KeyEnum Completeness: Alle locale-keys müssen im KeyEnum existieren (und umgekehrt)
 * 3. KeyEnum-Usage: Alle Keys im KeyEnum müssen im Code verwendet werden (Warning)
 * 4. Locale-Usage: Locale-Keys ohne KeyEnum und ohne Verwendung (Warning)
 *
 * Die Aufruf-Form von translate() (nur plain 'kol-...' String-Literale, keine Casts,
 * Template-Literals, Variablen oder Ternaries) wird von der ESLint-Regel
 * `kolibri/no-translate-cast-or-concat` geprüft — AST-basiert und präziser als jeder Regex.
 *
 * Usage:
 *   tsx scripts/lint-i18n.ts          # Check mode
 *   tsx scripts/lint-i18n.ts --fix    # Auto-fix mode (nur KeyEnum)
 */

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface LinterError {
	type: 'missing-in-locale' | 'unused-key' | 'missing-in-code' | 'extra-in-enum';
	severity: 'error' | 'warning';
	message: string;
	details?: string[];
}

function loadLocaleKeys(filePath: string): string[] {
	try {
		const content = readFileSync(filePath, 'utf-8');
		const objectMatch = content.match(/export default\s+\{([\s\S]*)\}/);
		if (!objectMatch) {
			throw new Error(`Konnte kein default export Object finden in ${filePath}`);
		}

		const objectContent = objectMatch[1];
		const keyRegex = /^\s*['"]?([a-zA-Z][-a-zA-Z0-9]*)['"]?\s*:/gm;
		const keys = new Set<string>();
		let match;

		while ((match = keyRegex.exec(objectContent)) !== null) {
			keys.add(match[1]);
		}

		return Array.from(keys);
	} catch (error) {
		console.error(`Fehler beim Laden von ${filePath}:`, error);
		return [];
	}
}

function loadKeyEnumKeys(filePath: string): string[] {
	try {
		const content = readFileSync(filePath, 'utf-8');
		const enumRegex = /^\s*['"]?([a-zA-Z][-a-zA-Z0-9]*)['"]?\s*,?$/gm;
		const keys = new Set<string>();
		let match;

		while ((match = enumRegex.exec(content)) !== null) {
			if (match[1] && match[1] !== 'export' && match[1] !== 'enum' && match[1] !== 'KeyEnum' && match[1] !== '{' && match[1] !== '}') {
				keys.add(match[1]);
			}
		}

		return Array.from(keys);
	} catch (error) {
		console.error(`Fehler beim Laden von ${filePath}:`, error);
		return [];
	}
}

/**
 * Sammelt alle .ts/.tsx-Dateien unter srcDir (exkl. spec/e2e und skipDirs).
 */
function collectSourceFiles(srcDir: string): string[] {
	const filePaths: string[] = [];
	const skipDirs = new Set(['node_modules', 'dist', '.git', '.stencil', 'scripts']);

	function collectFiles(dir: string) {
		const files = readdirSync(dir, { withFileTypes: true });

		for (const file of files) {
			const fullPath = join(dir, file.name);

			if (file.isDirectory()) {
				if (!skipDirs.has(file.name)) {
					collectFiles(fullPath);
				}
			} else if (file.name.match(/\.(ts|tsx)$/) && !file.name.endsWith('.spec.ts') && !file.name.endsWith('.e2e.ts')) {
				filePaths.push(fullPath);
			}
		}
	}

	collectFiles(srcDir);
	return filePaths;
}

/**
 * Findet alle verwendeten i18n-Keys im Code.
 *
 * Da jeder gültige translate()-Aufruf die Form translate('kol-<key>') haben muss
 * (andernfalls meldet checkTranslateCalls einen Error), reicht hier ein simpler
 * Regex. Template-Literals und Variablen werden bewusst NICHT erkannt, weil sie
 * laut Regel verboten sind.
 */
function findUsedKeys(srcDir: string): string[] {
	const keys = new Set<string>();
	const files = collectSourceFiles(srcDir);

	for (const file of files) {
		const content = readFileSync(file, 'utf-8');
		const translateCallRegex = /(?<!\.)translate\(\s*['"]kol-([a-zA-Z][a-zA-Z0-9-]*)['"]/g;
		let match;
		while ((match = translateCallRegex.exec(content)) !== null) {
			keys.add(match[1]);
		}
	}

	return Array.from(keys);
}

function runLint(): { errors: LinterError[]; data: { deKeys: string[]; enKeys: string[]; keyEnumKeys: string[]; usedKeys: string[] } } {
	const errors: LinterError[] = [];

	// Pfade
	const deLocalePath = join(__dirname, '../src/locales/de.ts');
	const enLocalePath = join(__dirname, '../src/locales/en.ts');
	const i18nKeysPath = join(__dirname, '../src/schema/i18n-keys.ts');
	const srcDir = join(__dirname, '../src');

	console.log('🔍 Starte i18n Linter...\n');

	console.log('📂 Lade locale files...');
	const deKeys = loadLocaleKeys(deLocalePath);
	const enKeys = loadLocaleKeys(enLocalePath);
	const keyEnumKeys = loadKeyEnumKeys(i18nKeysPath);

	console.log(`   de.ts: ${deKeys.length} keys`);
	console.log(`   en.ts: ${enKeys.length} keys`);
	console.log(`   KeyEnum: ${keyEnumKeys.length} keys\n`);

	console.log('🔍 Check 1: Locale-Completeness (de ⇄ en)...');

	const missingInEn = deKeys.filter((key) => !enKeys.includes(key));
	const missingInDe = enKeys.filter((key) => !deKeys.includes(key));

	if (missingInEn.length > 0) {
		errors.push({
			type: 'missing-in-locale',
			severity: 'error',
			message: `Fehlende Keys in en.ts (${missingInEn.length})`,
			details: missingInEn,
		});
	}

	if (missingInDe.length > 0) {
		errors.push({
			type: 'missing-in-locale',
			severity: 'error',
			message: `Fehlende Keys in de.ts (${missingInDe.length})`,
			details: missingInDe,
		});
	}

	console.log(`   ✅ ${missingInEn.length + missingInDe.length} Locale-Completeness Errors\n`);

	console.log('🔍 Check 2: KeyEnum ⇄ Locales...');

	const allLocaleKeys = [...new Set([...deKeys, ...enKeys])];
	const missingInKeyEnum = allLocaleKeys.filter((key) => !keyEnumKeys.includes(key));
	const extraInKeyEnum = keyEnumKeys.filter((key) => !allLocaleKeys.includes(key));

	if (missingInKeyEnum.length > 0) {
		errors.push({
			type: 'missing-in-code',
			severity: 'error',
			message: `Fehlende Keys in KeyEnum (${missingInKeyEnum.length} — in locales, aber nicht in enum)`,
			details: missingInKeyEnum,
		});
	}

	if (extraInKeyEnum.length > 0) {
		errors.push({
			type: 'extra-in-enum',
			severity: 'error',
			message: `Extra Keys in KeyEnum (${extraInKeyEnum.length} — in enum, aber nicht in locales)`,
			details: extraInKeyEnum,
		});
	}

	console.log(`   ✅ ${missingInKeyEnum.length + extraInKeyEnum.length} KeyEnum Errors\n`);

	console.log('🔍 Check 3: KeyEnum-Usage...');
	const usedKeys = findUsedKeys(srcDir);
	console.log(`   Gefunden: ${usedKeys.length} verwendete Keys im Code\n`);

	const unusedKeyEnumKeys = keyEnumKeys.filter((key) => !usedKeys.includes(key));

	if (unusedKeyEnumKeys.length > 0) {
		errors.push({
			type: 'unused-key',
			// Warning: Keys können über öffentliche API von Konsumenten genutzt werden
			severity: 'warning',
			message: `Unused Keys in KeyEnum (${unusedKeyEnumKeys.length} — in Enum, aber keine statische Verwendung gefunden; ggf. extern genutzt)`,
			details: unusedKeyEnumKeys,
		});
	}

	console.log(`   ✅ ${unusedKeyEnumKeys.length} Unused KeyEnum Keys\n`);

	console.log('🔍 Check 4: Locale-Usage (Keys ohne KeyEnum und ohne Verwendung)...');

	const unusedLocaleKeys = allLocaleKeys.filter((key) => !keyEnumKeys.includes(key) && !usedKeys.includes(key));

	if (unusedLocaleKeys.length > 0) {
		errors.push({
			type: 'unused-key',
			severity: 'warning',
			message: `Unused Locale Keys (${unusedLocaleKeys.length} — weder in Enum noch verwendet)`,
			details: unusedLocaleKeys,
		});
	}

	console.log(`   ✅ ${unusedLocaleKeys.length} Unused Locale Keys\n`);

	return {
		errors,
		data: { deKeys, enKeys, keyEnumKeys, usedKeys },
	};
}

function fixKeyEnum(i18nKeysPath: string, keyEnumKeys: string[], usedKeys: string[]): void {
	const keysToRemove = keyEnumKeys.filter((key) => !usedKeys.includes(key));
	const keysToAdd = usedKeys.filter((key) => !keyEnumKeys.includes(key));

	if (keysToRemove.length === 0 && keysToAdd.length === 0) {
		console.log('   ✅ KeyEnum ist bereits korrekt - keine Änderungen nötig');
		return;
	}

	if (keysToRemove.length > 0) {
		console.log(`   🗑️  Entferne ${keysToRemove.length} unused Keys aus KeyEnum:`, keysToRemove.slice(0, 5).join(', '));
	}

	if (keysToAdd.length > 0) {
		console.log(`   ➕ Füge ${keysToAdd.length} genutzte Keys zur KeyEnum hinzu:`, keysToAdd.slice(0, 5).join(', '));
	}

	const content = readFileSync(i18nKeysPath, 'utf-8');

	const enumMatch = content.match(/export enum KeyEnum \{([\s\S]*)\}/);
	if (!enumMatch) {
		console.error('   ❌ Konnte KeyEnum nicht finden');
		return;
	}

	// Erstelle neue enum-Values
	const newKeys = [...keyEnumKeys.filter((k) => !keysToRemove.includes(k)), ...keysToAdd].sort();

	// Generiere neuen enum Body
	// Keys mit Bindestrichen bekommen Quotes, einfache Keys nicht
	const enumBody = newKeys
		.map((key) => {
			if (key.match(/-/)) {
				return `\t'${key}',`;
			} else {
				return `\t${key},`;
			}
		})
		.join('\n');

	// Ersetze den enum
	const newContent = content.replace(/export enum KeyEnum \{[\s\S]*\}/, `export enum KeyEnum {\n${enumBody}\n}`);

	writeFileSync(i18nKeysPath, newContent, 'utf-8');
	console.log('   ✅ KeyEnum aktualisiert');
}

function runAutoFix(data: { deKeys: string[]; enKeys: string[]; keyEnumKeys: string[]; usedKeys: string[] }): void {
	const { keyEnumKeys, usedKeys } = data;

	// Pfade
	const i18nKeysPath = join(__dirname, '../src/schema/i18n-keys.ts');

	console.log('');
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
	console.log('🔧 AUTO-FIX MODE (nur KeyEnum)');
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

	// 1. KeyEnum bereinigen
	console.log('🔧 Schritt 1: KeyEnum bereinigen...');
	fixKeyEnum(i18nKeysPath, keyEnumKeys, usedKeys);

	console.log('\n✅ Auto-Fix abgeschlossen!\n');
	console.log('⚠️  Locale-Dateien (de.ts/en.ts) werden NICHT automatisch geändert.');
	console.log('   Bitte fehlende/zu viele Keys manuell korrigieren.\n');
}

function displayResults(errors: LinterError[]): void {
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
	console.log('📊 ERGEBNIS');
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

	if (errors.length === 0) {
		console.log('✅ Keine Fehler gefunden! Alle i18n-Keys sind vollständig und werden verwendet.\n');
	} else {
		const errorCount = errors.filter((e) => e.severity === 'error').length;
		const warningCount = errors.filter((e) => e.severity === 'warning').length;

		console.log(`❌ ${errorCount} Error(s), ${warningCount} Warning(s)\n`);

		errors.forEach((error, index) => {
			const icon = error.severity === 'error' ? '❌' : '⚠️';
			console.log(`${icon} [${index + 1}] ${error.message}`);

			if (error.details && error.details.length > 0) {
				const detailsToShow = error.details.slice(0, 10);
				detailsToShow.forEach((detail) => {
					console.log(`      - ${detail}`);
				});
				if (error.details.length > 10) {
					console.log(`      ... und ${error.details.length - 10} weitere`);
				}
			}
			console.log('');
		});

		console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
	}
}

const args = process.argv.slice(2);
const fixMode = args.includes('--fix');

let result = runLint();
let afterFixResult: { errors: LinterError[] } | null = null;

if (fixMode) {
	runAutoFix(result.data);
	console.log('🔄 Erneuter Check nach Auto-Fix...\n');
	afterFixResult = runLint();
	displayResults(afterFixResult.errors);
} else {
	displayResults(result.errors);
}

// Exit-Code basiert auf dem finalen Stand (nach --fix, falls ausgeführt)
const finalErrors = fixMode && afterFixResult ? afterFixResult.errors : result.errors;
const hasErrors = finalErrors.some((e) => e.severity === 'error');
process.exit(hasErrors ? 1 : 0);
