import * as vscode from 'vscode';
import { convertHtml, scanHtml } from './conversion/html-converter';
import { convertTsx, scanTsx } from './conversion/tsx-converter';
import { ConversionOutput, ScanSummary } from './conversion/types';
import { openGuiBuilder } from './gui-builder';

function getConverter(languageId: string): {
	convert: (text: string) => ConversionOutput;
	scan: (text: string) => ScanSummary;
	label: string;
} {
	if (languageId === 'javascriptreact' || languageId === 'typescriptreact' || languageId === 'javascript' || languageId === 'typescript') {
		return { convert: convertTsx, scan: scanTsx, label: 'TSX/JSX' };
	}

	return { convert: convertHtml, scan: scanHtml, label: 'HTML' };
}

function summarizeCandidates(summary: ScanSummary): string {
	const parts = Object.entries(summary.counts)
		.map(([kind, count]) => `${count}× ${kind}`)
		.join(', ');

	return parts || '0 candidates';
}

function logCandidates(channel: vscode.OutputChannel, output: ConversionOutput): void {
	channel.appendLine('Convert to KoliBri results:');
	output.candidates.forEach((candidate, index) => {
		channel.appendLine(` ${index + 1}. ${candidate.kind} → ${candidate.replacement}`);
		channel.appendLine(`    confidence: ${candidate.confidence}`);
		if (candidate.reason) {
			channel.appendLine(`    reason: ${candidate.reason}`);
		}
		if (candidate.warnings?.length) {
			channel.appendLine(`    warnings: ${candidate.warnings.join('; ')}`);
		}
	});
	channel.appendLine('');
}

async function convertSelection(editor: vscode.TextEditor, channel: vscode.OutputChannel): Promise<void> {
	const { convert, label } = getConverter(editor.document.languageId);
	const selection = editor.selection.isEmpty
		? new vscode.Range(editor.document.positionAt(0), editor.document.positionAt(editor.document.getText().length))
		: editor.selection;
	const selectedText = editor.document.getText(selection);
	const result = convert(selectedText);

	await editor.edit((builder) => {
		builder.replace(selection, result.text);
	});

	logCandidates(channel, result);
	vscode.window.showInformationMessage(`Converted ${result.candidates.length} fragment(s) from ${label} to KoliBri.`);
}

async function scanDocument(editor: vscode.TextEditor, channel: vscode.OutputChannel): Promise<void> {
	const { scan, label } = getConverter(editor.document.languageId);
	const text = editor.document.getText();
	const summary = scan(text);

	channel.appendLine('Convert to KoliBri scan:');
	summary.candidates.forEach((candidate, index) => {
		channel.appendLine(` ${index + 1}. ${candidate.kind} (confidence: ${candidate.confidence})`);
		if (candidate.warnings?.length) {
			channel.appendLine(`    warnings: ${candidate.warnings.join('; ')}`);
		}
	});
	channel.appendLine('');

	const parts = summarizeCandidates(summary);
	vscode.window.showInformationMessage(`KoliBri scan detected ${parts} in this ${label} file.`);
}

export function activate(context: vscode.ExtensionContext): void {
	const channel = vscode.window.createOutputChannel('KoliBri Convert');

	const convertCommand = vscode.commands.registerCommand('kolibri.convertSelection', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active editor to convert.');
			return;
		}

		try {
			await convertSelection(editor, channel);
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			vscode.window.showErrorMessage(`Conversion failed: ${message}`);
		}
	});

	const scanCommand = vscode.commands.registerCommand('kolibri.scanDocument', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active editor to scan.');
			return;
		}

		try {
			await scanDocument(editor, channel);
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			vscode.window.showErrorMessage(`Scan failed: ${message}`);
		}
	});

	const guiBuilderCommand = vscode.commands.registerCommand('kolibri.openGuiBuilder', () => {
		openGuiBuilder(channel);
	});

	context.subscriptions.push(convertCommand, scanCommand, guiBuilderCommand, channel);
}

export function deactivate(): void {
	// no-op
}
