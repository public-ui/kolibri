const fs = require('fs');
const path = require('path');

// Funktion zum Kopieren einer Datei von einem Quellpfad zu einem Zielordner
function copyFile(source, target) {
	fs.copyFileSync(source, target);
}

// Funktion zum Durchsuchen von Unterordnern nach `types.ts`-Dateien und Kopieren in Zielordner
function searchAndCopy(baseDir, targetDir) {
	// Lies den Inhalt des Basisverzeichnisses
	const files = fs.readdirSync(baseDir);

	// Durchsuche jede Datei im Basisverzeichnis
	files.forEach((file) => {
		const filePath = path.join(baseDir, file);

		// Überprüfe, ob es sich um ein Verzeichnis handelt
		if (fs.statSync(filePath).isDirectory()) {
			// Rekursiv nach `types.ts`-Dateien im Unterordner suchen
			searchAndCopy(filePath, path.join(targetDir, file));
		} else if (file === 'types.ts') {
			// Wenn die Datei `types.ts` ist, kopiere sie in den Zielordner und benenne sie um
			const targetFileName = path.join(targetDirectory, `${path.basename(targetDir)}.ts`);
			copyFile(filePath, targetFileName);
			fs.unlinkSync(filePath);
			console.log(`export * from './${path.basename(targetDir)}';`);
		}
	});
}

// Setze die Pfade für das Basisverzeichnis und den Zielordner
const baseDirectory = '../src/components';
const targetDirectory = './types';

// Rufe die Funktion auf, um die Suche und das Kopieren zu starten
searchAndCopy(baseDirectory, targetDirectory);
